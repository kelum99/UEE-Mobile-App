import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';

const MainStack = createNativeStackNavigator();
const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
    </MainStack.Navigator>
  );
};
export default MainNavigator;
