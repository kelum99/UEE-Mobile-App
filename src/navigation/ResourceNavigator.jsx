import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Box, IconButton} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Resources from '../screens/resources/Resources';
import ResourceCat from '../screens/resources/ResourceCat';
import AddResources from '../screens/resources/AddResources';
import Records from '../screens/resources/Records';

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

const ResourceStack = createNativeStackNavigator();
const ResourceNavigator = () => {
  return (
    <ResourceStack.Navigator
      initialRouteName="Resources"
      screenOptions={{
        headerStyle: {backgroundColor: '#0096C7'},
        headerShadowVisible: false,
        headerTintColor: '#fff',
      }}
    >
      <ResourceStack.Screen
        name="Resources"
        component={Resources}
        options={navigation => {
          return {
            headerLeft: () => HeaderLeft(navigation),
            title: 'Resources',
            headerTitleAlign: 'center',
          };
        }}
      />

      <ResourceStack.Screen
        name="ResourceCat"
        component={ResourceCat}
        options={navigation => {
          return {
            title: 'ResourceCat',
            headerTitleAlign: 'center',
          };
        }}
      />

      <ResourceStack.Screen
        name="AddResources"
        component={AddResources}
        options={navigation => {
          return {
            title: 'Add Resources',
            headerTitleAlign: 'center',
          };
        }}
      />

      <ResourceStack.Screen
        name="Records"
        component={Records}
        options={navigation => {
          return {
            title: 'Add Resources',
            headerTitleAlign: 'center',
          };
        }}
      />
    </ResourceStack.Navigator>
  );
};

export default ResourceNavigator;
