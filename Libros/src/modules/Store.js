import React from 'react'; 
import {StyleSheet,Text,ScrollView,View,Image} from 'react-native';

export default function Store(){
    let books = require('../books.json');
    return(
        <View style={styles.container}>
            <View style={styles.sectionHeader}>
                <Text>Recomendados</Text>
            </View>
            <ScrollView horizontal>
                {books.libros.map(book => (
                    <View>
                        <Image
                            style={styles.bookCover}
                            source={require('../img/1.jpg')}
                        />
                        <Text>{book.autor}</Text>
                        <Text>{book.titulo}</Text>    
                    </View>))}
            </ScrollView>

            <View style={styles.sectionHeader}>
                <Text>Novedades</Text>
            </View>
                <ScrollView horizontal>
                    {books.libros.map(book => (

                    <View>
                        <Image
                            style={styles.bookCover}
                            source={require('../img/1.jpg')}
                        />
                        <Text>{book.autor}</Text>
                        <Text>{book.titulo}</Text>    
                    </View>))}
                </ScrollView>

                <View style={styles.sectionHeader}>
                <Text>Promociones recomendadas</Text>
            </View>
                <ScrollView horizontal>
                    {books.libros.map(book => (

                    <View>
                        <Image
                            style={styles.bookCover}
                            source={require('../img/1.jpg')}
                        />
                        <Text>{book.autor}</Text>
                        <Text>{book.titulo}</Text>    
                    </View>))}
                </ScrollView>
        </View>

        
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
    }
});