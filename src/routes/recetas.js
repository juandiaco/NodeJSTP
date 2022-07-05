const express = require("express");
const recetaController = require("../controllers/receta-controller");
const router = express.Router();

// Schema de la Receta
const Receta = require('../models/Receta');

//Crear una nueva Receta
router.post('/crearReceta/', async(req,res) =>{
    const {titulo, descripcion} = req.body;
    const nuevaReceta= new Receta({titulo,descripcion});
    console.log(nuevaReceta);

    recetaController.crearReceta(req, res, nuevaReceta);
} );


module.exports = router;

