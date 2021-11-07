const {response, json} = require('express');
const bcryptjs = require('bcryptjs');
const {Usuario}= require('../models');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');



const login = async(req,res = response) =>{

    const {correo,password} = req.body;
    
    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:'Usuario / Contraseña no son correctos - correo'
            })
        }
        //verificar si el usuario esta activo en la bd
        if (!usuario.estado) {
            return res.status(400).json({
                msg:'Usuario / Contraseña no son correctos - estado:false'
            })
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password); // compara el password de la request con el de la bd
        if (!validPassword) {
            return res.status(400).json({
                msg:'Usuario / Contraseña no son correctos - password'
            })
        }
        //generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Algo salio mal'
        })
    }

}

const googleSignIn = async(req,res=response) =>{

    const {id_token} = req.body;

    try {

        const {correo,nombre,img} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if (!usuario) {
            //crearlo
            const data = {
                nombre,
                correo,
                password:':P',
                img,
                google:true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        //si el usuario en bd
        if (!usuario.estado) {
            return res.status(401).json({
                msg:'usuario bloqueado, hable con el administrador'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Token de Google no valido'
        })
    }

    
}

module.exports = {
    login,
    googleSignIn
}