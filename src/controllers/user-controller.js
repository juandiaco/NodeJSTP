const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = `${process.env.JWT_SECRET}`;

const Authorization = require("../auth/authorization");

const userService = require("../services/user-service");

const User = require("../models/User");

const jwt = require("jsonwebtoken");

exports.createUsers = async function(req, res, userNuevo){
    console.log("Controller papa");
    var User = {
        name: userNuevo.name,
        email: userNuevo.email,
        password: userNuevo.password,
        date: userNuevo.date,
        perfil: userNuevo.perfil,
    };
    console.log(userNuevo.perfil);
    try {
        // Calling the Service function with the new object from the Request Body
        var salidaCreacion = await userService.createUser(User)
        return res.status(201).json({salidaCreacion, message: "Succesfully Created User"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    };
}


exports.editarUser = async function (req, res, userTemporal){
    console.log("Llegaste al controller papa");

    console.log(userTemporal.name);
    const userEncontrado2 = await User.find({email: userTemporal.email});
    
    try {
        // Calling the Service function with the new object from the Request Body
        var editedUser = await userService.editeUser(userTemporal);
        return res.status(201).json({editedUser, message: "Usuario editado"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "El usuario no pudo ser editado"})
    };


}

exports.eliminarUser = async function (req, res, key){
    console.log("Llegaste al Controller");
    console.log(key);

    try {
        // Calling the Service function with the new object from the Request Body
        var usuarioEliminado = await userService.deleteUser(key);
        return res.status(201).json({usuarioEliminado, message: "Usuario eliminado"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "El usuario no pudo ser eliminado"})
    };

}

exports.GenerarToken = async function (req, res){
    
    var tiempo = Date()
    const token = jwt.sign({tiempo}, JWT_SECRET, {expiresIn: 86400})
    res.send(token);
}

exports.TestToken= async function(req, res){
    res.send("TODO PIOLA");
}

exports.Login = async function(req, res){
    var usuarioEntrante = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(usuarioEntrante);
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await userService.loginUser(usuarioEntrante);
        console.log("USUARIO LOGEADO PAPA");
        return res.status(201).json({loginUser, message: "Succesfully login"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}