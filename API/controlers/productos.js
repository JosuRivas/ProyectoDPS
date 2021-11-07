const { response } = require("express");

const {Producto} = require('../models');



const crearProducto = async(req,res=response) => {

    const {estado,usuario,...body} = req.body


    const productodb = await Producto.findOne({nombre:body.nombre}); 
        
    if (productodb) {
        return res.status(400).json({
            msg:`El producto ${productodb.nombre}, ya existe`
    });

}
    const data = {
        ...body,
        nombre:body.nombre.toUpperCase(),
        autor:body.autor.toUpperCase(),
        usuario:req.usuario._id
    }

    const producto = new Producto(data);

    await producto.save();

    res.json(producto);
}

const obtenerProductos = async(req,res=response) => {
    const query = {estado:true};
    const {limite = 15,desde = 0} = req.query;

    const [total,productos] = await Promise.all([
        Producto.countDocuments(query), //total
        Producto.find(query) // productos
            .populate('usuario','nombre')
            .populate('categoria','nombre')
            .skip(Number(desde)) 
            .limit(Number(limite))
    ])
    res.json({
        total,
        productos
    });
}

const obtenerProducto = async(req,res=response) => {
    const {id} = req.params;

    const producto = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre');

    res.json({
        producto
    })
}

const obtenerPorCategoria = async(req,res=response) => {
    const {id} = req.params;

    const query = {categoria:id}
    const total = await Producto.countDocuments(query);
    const results = await Producto.find(query).populate('categoria','nombre');
    res.json({
        total,
        results
    });
}

const actualizarProducto = async(req,res=response) => {
    const { id } = req.params;
    const {estado,usuario,...data} = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id; //id del usuario que actualiza

    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});

    res.json({
        producto
    });

    const productodb = Producto.findByIdAndUpdate(id,resto);
}

const actualizarDescripcion = async(req,res=response) => {
    const { id } = req.params;
    const {descripcion} = req.body;

    let modelo = await Producto.findById(id);

    modelo.descripcion = descripcion;
    modelo.save();
    res.json({
        modelo
    });
}

const eliminarProducto = async(req,res=response) => {
    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id,{estado:false},{new:true});

    res.json({productoBorrado});
}


module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,
    actualizarDescripcion,
    obtenerPorCategoria
}

    
