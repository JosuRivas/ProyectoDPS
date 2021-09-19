import React from 'react'; 
import {StyleSheet, TextInput,Text, View} from 'react-native';

export default function Store(){

    return(
        <View style={styles.container}>
            <Text>Página de la tienda</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});