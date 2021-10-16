import React, {createContext, useReducer} from "react";
import { saveUsuario, deleteUsuario } from "../storage/UsuarioAsyncStorage";
const initalState = {
    usuario:{
        nombre:'',
        apellido:'',
        email:'',
        password:''
    },
    activo: false
}

const usuarioReducer = (state = initalState,payload) =>{

    switch (payload.type) {
        case 'sign-in':
           return { ...state,usuario: payload.data, activo:true} 
        case 'sign':
            saveUsuario(payload.data);
            return { ...state,usuario: payload.data, activo:true}
        case 'sign-out':
            deleteUsuario(payload.data).then((msg)=>alert('Sesion cerrada'));
            return { ...state,usuario: payload.data, activo:false} 
        default:
            return state;
    
    }
}

const UsuarioContext = createContext(initalState);

const UsuarioProvider = (props) =>{
    const [login, loginAction] = useReducer(usuarioReducer,initalState);

    return(
        <UsuarioContext.Provider value={[login,loginAction]}>
            {props.children}
        </UsuarioContext.Provider>
    )
}

export {UsuarioContext,UsuarioProvider}