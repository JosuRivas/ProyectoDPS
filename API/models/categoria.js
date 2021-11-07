

const {Schema,model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,  //otro objeto de mongo
        ref:'Usuario',
        required:true
    }
});

CategoriaSchema.methods.toJSON = function() {
    const { __v, estado,...data } = this.toObject(); //quito la version  de la respuesta del objeto 
    return data; // todos los demas se almacenan en usuario
}

module.exports = model('Categoria',CategoriaSchema);