const recetaService = require("../services/receta-service.js");
const Receta = require("../models/Receta");


//Crear Receta
exports.crearReceta = async function(req, res, nuevaReceta){
    console.log("welcome to crear receta");
    var Receta = {
        titulo: nuevaReceta.titulo,
        categoria: nuevaReceta.categoria,
        ingredientes: nuevaReceta.ingredientes,
        duracion: nuevaReceta.duracion,
        dificultad: nuevaReceta.dificultad,
        procedimiento: nuevaReceta.procedimiento,
        borrador: nuevaReceta.borrador,
        creador: nuevaReceta.creador,
    };
    console.log("Receta Controller",nuevaReceta);
    try {
        // Calling the Service function with the new object from the Request Body
        var salidaCreacion = await recetaService.crearReceta(Receta)
        return res.status(201).json({salidaCreacion, message: "La receta fue creada exitosamente"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Error en crear la receta"})
    };
}

//Editar Receta
exports.editarReceta = async function (req, res, recetaTemporal){
    console.log("Welcome to receta controller");
    console.log(recetaTemporal.titulo);
    const recetaEncontrada = await Receta.find({titulo: recetaTemporal.titulo});

    try {
        // Calling the Service function with the new object from the Request Body
        var editedReceta = await recetaService.editeReceta(recetaTemporal);
        return res.status(201).json({editedReceta, message: "La Receta se edito"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Error editando la receta"})
    };
}

//Eliminar Receta
exports.eliminarReceta = async function (req,res,key){
    console.log("Hola de nuevo soy el controller");
    console.log(key);

    try {
        // Calling the Service function with the new object from the Request Body
        var recetaEliminada = await recetaService.deleteReceta(key);
        return res.status(201).json({recetaEliminada, message: "Se elimino la receta"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "El usuario no pudo ser eliminado"})
    };
}


exports.recetasDeUser = async function (req, res, creador){
    console.log("Controller Creador", creador);
    try{
        let recetasEncontradas = await recetaService.traerRecetasUser(creador);
        return res.status(201).json({recetasEncontradas, message:"Recetas encontradas"})
    }
    catch(e){
        console.log(e)
        return res.status(400).json({status: 400, message: "No se pudo traer recetas"});
    }
}