const express = require('express');
const app = express();
const cors = require('cors');
const usuarioRoutes = require('./routes/usuario.route');

app.use(express.json({limit:'5mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin:'http://127.0.0.1:4200'}));

app.get('/',(req,res)=>{
    res.send('Hola desde la ruta inicial');
});

app.use('/usuario',usuarioRoutes);

module.exports = app