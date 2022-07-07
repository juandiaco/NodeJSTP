const Receta = require('../models/Receta');

//Crea la Receta
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

