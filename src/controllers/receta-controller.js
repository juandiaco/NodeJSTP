const dotenv = require('dotenv');

dotenv.config();

const recetaService = require("../services/receta-service.js");

const Receta = require("../models/Receta");

exports.crearReceta = async function(req, res, nuevaReceta){
    console.log("welcome to crear receta");
    var Receta = {
        titulo: nuevaReceta.titulo,
        descripcion:nuevaReceta.descripcion,
    };
    console.log(nuevaReceta.name);
    try {
        // Calling the Service function with the new object from the Request Body
        var salidaCreacion = await recetaService.crearReceta(Receta)
        return res.status(201).json({salidaCreacion, message: "Receta creada con exito"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Error en crear la receta"})
    };
}
