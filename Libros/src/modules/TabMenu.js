import Home from './Home';
import Store from './Store';
import bookPage from './subpages/bookPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Library from './Library';
import Settings from './Settings';
import React from 'react';
import readBook from './subpages/readBook';
const Tab = createBottomTabNavigator();

export default function TabMenu(){
  return(

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
                  tabBarActiveTintColor: '#3bceb5',
                  tabBarInactiveTintColor: 'gray',
                  tabBarInactiveBackgroundColor:'black',
                  tabBarActiveBackgroundColor:'black'
                  
                })}
                sceneContainerStyle={{backgroundColor:'black'}}
      >
        <Tab.Screen name="Inicio" component={Home} options={{headerShown:false}} />
        <Tab.Screen name="Tienda" component={Store} options={{headerShown:false}} />
        <Tab.Screen name="Biblioteca" component={Library} options={{headerShown:false}} />
        <Tab.Screen name="Más" component={Settings} options={{headerShown:false}} />
        <Tab.Screen name="BookPage" component={bookPage} options={{tabBarButton: () => null,tabBarVisible: false,headerShown:false}} />
        <Tab.Screen name="ReadBook" component={readBook} options={{tabBarButton: () => null,tabBarVisible: false,headerShown:false}} />
      </Tab.Navigator> 

  )


}