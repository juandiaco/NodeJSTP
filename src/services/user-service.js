const User = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const {cloudinary} = require ('../cloudinary/cloudinary');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = `${process.env.JWT_SECRET}`;

exports.createUser = async function(user){
    var newUser = new User ({
        name: user.name,
        email: user.email,
        password: user.password,
        date: user.date,
        perfil: user.perfil
    });
    console.log("AAAAAAAAAAAA")
    console.log(newUser.name);
    console.log(newUser.password);

    var mail = newUser.email;
    console.log("VIENE EL MAIL");
    console.log(mail);

    const emailUser = await User.findOne({email: mail});
    

    console.log("Viene el CHECK DEL MAIL");
    console.log(emailUser);
    if(emailUser){
        console.log("El usuario ya existe");
    }
    else{
        try {
            
            console.log("GUARDANDO IMAGEN");
            const uploadedResponse = await cloudinary.uploader.upload(newUser.perfil, {upload_preset: 'TP'});
            
            console.log(uploadedResponse);
            const jsonRespuesta = await uploadedResponse.public_id;
            console.log("JSON RESPUESTA",jsonRespuesta);

            newUser.perfil = uploadedResponse.public_id;
            console.log("CREANDO USUARIO");
            var usuarioGuardado = await newUser.save();
            var token = jwt.sign({id: usuarioGuardado._id}, JWT_SECRET , {expiresIn: 86400});
            return {token:token, user:usuarioGuardado}
        }
        catch(e) {
            // return a Error message describing the reason 
            console.log(e)    
            throw Error("Error while Creating User")
        }
    }

}

exports.editeUser = async function(usuarioEditado){
    console.log("Llegaste al user-service papa");
    const{name, password, email} = usuarioEditado;
    console.log(usuarioEditado);
    console.log({name, password, email});
    await User.findByIdAndUpdate(usuarioEditado._id,{name, password, email});
    console.log("Se creó el usuario re piola");
}

exports.deleteUser = async function(key){
    await User.findByIdAndDelete(key);
    console.log("Usuario eliminado");
}

exports.loginUser = async function(user){
    try{
    usuarioEncontrado = await User.findOne({email: user.email});
    var contraseñaValida = bcrypt.compareSync(user.password, usuarioEncontrado.password);
    if(!contraseñaValida){
        throw Error("Invalid username/password")
    }
    var token = jwt.sign({id: usuarioEncontrado._id}, JWT_SECRET , {expiresIn: 86400});
    return {user: usuarioEncontrado, token:token,};
    }
    catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }
}