const {Router} = require('express');
const {check} = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controlers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();

//obtener todas las categorias - publico

router.get('/',obtenerCategorias);

//obtener una categoria por id - publico

router.get('/:id',[
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],obtenerCategoria);

//crear categoria - privado - cualquier persona con token valido

router.post('/',[
    validarJWT,
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

//actualizar registro por id - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);

//borrar una categoria - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos

],borrarCategoria);




module.exports = router;