import AsyncStorage from '@react-native-async-storage/async-storage';

const USUARIO_KEY = '@usuario:key'

const saveUsuario = async (usuario) =>{

    try{
        await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
        return JSON.stringify(usuario);

    } catch (error) {
        console.log('error al guardar', error.message);
        return 'error';        
    }
}

const getUsuario = async () =>{
    try {
        const item = await AsyncStorage.getItem(USUARIO_KEY);
        return JSON.parse(item);
    } catch (error) {
        console.log('error al recuperar', error.message);
        return 'error';           
    }
}

const deleteUsuario = async () =>{
    try {
        await AsyncStorage.removeItem(USUARIO_KEY);
        const item = await AsyncStorage.getItem(USUARIO_KEY);
        return (item == null ? "Usuario removido" : "Usuario no removido");
    } catch (error) {
        console.log('error al eliminar', error.message);
        return 'error';           
    }
}

export {saveUsuario,getUsuario,deleteUsuario}