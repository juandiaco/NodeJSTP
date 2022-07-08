const express = require("express");

const UserController = require("../controllers/user-controller");

const passport = require('passport');
// Importo modelo de datos User
const User = require('../models/User');

const router = express.Router();

const Authorization = require("../auth/authorization");

router.post('/registrar/', async(req,res) =>{
    const {name, email, password} = req.body;
    const newUser = new User({name, email, password});
    console.log(newUser);
    console.log("Palabra secreta", process.env.SECRET);

    // Se encripta la contraseña
    newUser.password = await newUser.encryptPassword(password);
    UserController.createUsers(req, res, newUser);
} );

router.put('/editarUser/',Authorization, async function(req,res) {
    const{_id, name, email, password}=req.body;
    const newUserEdicion = new User({_id, name, email, password});
    console.log(newUserEdicion);
    UserController.editarUser(req, res, newUserEdicion);
})

router.delete('/eliminarUser/',Authorization, async function (req, res){
    const{_id} = req.body;
    console.log("EL ID ES", _id);
    UserController.eliminarUser(req, res, _id);
})



router.get('/test', async function(req, res) {
    UserController.GenerarToken(req,res);
  });


router.get('/test/token',Authorization, async function(req, res){
    UserController.TestToken(req,res);
})

router.post('/login/', async function(req, res){
    console.log("PASASTE POR ACA");
    UserController.Login(req,res);
})

module.exports = router;

