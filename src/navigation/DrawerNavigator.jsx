import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import ArticleNavigator from './ArticleNavigator';

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
      }}>
      <Drawer.Screen
        component={ArticleNavigator}
        name="ArticleStack"
        options={{
          drawerLabel: 'NewsFeed',
        }}
      />
      <Drawer.Screen
        component={ArticleNavigator}
        name="ResourcesStack"
        options={{
          drawerLabel: 'Resources',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
