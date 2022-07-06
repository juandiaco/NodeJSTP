const Receta = require('../models/Receta');

exports.crearReceta = async function(receta){
    var nuevaReceta = new Receta ({
        titulo: receta.titulo,
        descripcion: receta.descripcion,
        categoria: receta.categoria,
        ingredientes: receta.ingredientes,
        duracion: receta.duracion,
        updated: receta.updated,
        dificultad: receta.dificultad,
        procedimiento: receta.procedimiento,
    });

    console.log("aber si agarra")
    console.log(nuevaReceta.titulo);
    console.log(nuevaReceta.descripcion);
    console.log(nuevaReceta.categoria);
    console.log(nuevaReceta.ingredientes);
    console.log(nuevaReceta.duracion);
    console.log(nuevaReceta.updated);
    console.log(nuevaReceta.dificultad);
    console.log(nuevaReceta.procedimiento);
   
    
    try {
        console.log("creando receta");
        var recetaGuardada = await nuevaReceta.save();
        return {Receta:recetaGuardada}
    }
    catch(e) {
        console.log(e)    
        throw Error("Error")
    }
}

