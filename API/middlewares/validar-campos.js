const { validationResult } = require('express-validator');

const validarCampos = (req,res,next) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors); // retorna los errores del middleware en rutas
    }
    next(); //si pasa la validacion de este middleware, pasa la siguiente, si es el ultimo, pasa al controlador
}

module.exports = {
    validarCampos
}