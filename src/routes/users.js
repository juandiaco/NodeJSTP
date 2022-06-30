const express = require("express");

const UserController = require("../controllers/user-controller");

const passport = require('passport');
// Importo modelo de datos User
const User = require('../models/User');

const router = express.Router();

router.get('/users/signin', (req, res) => {

    res.render('users/signin');

});


router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin'
}));


router.get('/users/signup', (req, res) => {

    res.render('users/signup');

});


router.post('/users/signup', async (req, res) =>{
    const {name, email, password} = req.body;
    const emailUser = await User.findOne({email});
    if(emailUser){
        console.log("El usuario ya existe");
        res.redirect('/users/signup');
    }

    // Se crea un usuario con las variables de entrada
    const newUser = new User({name, email, password});
    // Se encripta la contraseña
    newUser.password = await newUser.encryptPassword(password);
    // Se guarda el usuario en la BD
    await newUser.save();
    res.redirect('/users/signin');
})

router.get('/users/logout', (req, res) =>{
    req.logOut(function(err){
        if(err) {return next(err);}
        res.redirect('/');
    });
});

router.post('/registrar/', async(req,res) =>{
    const {name, email, password} = req.body;
    const newUser = new User({name, email, password});
    console.log(newUser);

    // Se encripta la contraseña
    newUser.password = await newUser.encryptPassword(password);
    UserController.createUsers(req, res, newUser);
} );

router.put('/editarUser/', async(req,res) =>{
    const{id, name, email, password}=req.body;
    const newUserEdicion = new User({id, name, email, password});
    console.log(newUserEdicion);
    UserController.editarUser(req, res, newUserEdicion);
})

router.delete('/eliminarUser/'), async(req, res) =>{
    const{id} = req.body;
    
}

router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user');
  });

module.exports = router;