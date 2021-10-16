import React, {useState}from 'react'; 
import {StyleSheet,Text,ScrollView,View,Image, Pressable, Animated} from 'react-native';

export default function bookPage({route,navigation}){
    const {book} = route.params;
    const [selected,setSelected] = useState(false);
    return(
        <>
            <ScrollView style={styles.container}>
                <View style={styles.bookContainer}>
                    <Text style={styles.title}>{book.Titulo}</Text>
                    <Text style={styles.author}>{book.Autor}</Text>
                    <Image
                        style={styles.bookCover}
                        source={{uri: book.Portada}}
                    />
                    <Pressable style={selected ? styles.selected : styles.priceBtn} onPress={()=>{
                        setSelected(!selected);
                    }}>
                        <Text style={styles.price}>Comprar: ${book.Precio}</Text>
                    </Pressable>
                    <View>
                        <Text style={styles.description}>{book.Descripcion}</Text>
                    </View>
                </View>
            </ScrollView>
        </>
    )
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
        fontFamily:'EncodeSans-Regular'
        
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