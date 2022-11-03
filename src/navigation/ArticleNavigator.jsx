import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewsFeed from '../screens/Article/NewsFeed';

const ArticleStack = createNativeStackNavigator();
const ArticleNavigator = () => {
  return (
    <ArticleStack.Navigator initialRouteName="NewsFeed">
      <ArticleStack.Screen
        name="NewsFeed"
        component={NewsFeed}
        options={{headerShown: false}}
      />
    </ArticleStack.Navigator>
  );
};

export default ArticleNavigator;
