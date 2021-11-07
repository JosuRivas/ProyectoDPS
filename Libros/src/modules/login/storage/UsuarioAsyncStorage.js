import AsyncStorage from '@react-native-async-storage/async-storage';

const USUARIO_KEY = '@usuario:key';
const JWT_KEY = '@jwt:key';
const UID_KEY = '@uid:key';

const saveUsuario = async (usuario,key,uid) =>{

    try{
        await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
        await AsyncStorage.setItem(JWT_KEY,JSON.stringify(key));
        await AsyncStorage.setItem(UID_KEY,JSON.stringify(uid));
        return JSON.stringify(usuario);

    } catch (error) {
        console.log('error al guardar sesion', error.message);
        return 'error';        
    }
}

const getUsuario = async () =>{
    try {
        const item = await AsyncStorage.getItem(USUARIO_KEY);
        return JSON.parse(item);
    } catch (error) {
        console.log('error al recuperar user', error.message);
        return 'error';           
    }
}

const getJWT = async () =>{
    try {
        const item = await AsyncStorage.getItem(JWT_KEY);
        return JSON.parse(item);
    } catch (error) {
        console.log('error al recuperar key', error.message);
        return 'error';           
    }
}

const getUID = async () =>{
    try {
        const item = await AsyncStorage.getItem(UID_KEY);
        return JSON.parse(item);
    } catch (error) {
        console.log('error al recuperar uid', error.message);
        return 'error';           
    }
}

const deleteUsuario = async () =>{
    try {
        await AsyncStorage.removeItem(USUARIO_KEY);
        await AsyncStorage.removeItem(JWT_KEY);
        await AsyncStorage.removeItem(UID_KEY);
        const item = await AsyncStorage.getItem(USUARIO_KEY);
        return (item == null ? "Usuario removido" : "Usuario no removido");
    } catch (error) {
        console.log('error al eliminar user', error.message);
        return 'error';           
    }
}

const deleteJWT = async () =>{
    try {
        await AsyncStorage.removeItem(JWT_KEY);
        const item = await AsyncStorage.getItem(JWT_KEY);
        return (item == null ? "Key removida" : "Key no removida");
    } catch (error) {
        console.log('error al eliminar key', error.message);
        return 'error';           
    }
}

export {saveUsuario,getUsuario,deleteUsuario,deleteJWT,getJWT,getUID}