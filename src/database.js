const mongoose = require('mongoose');

// const conexion = 'mongodb+srv://admin:Password123@cluster0.4epaf.mongodb.net/?retryWrites=true&w=majority';

const conexion = 'mongodb+srv://admin:Password123$@cluster0.qmd0a.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(conexion,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    connectTimeoutMS: 20000,
})

.then(db => console.log('Se conectó a la DB'))
.catch(err => console.error(err));

