import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import MainNavigator from './src/navigation/MainNavigator';
import {StatusBar} from 'react-native';
import {RequestContextProvider} from './src/services/RequestContext';

const App = () => {
  return (
    <NativeBaseProvider>
      <RequestContextProvider baseURL={'http://10.0.2.2:5000/api/'}>
        <NavigationContainer>
          <StatusBar
            animated
            backgroundColor="#0096C7"
            barStyle="dark-content"
          />
          <MainNavigator />
        </NavigationContainer>
      </RequestContextProvider>
    </NativeBaseProvider>
  );
};
export default App;
