const Receta = require('../models/Receta');
const {cloudinary} = require ('../cloudinary/cloudinary');
const dotenv = require('dotenv');

//Crea la Receta
exports.crearReceta = async function(receta){
    var nuevaReceta = new Receta ({
        titulo: receta.titulo,
        categoria: receta.categoria,
        ingredientes: receta.ingredientes,
        duracion: receta.duracion,
        dificultad: receta.dificultad,
        procedimiento: receta.procedimiento,
        borrador: receta.borrador,
        creador: receta.creador,
        imagenReceta: receta.imagenReceta,
    });

    console.log("Receta servicio", nuevaReceta);
    
   
    
    try {
        console.log("guardando imagen de la receta");
        const uploadedResponse = await cloudinary.uploader.upload(nuevaReceta.imagenReceta,{upload_preset: 'TP'});

        console.log(uploadedResponse);
        const jsonRespuesta = await uploadedResponse.public_id;
        console.log("JSON RESP",jsonRespuesta);

        nuevaReceta.imagenReceta = uploadedResponse.public_id;

        console.log("creando receta");
        var recetaGuardada = await nuevaReceta.save();
        return {Receta:recetaGuardada}
    }
    catch(e) {
        console.log(e)    
        throw Error("Error")
    }
}

//Edita la Receta
exports.editeReceta = async function (recetaEditada){
    console.log ("Hola soy el Receta-Service");
    const{titulo, descripcion, categoria, ingredientes, duracion, updated, dificultad, procedimiento} = recetaEditada;
    console.log(recetaEditada);
    console.log({titulo, descripcion, categoria, ingredientes, duracion, updated, dificultad, procedimiento});
    await Receta.findByIdAndUpdate(recetaEditada._id,{titulo, descripcion, categoria, ingredientes, duracion, updated, dificultad, procedimiento});
    console.log("Receta editada exitosamente")
}

//Eliminar Receta

exports.deleteReceta = async function(key){
    await Receta.findByIdAndDelete(key);
    console.log("Se elimino la receta");
}

exports.traerRecetasUser = async function(creador){
    const recetas = await Receta.find({creador: creador}).sort({updated: 'desc'}).lean();
    console.log(recetas);
    return recetas;
}