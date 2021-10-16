import React ,{useContext}from 'react'; 
import {StyleSheet,Text, View,Pressable,Alert} from 'react-native';
import { UsuarioContext } from './login/context/UsuarioContext';


export default function Settings({navigation}){

    const [login, loginAction] = useContext(UsuarioContext);


    function desconectarse(){
        Alert.alert(
            "Salir",
            "¿Esta seguro que \ndesea cerrar sesión?",
            [
                {
                    text:"Si",onPress:()=>{
                        loginAction({
                            type:'sign-out',
                            data:{}
                        })
                        goToScreen('Login')
                    }
                },
                {
                    text:"No",onPress:()=>{},style:'cancel'
                }
            ]
        )
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Más opciones</Text>
            <Pressable onPress={()=>desconectarse()}>
                <Text style={styles.submit}>Cerrar Sesión</Text>
            </Pressable>
        </View>
    )

    function goToScreen(route){
        navigation.navigate(route);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
        alignContent:'center',
    },
    submit:{
            padding:15,
            borderRadius:20,
            backgroundColor:'#3bceb5',
            fontSize:15,
            fontFamily:'EncodeSans-Bold',
            textAlign:'center',
            width:'60%',
            justifyContent:'center',
            marginTop:15,
            marginLeft:80
    },
    title:{
        color:'#fff',
        fontFamily:'EncodeSans-Bold',
        fontSize:20,
        textAlign:'center',
        marginBottom:15
    }
});