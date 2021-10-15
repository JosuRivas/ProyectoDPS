import React from "react";
import {View,Text, Pressable,Image,StatusBar,StyleSheet} from "react-native";
import { Input } from 'react-native-elements';
import { SocialIcon } from "react-native-elements/dist/social/SocialIcon";
import { ScrollView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import ToolBar from "./ToolBar";


export default function RegisterScreen({navigation}){

    return(
        <>
        <ScrollView
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'
        >
        <ToolBar 
            titulo='Registrarse'
            onPressLeft={()=> navigation.navigate('Login')}
            iconLeft={<Icon name={'chevron-left'} />}
        />
        <View style={styles.container}>
            <Text>Crea tu cuenta</Text>
            <Input placeholder='Nombre' leftIcon={<Icon name={'pencil'} size={20}/>}/>
            <Input placeholder='Apellidos' leftIcon={<Icon name={'pencil'} size={20}/>}/>
            <Input placeholder='Email' leftIcon={<Icon name={'user'} size={20}/>}/>
            <Input placeholder='Contraseña' leftIcon={<Icon name={'lock'} size={20}/>}/>

            <Pressable onPress={()=>navigation.navigate('Login')}>
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
        marginVertical:15
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