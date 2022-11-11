import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsFeed from '../screens/Article/NewsFeed';
import Article from '../screens/Article/Article';
import {Box, IconButton} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyArticles from '../screens/Article/MyArticles';
import AddArticle from '../screens/Article/AddArticle';

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

const HeaderRight = ({navigation}) => {
  return (
    <Box>
      <IconButton
        _icon={{
          as: MaterialIcons,
          name: 'post-add',
          color: '#fff',
          size: 'lg',
        }}
        onPress={() =>
          navigation.navigate('AddArticle', {edit: false, article: null})
        }
      />
    </Box>
  );
};

const ArticleStack = createNativeStackNavigator();
const ArticleNavigator = () => {
  return (
    <ArticleStack.Navigator
      initialRouteName="NewsFeed"
      screenOptions={{
        headerStyle: {backgroundColor: '#0096C7'},
        headerShadowVisible: false,
        headerTintColor: '#fff',
      }}>
      <ArticleStack.Screen
        name="NewsFeed"
        component={NewsFeed}
        options={navigation => {
          return {
            headerLeft: () => HeaderLeft(navigation),
            title: 'News Feeds',
            headerTitleAlign: 'center',
          };
        }}
      />
      <ArticleStack.Screen
        name="Article"
        component={Article}
        options={{title: ''}}
      />
      <ArticleStack.Screen
        name="MyArticles"
        component={MyArticles}
        options={navigation => {
          return {
            title: 'My Articles',
            headerTitleAlign: 'center',
            headerRight: () => HeaderRight(navigation),
            headerLeft: () => HeaderLeft(navigation),
          };
        }}
      />
      <ArticleStack.Screen
        name="AddArticle"
        component={AddArticle}
        options={{title: 'Add Article', headerTitleAlign: 'center'}}
      />
    </ArticleStack.Navigator>
  );
};

export default ArticleNavigator;
