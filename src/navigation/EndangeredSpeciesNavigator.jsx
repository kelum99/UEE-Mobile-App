import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EndangeredSpecies from '../screens/EndangeredSpecies/EndangeredSpecies';
import Endangered from '../screens/EndangeredSpecies/Endangered';
import ReadMore from '../screens/EndangeredSpecies/ReadMore';
import AddSpecies from '../screens/EndangeredSpecies/AddSpecies';
import MyRecords from '../screens/EndangeredSpecies/MyRecords';
import {Box, IconButton} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EndangeredPlants from '../screens/EndangeredSpecies/EndangeredPlants';

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
        options={navigation => {
          return {
            title: 'Endangered Animals',
            headerTitleAlign: 'center',
          };
        }}
      />
      <EndangeredStack.Screen
        name="EndangeredPlants"
        component={EndangeredPlants}
        options={navigation => {
          return {
            title: 'Endangered Plants',
            headerTitleAlign: 'center',
          };
        }}
      />
      <EndangeredStack.Screen
        name="ReadMore"
        component={ReadMore}
        options={navigation => {
          return {
            title: '',
          };
        }}
      />
      <EndangeredStack.Screen
        name="AddSpecies"
        component={AddSpecies}
        options={navigation => {
          return {
            title: 'Add Endangered Species',
            headerTitleAlign: 'center',
          };
        }}
      />
      <EndangeredStack.Screen
        name="MyRecords"
        component={MyRecords}
        options={navigation => {
          return {
            title: 'My Records',
            headerTitleAlign: 'center',
          };
        }}
      />
    </EndangeredStack.Navigator>
  );
};

export default EndangeredSpeciesNavigator;
