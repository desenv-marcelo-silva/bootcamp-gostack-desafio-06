import 'react-native-gesture-handler';

// Sempre depois do Reactotron pra que seja possível
// ver dentro dele em caso de erro
import './config/ReactotronConfig';

import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

export default function App() {
  return (
    <NavigationContainer>
      <>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <Routes />
      </>
    </NavigationContainer>
  );
}

// ./emulator -avd Galaxy_Nexus_API_27 -netdelay none -netspeed full

// ~/Android/Sdk/emulator/emulator -avd Galaxy_Nexus_API_27 -netdelay none -netspeed full
// ~/Android/Sdk/emulator/emulator -avd Nexus_5X_API_29_x86 -netdelay none -netspeed full
