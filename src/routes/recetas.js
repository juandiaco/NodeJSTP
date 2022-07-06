const express = require("express");
const recetaController = require("../controllers/receta-controller");
const router = express.Router();

// Schema de la Receta
const Receta = require('../models/Receta');

//Crear una nueva Receta
router.post('/crearReceta/', async(req,res) =>{
    const {titulo, descripcion, categoria, ingredientes, duracion, updated, dificultad, procedimiento} = req.body;
    const nuevaReceta= new Receta({titulo, descripcion, categoria, ingredientes, duracion, updated, dificultad, procedimiento});
    console.log(nuevaReceta);

    recetaController.crearReceta(req, res, nuevaReceta);
} );


module.exports = router;

