const mongoose = require('mongoose');
const User = require('./User');
const {Schema} = mongoose;


//Schema de la receta
const recetaSchema = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
})

module.exports = mongoose.model('Receta', recetaSchema);
