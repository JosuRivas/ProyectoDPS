import React from 'react'; 
import {StyleSheet,Text,ScrollView,View,Image, Pressable} from 'react-native';

export default function bookPage({route,navigation}){
    const {book} = route.params;

    return(
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{book.Titulo}</Text>
                <Text style={styles.author}>{book.Autor}</Text>
                <Image
                    style={styles.bookCover}
                    source={{uri: book.Portada}}
                />
                <Pressable>
                    <Text style={styles.price}>${book.Precio}</Text>
                </Pressable>
                <View>
                    <Text style={styles.description}>{book.Descripcion}</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    bookCover:{
        marginRight:10,
        width:200,
        height:300,
        borderRadius:15,
    },
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        width:'50%',
        marginHorizontal:'25%'
    },
    title:{
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
    },
    author:{
        textAlign:'center',
        fontSize:20,
        marginBottom:5
    },
    price:{
        color:'#990000',
        textAlign:'center',
        fontSize:20,
    },
    description:{
        textAlign:'center',
        fontSize:15,
    }
})