import React from 'react';
import TabNavigator from './src/modules/TabMenu';
import AppNavigation from './src/modules/login/AppNavigation';
import { UsuarioProvider } from './src/modules/login/context/UsuarioContext';
export default function App(){
  return(
    <>
      <UsuarioProvider>
        <AppNavigation />
      </UsuarioProvider>
    </>
  );
}