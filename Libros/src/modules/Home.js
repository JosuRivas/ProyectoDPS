import React, {useState,useEffect}from 'react'; 
import {StyleSheet, TextInput,Text, View, Pressable,Alert,StatusBar,BackHandler,ScrollView} from 'react-native';
import { UsuarioContext } from './login/context/UsuarioContext';
import MyCarousel from '../../components/Carousel';
import Productos from '../../components/productos';
import { dummyData } from '../../data/Data';
import { getUsuario,getJWT } from './login/storage/UsuarioAsyncStorage';

export default function Home ({navigation}){
    const [user,setUser] = useState('');
    fetchUser(); 
        

    
    return(
        <ScrollView>

        <View style={styles.container}>
            <Text style={styles.title}>Bienvendo {user}</Text>
            <MyCarousel data = {dummyData}/>
            
             <Productos/>

        </View>
        </ScrollView>
    )

    async function fetchUser(){
        const userData = await getUsuario();
        const jwt = await getJWT();
        console.log(jwt);
        setUser(userData);
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
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
            marginTop:15
    },
    title:{
        color:'#fff',
        fontFamily:'EncodeSans-Bold',
        fontSize:20,
        marginLeft:10
    }
});