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
        onPress={() => navigation.navigate('NewsFeed')}
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
      }}
      drawerContent={props => {
        return <CustomDrawerContent {...props} />;
      }}>
      <Drawer.Screen
        component={ArticleNavigator}
        name="ArticleStack"
        options={{
          headerShown: false,
          drawerLabel: 'NewsFeed',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
