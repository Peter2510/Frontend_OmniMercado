require('dotenv').config()
bcrypt = require('bcryptjs')
const execute = require('../middlewares/query.middleware')


const crearUsuario = async (req, res) => {

    const { nombre,correo,contrasenia,url_imagen} = req.body;
    
    const contraseniaEncriptada = await bcrypt.hash(contrasenia,10)
    const query = `
        INSERT INTO usuario(nombre,correo,contrasenia,url_imagen,cantidad_moneda_virtual,
            moneda_local_gastada,moneda_local_ganada,moneda_virtual_ganada,
            moneda_virtual_gastada,cantidad_publicaciones_productos,
            cantidad_publicaciones_voluntariados,promedio_valoracion) VALUES
            (?,?,?,?,?,?,?,?,?,?,?,?) `
    const moneda_inicial = 10

    const result = await execute.execute(query,[nombre,correo,contraseniaEncriptada,
        url_imagen,moneda_inicial,0,0,0,0,0,0,0])
    res.json(result)
}

module.exports = {
    crearUsuario
}