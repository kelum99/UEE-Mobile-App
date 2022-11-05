import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EndangeredSpecies from '../screens/EndangeredSpecies/EndangeredSpecies';
import Endangered from '../screens/EndangeredSpecies/Endangered';
import {Box, IconButton} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const HeaderLeft = ({navigation}) => {
  return (
    <Box>
      <IconButton
        _icon={{
          as: MaterialIcons,
          name: 'menu',
          color: '#fff',
          size: 'lg',
        }}
        onPress={() => navigation.openDrawer()}
      />
    </Box>
  );
};

const EndangeredStack = createNativeStackNavigator();
const EndangeredSpeciesNavigator = () => {
  return (
    <EndangeredStack.Navigator
      initialRouteName="EndangeredSpecies"
      screenOptions={{
        headerStyle: {backgroundColor: '#0096C7'},
        headerShadowVisible: false,
        headerTintColor: '#fff',
      }}>
      <EndangeredStack.Screen
        name="EndangeredSpecies"
        component={EndangeredSpecies}
        options={navigation => {
          return {
            headerLeft: () => HeaderLeft(navigation),
            title: 'Endangered Species',
            headerTitleAlign: 'center',
          };
        }}
      />
     <EndangeredStack.Screen
            name="Endangered"
            component={Endangered}
            options={{title: ''}}
          />
    </EndangeredStack.Navigator>
  );
};

export default EndangeredSpeciesNavigator;
