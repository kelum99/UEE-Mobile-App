import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import ArticleNavigator from './ArticleNavigator';
import EndangeredSpeciesNavigator from './EndangeredSpeciesNavigator';
import AdminNavigator from './AdminNavigator';
import ResourceNavigator from './ResourceNavigator';

const CustomDrawerContent = ({navigation}) => {
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="NewsFeed"
        onPress={() => navigation.navigate('ArticleStack')}
      />
      <DrawerItem
        label="Resources"
        onPress={() => navigation.navigate('ResourcesStack')}
      />
      <DrawerItem
        label="Endangered Species"
        onPress={() => navigation.navigate('EndangeredStack')}
      />
      <DrawerItem
        label="Admin"
        onPress={() => navigation.navigate('AdminStack')}
      />
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerLabelStyle: {fontSize: 16},
        headerTitleAlign: 'center',
        headerStyle: {backgroundColor: '#0096C7'},
        headerShadowVisible: false,
        headerTintColor: '#fff',
        headerShown: false,
      }}
      drawerContent={props => {
        return <CustomDrawerContent {...props} />;
      }}
    >
      <Drawer.Screen
        component={ArticleNavigator}
        name="ArticleStack"
        options={{
          drawerLabel: 'NewsFeed',
        }}
      />
      <Drawer.Screen
        component={ResourceNavigator}
        name="ResourcesStack"
        options={{
          drawerLabel: 'Resources',
        }}
      />
      <Drawer.Screen
        component={EndangeredSpeciesNavigator}
        name="EndangeredStack"
        options={{
          drawerLabel: 'Endangered Species',
        }}
      />
      <Drawer.Screen
        component={AdminNavigator}
        name="AdminStack"
        options={{
          drawerLabel: 'Admin',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
