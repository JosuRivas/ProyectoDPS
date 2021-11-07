

const {Schema,model} = require('mongoose');

const ProductoSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    autor:{
        type:String,
        required:[true,'El autor es obligatorio']
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
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        reequired:true
    },
    descripcion:{
        type:String
    },
    disponible:{
        type:Boolean,
        default:true
    },
    img:{type:String},
    pdf:{type:String}
});

ProductoSchema.methods.toJSON = function() {
    const { __v, estado,...data } = this.toObject(); //quito la version  de la respuesta del objeto 
    return data; // todos los demas se almacenan en usuario
}

module.exports = model('Producto',ProductoSchema);