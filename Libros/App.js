import React, {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Home from './src/modules/Home'; import Library from './src/modules/Library';
import Store from './src/modules/Store'; import Settings from './src/modules/Settings';
import bookPage from './src/modules/subpages/bookPage';
const Tab = createBottomTabNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Inicio') {
                      iconName = focused
                        ? 'home'
                        : 'home-outline';
                    } else if (route.name === 'Tienda') {
                      iconName = focused ? 'cart' : 'cart-outline';
                    }else if (route.name === 'Biblioteca') {
                      iconName = focused ? 'book' : 'book-outline';
                    }else if (route.name === 'Más') {
                      iconName = focused ? 'settings' : 'settings-outline';
                    }
        
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                  tabBarActiveTintColor: '#3284ce',
                  tabBarInactiveTintColor: 'gray',
                })}
      >
        <Tab.Screen name="Inicio" component={Home} />
        <Tab.Screen name="Tienda" component={Store} />
        <Tab.Screen name="Biblioteca" component={Library} />
        <Tab.Screen name="Más" component={Settings} />
        <Tab.Screen name="BookPage" component={bookPage} options={{tabBarButton: () => null,tabBarVisible: false,}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}