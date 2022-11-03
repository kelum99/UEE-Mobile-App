import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import MainNavigator from './src/navigation/MainNavigator';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <StatusBar animated backgroundColor="#fff" barStyle="dark-content" />
        <MainNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
