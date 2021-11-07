import React, {useState} from "react";
import {View,Text, Pressable,Image,StatusBar,StyleSheet,Alert} from "react-native";
import { Input } from 'react-native-elements';
import { color } from "react-native-elements/dist/helpers";
import { SocialIcon } from "react-native-elements/dist/social/SocialIcon";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import ToolBar from "./ToolBar";


export default function RegisterScreen({navigation}){

    const [nombre,setNombre] = useState('');
    const [password,setPassword] = useState('');
    const [correo,setCorreo] = useState('');


    return(
        <>
        <ScrollView
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'
            style={{backgroundColor:'black'}}
        >
        <ToolBar 
            titulo='Registrarse'
            onPressLeft={()=> navigation.navigate('Login')}
            iconLeft={<Icon name={'chevron-left'} color="#fff"/>}
        />
        <View style={styles.container}>
            <Text>Crea tu cuenta</Text>
            <Input placeholder='Nombre Completo' leftIcon={<Icon name={'pencil'} size={20} color='#fff'/>} value={nombre} onChangeText={(nombre)=>setNombre(nombre)} style={styles.input}/>
            <Input placeholder='Email' leftIcon={<Icon name={'user'} size={20} color='#fff'/>} value={correo} keyboardType='email-address' onChangeText={(correo)=>setCorreo(correo)} style={styles.input}/>
            <Input style={styles.input} placeholder="Password" leftIcon={<Icon name={'lock'} size={20} color={'#fff'}/>} keyboardType='default' secureTextEntry={true} value={password} onChangeText={(password)=>setPassword(password)}/>

            <Pressable onPress={()=>registrarse()}>
                <Text style={styles.submit}>Registrarse</Text>
            </Pressable>

            <SocialIcon 
                title='Iniciar con Google' 
                button
                type='google-plus-official'
            />

            <Pressable onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.highlight}>¿Ya tienes una cuenta? Inicia sesión</Text>
            </Pressable>

            
        </View>
        </ScrollView>
        
        </>
    )

    function goToScreen(route){
        
        if (route == 'TabMenu') {
            navigation.navigate(route,{screen:'Inicio'});
        }else{
            navigation.navigate(route);
        }
    }

    function registrarse(){
        const body = {
            nombre,
            correo,
            password,
            rol:'USER_ROLE'
        }
        fetch('http://10.0.2.2:8080/api/usuarios',{
                method:'post',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(resp=>{                
                if (resp.errors) {
                    Alert.alert("Error al crear usuario",resp.errors[0].msg);
                }else{
                    Alert.alert("Usuario creado!");
                    goToScreen('Login');
                }
                
            })
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
    input:{
        color:'white'
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
        backgroundColor:'#3bceb5',
        fontSize:15,
        fontWeight:"bold",
        textAlign:'center',
        width:'60%',
        justifyContent:'center',
        marginLeft:60,
        marginVertical:15,
        color:'#fff'
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
    },
    highlight:{
        color:'#ec4141',
        fontSize:15,
        marginLeft:35,
        marginVertical:15

    }
    
});