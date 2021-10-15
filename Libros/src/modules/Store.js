import React from 'react'; 
import {StyleSheet,Text,ScrollView,View,Image,Pressable} from 'react-native';
import books from '../../data/books.json';



export default function Store({navigation}){

    return(
        <>
        <ScrollView nestedScrollEnabled={true}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.sectionHeader}>Fantasía</Text>
                </View>
                <ScrollView horizontal nestedScrollEnabled={true} style={styles.categoryContainer}>
                    {books.Fantasia.map(book => (
                        <View>
                            <Pressable onPress={()=> {navigation.navigate("BookPage",{book})}}>
                                <Image
                                    style={styles.bookCover}
                                    source={{uri: book.Portada}}
                                />
                            </Pressable>
                            <Text style={styles.imageDesc}>{book.Titulo}</Text>  
                            <Text style={styles.imageDesc}>{book.Autor}</Text>
                        </View>))}
                </ScrollView>
            </View>

            <View style={styles.container}>
                <View>
                    <Text style={styles.sectionHeader}>Ciencia Ficción</Text>
                </View>
                <ScrollView horizontal nestedScrollEnabled={true} style={styles.categoryContainer}>
                    {books.Ciencia_Ficcion.map(book => (
                        <View>
                            <Pressable onPress={()=> {navigation.navigate("BookPage",{book})}}>
                                <Image
                                    style={styles.bookCover}
                                    source={{uri: book.Portada}}
                                />
                            </Pressable>
                            <Text style={styles.imageDesc}>{book.Titulo}</Text>  
                            <Text style={styles.imageDesc}>{book.Autor}</Text>
                        </View>))}
                </ScrollView>
            </View>

            <View style={styles.container}>
                <View>
                    <Text style={styles.sectionHeader}>Misterio</Text>
                </View>
                <ScrollView horizontal nestedScrollEnabled={true} style={styles.categoryContainer}>
                    {books.Misterio.map(book => (
                        <View>
                            <Pressable onPress={()=> {navigation.navigate("BookPage",{book})}}>
                                <Image
                                    style={styles.bookCover}
                                    source={{uri: book.Portada}}
                                />
                            </Pressable>
                            <Text style={styles.imageDesc}>{book.Titulo}</Text>  
                            <Text style={styles.imageDesc}>{book.Autor}</Text>
                        </View>))}
                </ScrollView>
            </View>
        </ScrollView>
        
         </>
        
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    bookCover:{
        marginRight:10,
        width:200,
        height:300
    },
    sectionHeader:{
        fontSize:20,
        fontWeight:'bold'

    },
    categoryContainer:{
        marginVertical:25,
        marginHorizontal:5,

    },
    imageDesc:{
        textAlign:'center',
    }
});