const express = require('express');
const app = express();
// Se importa el modulo path para unir directorios en la aplicación
const path = require('path');

const bodyParser = require("body-parser");

// Se cargan las variables de entorno
require("dotenv").config();

// Se importa handlebars
const exphbs = require('express-handlebars');

const cors = require('cors');

app.use(cors({
    origin: '*'
}));


// Method Override sirve para poder enviar otros tipos de metodos ademas de GET y POST
    
const methodOverride = require('method-override');

// Express-session sirve para que la página guarde la sesion y el usuario no tenga que...
// ... iniciar sesion todo el tiempo
const session = require('express-session');

// Se inicia la conexión a la base de datos

require('./database');

// Se importa passport
const passport = require('passport');

// Se importa el archivo para autenticar
// ANTERIOR require('./config/passport');



// Settings

    // Se configura el puerto que va a escuchar la aplicación
app.set('port', 5000);

    // Se declara donde esta la carpeta View
app.set('views', path.join(__dirname,'views'));

console.log(path.join(app.get('views')));

/* ANTERIOR
app.engine('.hbs', exphbs.engine  ({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
*/

// ANTERIOR app.set('view engine', '.hbs');


// Middlewares

app.use(express.urlencoded({extended: false}));

app.use(methodOverride('_method'));

app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true

}));

app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, rest, next) => {
    rest.locals.user= req.user || null;
    next();
});

app.use((req,rest,next) =>{
    rest.locals.receta = req.receta || null;
    next();
})

// Routes
app.use(require('./routes/users'));
app.use(require('./routes/recetas'))




// Static files
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next){
    res.header("Access-Control-Allow-Origin", '*');
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Allow", 'GET, POST, PUT, DELETE');
    next();
});

app.use(express.json({limit:'10MB'}));

app.use(express.urlencoded({limit:'10MB'}));






// Server is listenning
    // Se inicia la escucha del servidor
app.listen(app.get('port'), () => (
    console.log("Server on port", app.get('port'))
));

