const {Router} = require('express');
const {check} = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarPDF } = require('../controlers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const {validarCampos,validarArchivo} = require('../middlewares');

const router = Router();


router.post('/',validarArchivo,cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','Debe de ser un id de Mongo').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagen);

router.post('/archivos/:id',[
    validarArchivo,
    check('id','Debe de ser un id de Mongo').isMongoId(),
    validarCampos
],actualizarPDF);

router.get('/:coleccion/:id',[
    check('id','Debe de ser un id de Mongo').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos','archivos'])),
    validarCampos
],mostrarImagen)





module.exports = router;