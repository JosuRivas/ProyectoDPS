const { response } = require("express");
const { body } = require("express-validator");

const {Compra} = require('../models');



const crearCompra = async(req,res=response) => {

    const {usuario,libro} = req.body


    const compradb = await Compra.findOne({usuario:usuario,libro:libro}); 
        
    if (compradb) {
        return res.status(400).json({
            msg:`Ya adquirió este libro`
    });
    }

    const data = {
        usuario,
        libro
    }

    const compra = new Compra(data);

    await compra.save();
    

    res.json(compra);
}

const obtenerCompras = async(req,res=response) => {
    const query = {estado:true};
    const {limite = 5,desde = 0} = req.query;

    const [total,compras] = await Promise.all([
        Compra.countDocuments(query), //total
        Compra.find(query) // categorias
            .populate('usuario','nombre')
            .populate('libro','nombre')
            .skip(Number(desde)) 
            .limit(Number(limite))
    ])
    res.json({
        total,
        compras

    });
}

const obtenerCompra = async(req,res=response) => {
    const {id} = req.params;
    const query = {usuario:id};

    const [total,compras] = await Promise.all([
        Compra.countDocuments(query), //total
        Compra.find(query) // categorias
            .populate('usuario','nombre')
            .populate('libro')
    ])
    res.json({
        total,
        compras

    });
}

module.exports = {
    crearCompra,
    obtenerCompra,
    obtenerCompras,
}

    
