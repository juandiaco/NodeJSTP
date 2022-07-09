const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:{type: String, require: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    date: {type: Date, default: Date.now},
    perfil:{type: String}
})

// Metodo para encriptar la contraseña y devolverla encriptada
userSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash= bcrypt.hash(password, salt);
    return hash;
};

// Metodo para poder comparar si la contraseña encriptada que se recibe es la misma....
// .... contraseña encriptada que está en la base de datos
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};  

module.exports = mongoose.model('User', userSchema);
