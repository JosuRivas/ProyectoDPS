
const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatoria'],
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:true,
        default:'USER_ROLE'
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password,_id, ...usuario } = this.toObject(); //quito la version y el password de la respuesta del objeto 
    usuario.uid = _id; // cambia el nombre _id por uid en todas las request
    return usuario; // todos los demas se almacenan en usuario
}

module.exports = model( 'Usuario',UsuarioSchema );