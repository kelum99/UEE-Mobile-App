import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Box, IconButton} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WelcomeBack from '../screens/Admin/WelcomeBack';
import AdminDashboard from '../screens/Admin/AdminDashboard';
import CreateAdmin from '../screens/Admin/CreateAdmin';
import CreateUser from '../screens/Admin/CreateUser';
import ViewAdmin from '../screens/Admin/ViewAdmin';
import EditAdmin from '../screens/Admin/EditAdmin';
import Posts from '../screens/Admin/Posts';
import ViewPost from '../screens/Admin/ViewPost';

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

const AdminStack = createNativeStackNavigator();
const AdminNavigator = () => {
  return (
    <AdminStack.Navigator
      initialRouteName="AdminDashboard"
      screenOptions={{
        headerStyle: {backgroundColor: '#0096C7'},
        headerShadowVisible: false,
        headerTintColor: '#fff',
      }}>
      <AdminStack.Screen
        name="WelcomeBack"
        component={WelcomeBack}
        options={{title: ''}}
      />
      <AdminStack.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={navigation => {
          return {
            title: '',
            headerTitleAlign: 'center',
          };
        }}
      />
      <AdminStack.Screen
        name="CreateAdmin"
        component={CreateAdmin}
        options={navigation => {
          return {
            title: '',
            headerTitleAlign: 'center',
          };
        }}
      />
      <AdminStack.Screen
        name="CreateUser"
        component={CreateUser}
        options={{title: '', headerShown: false}}
      />
      <AdminStack.Screen
        name="ViewAdmin"
        component={ViewAdmin}
        options={navigation => {
          return {
            title: '',
            headerTitleAlign: 'center',
          };
        }}
      />
      <AdminStack.Screen
        name="EditAdmin"
        component={EditAdmin}
        options={navigation => {
          return {
            title: '',
            headerTitleAlign: 'center',
          };
        }}
      />
      <AdminStack.Screen
        name="Posts"
        component={Posts}
        options={navigation => {
          return {
            title: '',
            headerTitleAlign: 'center',
          };
        }}
      />
      <AdminStack.Screen
        name="ViewPost"
        component={ViewPost}
        options={navigation => {
          return {
            title: '',
            headerTitleAlign: 'center',
          };
        }}
      />
    </AdminStack.Navigator>
  );
};

export default AdminNavigator;
