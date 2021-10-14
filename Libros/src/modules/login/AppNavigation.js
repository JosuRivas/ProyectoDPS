import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import React from 'react';
import TabMenu from '../TabMenu';
import RegisterScreen from './RegisterScreen';
const Stack = createStackNavigator();

export default function AppNavigation(){
    return(
        
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown:false}}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
                <Stack.Screen name="Registrar" component={RegisterScreen} options={{headerShown:false}} />
                <Stack.Screen name="TabMenu" component={TabMenu} options={{headerShown:false}} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
