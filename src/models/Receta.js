const mongoose = require('mongoose');
const User = require('./User');
const {Schema} = mongoose;


//Schema de la receta
const recetaSchema = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    categoria: {type: String, required: true}, 
    ingredientes: [{
        type: String, required: true
    }],
    duracion: {type:Number, min: 2, required: true},
    updated: { type: Date, default: Date.now },
    dificultad: {type: String, required: true},
    procedimiento: {type: String, required: true}
})

module.exports = mongoose.model('Receta', recetaSchema);
