const { response, request } = require('express');
const {Usuario}= require('../models');
const bcryptjs = require('bcryptjs');



const usuariosGet = async(req = request, res = response) => {
    const query = {estado:true};
    const {limite = 5,desde = 0} = req.query;

/*
    const usuarios = await Usuario.find(query) // condicion para retornar usuarios
        .skip(Number(desde)) 
        .limit(Number(limite));

    const total = await Usuario.countDocuments(query);
*/
    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query), // total
        Usuario.find(query) // usuarios
            .skip(Number(desde)) 
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    const { nombre,correo,password,rol } = req.body;
    const usuario = new Usuario({nombre,correo,password,rol}); //crea la instancia en al db
    
    //encriptar la contraseña

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save(); //graba los datos en la db

    res.json({ 
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params; //parametro que recibe en la ruta
    const {_id,password, google, correo, ...resto} = req.body; // excluye los que no quiero actualizar

    //validar contra bd
    if (password) {
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt); 
    }
    const usuariodb = await Usuario.findByIdAndUpdate(id,resto)//encuentra el id en la bd y actualiza el resto

    res.json(usuariodb);
}

const usuariosPatch = (req, res = response) => {
    res.json({ 
        msg:'path API - controlador'
    });
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    
    //Borrarlo fisicamente (no recomendado)
    //const usuario = await Usuario.findByIdAndDelete(id);
    
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    const usuarioAutenticado = req.usuario;
    res.json({ 
        usuario,usuarioAutenticado
    });
}




module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}