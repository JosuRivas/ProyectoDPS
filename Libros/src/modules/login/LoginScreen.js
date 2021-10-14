import React, { useState,useContext} from "react";
import {View,Text, Pressable,Image,StatusBar,StyleSheet} from "react-native";
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UsuarioContext } from "./context/UsuarioContext";


export default function LoginScreen({navigation}){

    const [login, loginAction] = useContext(UsuarioContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return(
        <>
        <View style={styles.container}>
            <StatusBar  style={styles.bar}/>

            <View>
                <Image source={require('../../img/logo.png')} style={styles.logo}/>
            </View>

            <Input placeholder="Email" leftIcon={<Icon name={'user'} size={20}/>} keyboardType='email-address' value={email} onChangeText={(email)=>setEmail(email)}/>
            <Input placeholder="Password" leftIcon={<Icon name={'lock'} size={20}/>} keyboardType='default' secureTextEntry={true} value={password} onChangeText={(password)=>setPassword(password)}/>


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
        navigation.navigate(route);
    }

    function iniciarSesion(){

        loginAction({
            type:'sign',data:{
                email,password
            }
        })
        goToScreen('TabMenu');
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        padding:40
    },
    bar:{
        backgroundColor:'#d7e9ce'
    },
    logo:{
        width:200,
        height:200,
        borderRadius:10,
        marginLeft:55,
        marginBottom:30
    },
    submit:{
        padding:15,
        borderRadius:20,
        backgroundColor:'#71bf4a',
        fontSize:15,
        fontWeight:"bold",
        textAlign:'center',
        width:'60%',
        justifyContent:'center',
        marginLeft:60,
        marginTop:15
    },
    register:{
        padding:15,
        borderRadius:20,
        backgroundColor:'#71bf4a',
        fontSize:15,
        fontWeight:"bold",
        textAlign:'center',
        width:'60%',
        justifyContent:'center',
        marginLeft:60,
        marginTop:15
    }
    
});