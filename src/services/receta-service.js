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
    const{titulo, categoria, ingredientes, duracion, updated, dificultad, procedimiento, borrador} = recetaEditada;
    console.log(recetaEditada);
    console.log({titulo, categoria, ingredientes, duracion, updated, dificultad, procedimiento, borrador});
    await Receta.findByIdAndUpdate(recetaEditada._id,{titulo, categoria, ingredientes, duracion, updated, dificultad, procedimiento, borrador});
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

exports.traerRecetaCompleta = async function (){
    console.log("Traer receta completa service");
    const receta = await Receta.find ({borrador: false})
    return receta;
}

exports.traerRecetas = async function(){
    console.log("TRAER RECETAS SERVICE");
    const recetas = await Receta.find({borrador: false}).sort({updated: 'desc'}).limit(15);
    console.log(recetas[0]);
    return recetas;
}


exports.filtroRecetas = async function(filtro){

    console.log("FILTRADO SERVICE", filtro);
    //const recetas = await Receta.find({$or: [{dificultad: /filtro.dificultad/i},{ingredientes: /filtro.ingredientes/i}, {categoria: /filtro.categoria/i}]})
    regexIngredientes = new RegExp(filtro.ingredientes,'i');
    regexCategoria = new RegExp(filtro.categoria,'i');
    regexDificultad= new RegExp(filtro.dificultad,'i');
    
    const recetas = await Receta.find({ingredientes: {$regex: regexIngredientes},categoria:{$regex: regexCategoria},dificultad:{$regex: regexDificultad}, borrador:false })
    console.log(recetas[0]);
    return recetas;
}