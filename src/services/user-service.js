const User = require('../models/User');

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

exports.editeUser = async function(usuarioViejo, usuarioEditado){
    console.log("Llegaste al user-service papa");
    const{name, password, email} = usuarioEditado;
    console.log(usuarioEditado);
    console.log(usuarioViejo);
    console.log("EL ID ES", usuarioViejo._id);
    User.findByIdAndUpdate(usuarioEditado.id,{name, password, email});
    console.log("Se creó el usuario re piola");
}

exports.deleteUser = async function(key){
    User.findByIdAndDelete(key);
    console.log("Usuario eliminado");
}