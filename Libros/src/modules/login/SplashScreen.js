import React, { useContext,useEffect } from "react";
import { StatusBar, Text,View,StyleSheet} from "react-native";
import * as Animatable from 'react-native-animatable';
import { getUsuario } from "./storage/UsuarioAsyncStorage";
import { UsuarioContext } from "./context/UsuarioContext";

export default function SplashScreen(props){

    const [login, loginAction] = useContext(UsuarioContext);

    useEffect(()=>{
        fetchSesion(loginAction)
    },[])

    
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)'/>
                <Animatable.Image 
                    animation='pulse'
                    easing='ease-out'
                    iterationCount='infinite'
                    style={{
                        width:200,
                        height:200,
                    }}
                    source={require('../../img/logo.png')}
                />
            </View>
        )

        async function fetchSesion(loginAction){
            const response = await getUsuario();
            if (response == null) {
                setTimeout(()=>{
                    goToScreen('Login');
                },3000);
                return
            }

            loginAction({type:'sign-in', data: response})
            setTimeout(()=>{
                goToScreen('TabMenu');
            },500);
        }

        function goToScreen(routeName){
            props.navigation.replace(routeName);
        }
    
}



