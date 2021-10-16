import React, {useContext, useEffect}from 'react'; 
import {StyleSheet, TextInput,Text, View, Pressable,Alert,StatusBar,BackHandler,ScrollView} from 'react-native';
import { UsuarioContext } from './login/context/UsuarioContext';
import MyCarousel from '../../components/Carousel';
import Productos from '../../components/productos';
import { dummyData } from '../../data/Data';
function useBackButton(handler){
    useEffect(()=>{
        BackHandler.addEventListener('hardwareBackPress',handler);

        return() =>{
            BackHandler.removeEventListener('hardwareBackPress',handler);
        }
    },[handler])
}



export default function Home({navigation}){

    useBackButton(desconectarse);
    const [login, loginAction] = useContext(UsuarioContext);

    return(
        <ScrollView>

        <View style={styles.container}>
            <Text style={styles.title}>Bienvendo {login.usuario.email}</Text>
            <MyCarousel data = {dummyData}/>
            
             <Productos/>

        </View>
        </ScrollView>
        /*<View style={styles.container}>
            
            
            <Pressable onPress={()=>desconectarse()}>
                <Text style={styles.submit}>Cerrar Sesión</Text>
            </Pressable>
        </View>*/
    )

    function goToScreen(route){
        navigation.navigate(route);
    }

    function desconectarse(){
        Alert.alert(
            "Salir",
            "¿Esta seguro que \ndesea cerrar sesión?",
            [
                {
                    text:"Si",onPress:()=>{
                        loginAction({
                            type:'sign-out',
                            data:{}
                        })
                        goToScreen('Login')
                    }
                },
                {
                    text:"No",onPress:()=>{},style:'cancel'
                }
            ]
        )
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