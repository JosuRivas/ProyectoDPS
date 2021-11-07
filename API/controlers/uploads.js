const path = require('path');
const fs = require('fs');
const { Usuario, Producto } = require("../models");
const { subirArchivo } = require("../helpers/subir-archivo");
const { response } = require('express');

const cargarArchivo = async (req, res = response) => {
  	try {
    	const nombre = await subirArchivo(req.files, undefined, "imgs");

    	res.json({ nombre });
  	} catch (error) {
    	res.status(400).json({ error });
  	}
	};

const actualizarImagen = async (req, res = response) => {  
	const { id, coleccion } = req.params;

  	let modelo;

	switch (coleccion) {
		case "usuarios":
			modelo = await Usuario.findById(id);
			if (!modelo) {
				return res.status(400).json({msg:`No existe un usuario con el id: ${id}`})
			}
			break;

		case 'productos':
			modelo = await Producto.findById(id);
			if (!modelo) {
				return res.status(400).json({msg:`No existe un producto con el id: ${id}`})
			}
			break;
		default:
		return res.status(500).json({ msg: "Se me olvido validar esto" });
	}

	// Limpiar imagenes previas
	if (modelo.img) {//si existe la propiedad
		//Borrar la imagen que existe en el server
		const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
		if (fs.existsSync(pathImagen)) {
			fs.unlinkSync(pathImagen); // si existe la imagen se borra
		}
	}

	const nombre = await subirArchivo(req.files, undefined, coleccion);
	modelo.img = nombre;
	await modelo.save();

	res.json(modelo);
};

const actualizarPDF = async(req,res=response) => {
	const { id } = req.params;

	let modelo;
	modelo = await Producto.findById(id);
	if (!modelo) {
		return res.status(400).json({msg:`No existe un producto con el id: ${id}`})
	}

	// Limpiar archivos
	if (modelo.pdf) {//si existe la propiedad
		//Borrar el archivo que existe en el server
		const pathPDF = path.join(__dirname,'../uploads/archivos',modelo.pdf);
		if (fs.existsSync(pathPDF)) {
			fs.unlinkSync(pathPDF); // si existe el archivo se borra3
		}
	}

	const nombre = await subirArchivo(req.files, undefined, 'archivos');
	modelo.pdf = nombre;
	await modelo.save();

	res.json(modelo);

}

const mostrarImagen = async(req,res=response) => {

	const {id,coleccion} = req.params;

	let modelo;

	switch (coleccion) {
		case "usuarios":
			modelo = await Usuario.findById(id);
			if (!modelo) {
				return res.status(400).json({msg:`No existe un usuario con el id: ${id}`})
			}
			break;

		case 'productos':
			modelo = await Producto.findById(id);
			if (!modelo) {
				return res.status(400).json({msg:`No existe un producto con el id: ${id}`})
			}
			break;

		case 'archivos':
			modelo = await Producto.findById(id);
			if (!modelo) {
				return res.status(400).json({msg:`No existe un producto con el id: ${id}`})
			}
			break;

		default:
		return res.status(500).json({ msg: "Se me olvido validar esto" });
	}

	if (coleccion == 'archivos') {
		if (modelo.pdf) {
			const pathImagen = path.join(__dirname,'../uploads/archivos',modelo.pdf);
			if (fs.existsSync(pathImagen)) {
				return res.sendFile(pathImagen);
			}
		}
	}
	if (modelo.img) {//si existe la propiedad
		
		const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
		if (fs.existsSync(pathImagen)) {
			return res.sendFile(pathImagen);
		}
	}
	

	const pathPlaceholder = path.join(__dirname,'../assets/no-image.jpg');
	return res.sendFile(pathPlaceholder);
}

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarPDF
};
