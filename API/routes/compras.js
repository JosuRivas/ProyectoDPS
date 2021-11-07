const {Router} = require('express');
const {check} = require('express-validator');
const {crearCompra,obtenerCompra,obtenerCompras} = require('../controlers/compras');
const { existeUsuarioPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos} = require('../middlewares');

const router = Router();

router.get('/',obtenerCompras);

router.get('/id/:id',[
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],obtenerCompra);

router.post('/',[
    validarJWT,
    check('usuario','No es un id de mongo').isMongoId(),
    check('libro','No es un id de mongo').isMongoId(),
    validarCampos
],crearCompra);


module.exports = router;