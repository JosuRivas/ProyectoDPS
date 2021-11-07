const { response } = require("express");

const {Categoria} = require('../models');




const crearCategoria = async(req,res=response) =>{

    try {
        const nombre = req.body.nombre.toUpperCase();
        const categoriadb = await Categoria.findOne({nombre}); 
        if (categoriadb) {
        return res.status(400).json({
            msg:`La categoria ${categoriadb.nombre}, ya existe`
        });
    }

    const data = {
        nombre,
        usuario:req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();
    
    res.json(categoria);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Algo salio mal'
        })
    }

    
}

const actualizarCategoria = async(req,res=response) => {
    const { id } = req.params;
    const {estado,usuario,...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id; //id del usuario que actualiza

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});

    res.json({
        categoria
    });


    const categoriadb = Categoria.findByIdAndUpdate(id,resto);
}

const borrarCategoria = async(req,res=response) => {
    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json({categoriaBorrada});
}

const obtenerCategorias = async(req=request,res=response) =>{
    const query = {estado:true};
    const {limite = 5,desde = 0} = req.query;

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query), //total
        Categoria.find(query) // categorias
            .populate('usuario','nombre')
            .skip(Number(desde)) 
            .limit(Number(limite))
    ])
    res.json({
        total,
        categorias
    });
}

const obtenerCategoria = async(req=request,res=response) =>{
    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate('usuario','nombre');

    res.json({
        categoria
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}