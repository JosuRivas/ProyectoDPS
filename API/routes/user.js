
const {Router} = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controlers/user');
const {check} = require('express-validator');

//const {validarCampos} = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

const {validarCampos,validarJWT,esAdminRole,tieneRole} = require('../middlewares')

const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[ 
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPut);

router.post('/', [
    check('nombre','el nombre es obligatorio').not().isEmpty(), //segundo argumento son middlewares, tercero es controlador
    check('password','el password debe de ser mas de 6 caracteres').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']), validacion con valores locales
    check('rol').custom(esRolValido), //validacion custom en la BD
    //check('rol').custom((rol) => esRolValido(rol)), es lo mismo que lo de arriba
    validarCampos //verifica los errores de todos los check() se debe poner al final de todos los middlewares
] ,usuariosPost);

router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;


