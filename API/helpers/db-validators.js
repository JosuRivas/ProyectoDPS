const {Role, Categoria, Producto,Compra} = require('../models');
const {Usuario} = require('../models');
const { findById } = require('../models/categoria');


/*
* Validaciones de usuarios
*/
const esRolValido = async(rol = '') => { //validacion customizada

    const existeRol = await Role.findOne({rol});

    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste = async(correo='') => {

const existeEmail = await Usuario.findOne({correo});

    if (existeEmail) {
        throw new Error('El correo ya existe en la BD');
    }
}

const existeUsuarioPorId = async(id) => {

    const existeUsuario = await Usuario.findById(id);
    
        if (!existeUsuario) {
            throw new Error('El ID no existe');
        }
}

/*
* Validaciones de productos
*/

const existeCategoria = async(id) => {

    const existeCategoria= await Categoria.findById(id);
    
        if (!existeCategoria) {
            throw new Error('La categoria no existe');
        }
}

const existeProducto = async(id) => {

    const existeProducto= await Producto.findById(id);
    
        if (!existeProducto) {
            throw new Error('El producto no existe');
        }
}

/*
* Validaciones de colecciones
*/

const coleccionesPermitidas = (coleccion='',colecciones = []) =>{

    const incluida = colecciones.includes(coleccion);

    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida - ${colecciones}`);
    }

    return true;
}

/*
* Validaciones de compras
*/

const existeCompra = async(id) => {
    const existeCompra = await Compra.findById(id);

    if (!existeCompra) {
        throw new Error('Esa compra no existe');
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas,
    existeCompra,
}