import React, { useState,useContext} from "react";
import {View,Text, Pressable,Image,StatusBar,StyleSheet, Alert} from "react-native";
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {saveUsuario} from "../login/storage/UsuarioAsyncStorage"


export default function LoginScreen({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return(
        <>
        <View style={styles.container}>
            <StatusBar  style={styles.bar}/>

            <View>
                <Image source={require('../../img/logo.png')} style={styles.logo}/>
            </View>

            <Input style={styles.inputs} placeholder="Email" leftIcon={<Icon name={'user'} size={20} color={'#3bceb5'}/>} keyboardType='email-address' value={email} onChangeText={(email)=>setEmail(email)}/>
            <Input style={styles.inputs} placeholder="Password" leftIcon={<Icon name={'lock'} size={20} color={'#3bceb5'}/>} keyboardType='default' secureTextEntry={true} value={password} onChangeText={(password)=>setPassword(password)}/>


                <Pressable onPress={()=> iniciarSesion()}>
                    <Text style={styles.submit}>Iniciar Sesion</Text>
                </Pressable>
          
                <Pressable onPress={()=> goToScreen('Registrar')}>
                    <Text style={styles.register}>Registrarse</Text>
                </Pressable>
        </View>
        </>
    )

    function goToScreen(route){
        
        if (route == 'TabMenu') {
            navigation.navigate(route,{screen:'Inicio'});
        }else{
            navigation.navigate(route);
        }
    }

    async function iniciarSesion(){
        const body = {correo:email,password}
        await fetch('http://10.0.2.2:8080/api/auth/login',{
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then((resp)=>{                
                if (resp.msg) {
                    Alert.alert("Error al iniciar sesión",resp.msg);
                }else{
                    saveUsuario(resp.usuario.correo,resp.token,resp.usuario.uid);
                    goToScreen('TabMenu')
                }
                
            })
            .catch(console.warn); 
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        padding:40,
        backgroundColor:'black',
        
    },
    bar:{
        backgroundColor:'#d7e9ce'
    },
    logo:{
        width:320,
        height:290,
        borderRadius:10,
        marginBottom:30,
        
    },
    submit:{
        padding:15,
        borderRadius:20,
        backgroundColor:'#3bceb5',
        fontSize:15,
        textAlign:'center',
        width:'60%',
        justifyContent:'center',
        marginLeft:60,
        marginTop:15,
        fontFamily:'EncodeSans-Bold'
    },
    register:{
        padding:15,
        borderRadius:20,
        backgroundColor:'#3bceb5',
        fontSize:15,
        fontWeight:"bold",
        textAlign:'center',
        width:'60%',
        justifyContent:'center',
        marginLeft:60,
        marginTop:15,
        fontFamily:'EncodeSans-Bold'
    },
    inputs:{
        fontFamily:'EncodeSans-Regular',
        color:'#fff'
    }
    
});