import React, {useState,useEffect}from 'react'; 
import {StyleSheet,Text,ScrollView,View,Image,Pressable} from 'react-native';



export default function Store({navigation}){
    const [books,setBooks] = useState([]);
    const [categories,setCategories] = useState([]);
    useEffect(()=>{
            cargarLibros();
        }, [])
    return(
        <>
        <ScrollView nestedScrollEnabled={true}>       

            <View style={styles.container}>
            <View>
                <Text style={styles.sectionHeader}>Fantasia</Text>
            </View>
            <ScrollView horizontal nestedScrollEnabled={true} style={styles.categoryContainer}>
            {books.filter(filtered => filtered.categoria.nombre == 'FANTASIA').map(book => (
                <View>
                    <Text style={styles.imageDesc}></Text>
                    <Pressable onPress={()=> {navigation.navigate("BookPage",{book})}}>
                        <Image
                            style={styles.bookCover}
                            source={{uri: `http://10.0.2.2:8080/api/uploads/productos/${book._id}`}}
                        />
                    </Pressable> 
                    <Text style={styles.imageDesc}>{book.nombre}</Text>  
                    <Text style={styles.imageDesc}>{book.autor}</Text>
                    
                </View>))}
            </ScrollView>
            </View>

             <View style={styles.container}>
            <View>
                <Text style={styles.sectionHeader}>Ciencia Ficcion</Text>
            </View>
            <ScrollView horizontal nestedScrollEnabled={true} style={styles.categoryContainer}>
            {books.filter(filtered => filtered.categoria.nombre == 'CIENCIA FICCION').map(book => (
                <View>
                    <Text style={styles.imageDesc}></Text>
                    <Pressable onPress={()=> {navigation.navigate("BookPage",{book})}}>
                        <Image
                            style={styles.bookCover}
                            source={{uri: `http://10.0.2.2:8080/api/uploads/productos/${book._id}`}}
                        />
                    </Pressable> 
                    <Text style={styles.imageDesc}>{book.nombre}</Text>  
                    <Text style={styles.imageDesc}>{book.autor}</Text>
                    
                </View>))}
            </ScrollView>
            </View>

            <View style={styles.container}>
            <View>
                <Text style={styles.sectionHeader}>Misterio</Text>
            </View>
            <ScrollView horizontal nestedScrollEnabled={true} style={styles.categoryContainer}>
            {books.filter(filtered => filtered.categoria.nombre == 'MISTERIO').map(book => (
                <View>
                    <Text style={styles.imageDesc}></Text>
                    <Pressable onPress={()=> {navigation.navigate("BookPage",{book})}}>
                        <Image
                            style={styles.bookCover}
                            source={{uri: `http://10.0.2.2:8080/api/uploads/productos/${book._id}`}}
                        />
                    </Pressable> 
                    <Text style={styles.imageDesc}>{book.nombre}</Text>  
                    <Text style={styles.imageDesc}>{book.autor}</Text>
                    
                </View>))}
            </ScrollView>
            </View>

        </ScrollView>
        </>    
    )

    function cargarLibros(){
        fetch('http://10.0.2.2:8080/api/productos',{
            method:'get',
            headers:{
                'Content-Type':'application/json'
            }
            })
            .then(resp => resp.json())
            .then(resp=>{                
            if (resp.msg) {
                Alert.alert("Error al obtener productos:",resp.msg);
            }else{
                setBooks(resp.productos);
                let categorias = [];
                resp.productos.map(libro =>{
                    if (!categorias.includes(libro.categoria.nombre)) {
                        categorias.push(libro.categoria.nombre);
                    }
                })
                setCategories(categorias);
            }
        
            })
            .catch(console.warn)
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'black'
    },
    bookCover:{
        marginRight:10,
        width:200,
        height:320,
        borderRadius:15
    },
    sectionHeader:{
        fontSize:20,
        fontFamily:'EncodeSans-Bold',
        color:'#fff'

    },
    categoryContainer:{
        marginVertical:25,
        marginHorizontal:5,

    },
    imageDesc:{
        marginTop:5,
        textAlign:'center',
        color:'#fff',
        fontFamily:'EncodeSans-Regular'
    }
});