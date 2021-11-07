import React, {useState,useEffect}from 'react'; 
import {StyleSheet,Text,ScrollView,View,Image, Pressable, Animated, Alert} from 'react-native';
import { getJWT, getUID, getUsuario } from '../login/storage/UsuarioAsyncStorage';

export default function bookPage({route,navigation}){
    const [uid,setUID] = useState('');
    const [token,setToken] = useState('');
    const {book} = route.params;
    useEffect(()=>{
        fetchUser(); 
    }, []) 
    return(
        <>
            <ScrollView style={styles.container}>
                <View style={styles.bookContainer}>
                    <Text style={styles.title}>{book.nombre}</Text>
                    <Text style={styles.author}>{book.autor}</Text>
                    <Image
                        style={styles.bookCover}
                        source={{uri: `http://10.0.2.2:8080/api/uploads/productos/${book._id}`}}
                    />
                    <Pressable style={styles.priceBtn} onPress={()=>{
                        comprarLibro();
                    }}>
                        <Text style={styles.price}>Comprar: ${book.precio}</Text>
                    </Pressable>
                    <View>
                        <Text style={styles.description}>{book.descripcion}</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    )

    async function comprarLibro(){
        const body = {usuario:uid,libro:book._id}
        fetch('http://10.0.2.2:8080/api/compras',{
                method:'post',
                headers:{
                    'Content-Type':'application/json',
                    'x-token':token
                },
                body:JSON.stringify(body)
        })
            .then(resp => resp.json())
            .then(resp=>{                
                if (resp.msg) {
                    Alert.alert("Error al hacer la compra",resp.msg);
                }else{
                    Alert.alert("Compra realizada con exito!");
                }
                
            })
            .catch(console.warn); 
    }

    async function fetchUser(){
        const uid = await getUID();
        const token = await getJWT();
        setToken(token);setUID(uid);
    }
}

const styles = StyleSheet.create({
    bookCover:{
        marginRight:10,
        width:220,
        height:350,
        borderRadius:15,
        marginLeft:30,
        marginBottom:10
    },
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'black',
        
    },
    title:{
        textAlign:'center',
        fontSize:20,
        fontFamily:'EncodeSans-Bold',
        color:'#fff'
    },
    author:{
        textAlign:'center',
        fontSize:20,
        marginBottom:5,
        color:'#fff',
        fontFamily:'EncodeSans-Regular'
    },
    price:{
        color:'#3bceb5',
        textAlign:'center',
        fontSize:20,
        padding:5,
        fontFamily:'EncodeSans-Regular',
        
    },
    description:{
        textAlign:'center',
        fontSize:15,
        color:'#fff',
        fontFamily:'EncodeSans-Regular'
    },
    bookContainer:{
        width:'70%',
        marginHorizontal:'15%',

    },
    priceBtn:{
        borderRadius:15,
        borderColor:'#3bceb5',
        borderStyle:'solid',
        borderWidth:2,
        maxWidth:200,
        marginLeft:'15%',
        marginVertical:'5%',
    },
})