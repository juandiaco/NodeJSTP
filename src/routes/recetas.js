const express = require("express");
const recetaController = require("../controllers/receta-controller");
const router = express.Router();

// Importo el schema de la Receta
const Receta = require('../models/Receta');

//Crear una nueva Receta
router.post('/crearReceta/', async(req,res) =>{
    const {titulo, descripcion, categoria, ingredientes, duracion, updated, dificultad, procedimiento} = req.body;
    const nuevaReceta= new Receta({titulo, descripcion, categoria, ingredientes, duracion, updated, dificultad, procedimiento});
    console.log(nuevaReceta);

    recetaController.crearReceta(req, res, nuevaReceta);
} );

//Editar una Receta
router.put('/editarReceta/', async function (req,res){
    const {_id, titulo, descripcion, categoria, ingredientes, duracion, updated, dificultad, procedimiento} = req.body;
    const nuevaRecetaEditada = new Receta ({_id, titulo, descripcion, categoria, ingredientes, duracion, updated, dificultad, procedimiento});
    console.log(nuevaRecetaEditada);
    recetaController.editarReceta(req,res,nuevaRecetaEditada);
})

//Eliminar una Receta
router.delete('/eliminarReceta', async function (req,res){
    const{_id}=req.body;
    console.log("id:",_id);
    recetaController.eliminarReceta(req,res,_id);
})


module.exports = router;

