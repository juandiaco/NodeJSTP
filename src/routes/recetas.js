const express = require("express");
const recetaController = require("../controllers/receta-controller");
const router = express.Router();
const Authorization = require("../auth/authorization");
// Importo el schema de la Receta
const Receta = require('../models/Receta');

//Crear una nueva Receta
router.post('/crearReceta/', async(req,res) =>{
    const {titulo, categoria, ingredientes, duracion, dificultad, procedimiento, borrador, creador, imagenReceta} = req.body;
    const nuevaReceta= new Receta({titulo, categoria, ingredientes, duracion, dificultad, procedimiento, borrador, creador, imagenReceta});
   
    console.log("Receta ruta",nuevaReceta);

    recetaController.crearReceta(req, res, nuevaReceta);
} );

//Editar una Receta
router.put('/editarReceta/',Authorization, async function (req,res){
    const {_id, titulo, descripcion, categoria, ingredientes, duracion, updated, dificultad, procedimiento} = req.body;
    const nuevaRecetaEditada = new Receta ({_id, titulo, descripcion, categoria, ingredientes, duracion, updated, dificultad, procedimiento});
    console.log(nuevaRecetaEditada);
    recetaController.editarReceta(req,res,nuevaRecetaEditada);
})

//Eliminar una Receta
router.delete('/eliminarReceta/',Authorization, async function (req, res){
        const { _id } = req.body;
        console.log("id:", _id);
        recetaController.eliminarReceta(req, res, _id);
    })

router.get('/recetasDeUser', Authorization, async function (req,res){
    const{creador} = req.headers;
    console.log("id:",creador);
    recetaController.recetasDeUser(req,res,creador);
})

router.get('/traerRecetas', async function(req,res){
    recetaController.traerRecetas(req,res);
})

router.get('/traerRecetaCompleta' async function (req,res){
    recetaController.traerRecetaCompleta(req,res);
})

router.post("/filtrarRecetas", async function(req,res){
    console.log("VINO POR ACA");
    const {ingredientes,dificultad,categoria} = req.body;
    const filtros = {ingredientes,dificultad,categoria};
    console.log(filtros)
    recetaController.filtrarReceta(req,res,filtros);
})

router.delete("/deleteReceta", async function(req,res){
    const {_id} = req.body;
    console.log("id:", _id);
    recetaController.eliminarReceta(req, res, _id);
})


module.exports = router;

