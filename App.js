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
        <StatusBar animated backgroundColor="#0096C7" barStyle="dark-content" />
        <MainNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
