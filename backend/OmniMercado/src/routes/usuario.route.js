const {check} = require('express-validator');
const validateAttributes = require('../middlewares/validateAttributes.middleware');
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/Usuario');

router.post('/crear-usuario', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo es obligatorio').not().isEmpty(),
    check('contrasenia','La contrasenia es obligatori').not().isEmpty(),
    check('url_imagen','La url de la imagen es obligatoria').not().isEmpty(),
    validateAttributes
],usuarioController.crearUsuario);

module.exports = router