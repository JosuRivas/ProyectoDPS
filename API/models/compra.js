
const {Schema,model} = require('mongoose');

const CompraSchema = Schema({
    usuario:{
        type:Schema.Types.ObjectId,  //referencia al usuario que lo compro
        ref:'Usuario',
        required:true
    },
    libro:{
        type:Schema.Types.ObjectId, //referencia al libro comprado
        ref:'Producto',
        reequired:true
    },
    
});

CompraSchema.methods.toJSON = function() {
    const { __v,...data } = this.toObject(); //quito la version de la respuesta del objeto 
    return data; // todos los demas se almacenan en usuario
}

module.exports = model('Compra',CompraSchema);