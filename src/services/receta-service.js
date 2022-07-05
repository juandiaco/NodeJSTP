const Receta = require('../models/Receta');

exports.crearReceta = async function(receta){
    var nuevaReceta = new Receta ({
        titulo: receta.titulo,
        descripcion: receta.descripcion,
    });
    console.log("aber si agarra")
    console.log(nuevaReceta.titulo);
    console.log(nuevaReceta.descripcion);
    
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

