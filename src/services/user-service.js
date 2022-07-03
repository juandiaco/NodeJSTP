const User = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


exports.createUser = async function(user){
    var newUser = new User ({
        name: user.name,
        email: user.email,
        password: user.password
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
        console.log("CREANDO USUARIO");
        await newUser.save();
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