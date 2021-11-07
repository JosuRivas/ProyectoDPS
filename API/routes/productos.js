const {Router} = require('express');
const {check} = require('express-validator');
const { crearProducto, obtenerProducto, obtenerProductos, actualizarProducto, eliminarProducto,actualizarDescripcion, obtenerPorCategoria } = require('../controlers/productos');
const { existeProducto, existeCategoria } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/',obtenerProductos);

router.get('/categoria/:id',[
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerPorCategoria);

router.get('/:id',[
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],obtenerProducto);

router.post('/',[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('autor','el autor es obligatorio').not().isEmpty(),
    check('categoria','No es un id de mongo').isMongoId(),
    validarCampos
],crearProducto);

router.put('/descripcion/:id',[
    validarJWT,
    check('id').custom(existeProducto),
    validarCampos
],actualizarDescripcion);

router.put('/:id',[
    validarJWT,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],actualizarProducto);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],eliminarProducto);

module.exports = router;