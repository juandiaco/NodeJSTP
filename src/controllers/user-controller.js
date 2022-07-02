const userService = require("../services/user-service");

const User = require("../models/User");

exports.createUsers = async function(req, res, userNuevo){
    console.log("Controller papa");
    var User = {
        name: userNuevo.name,
        email: userNuevo.email,
        password: userNuevo.password,
    };
    console.log(userNuevo.name);
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await userService.createUser(User)
        return res.status(201).json({createdUser, message: "Succesfully Created User"})
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