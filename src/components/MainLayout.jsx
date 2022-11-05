import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const MainLayout = props => {
  return <SafeAreaView style={Styles.container}>{props.children}</SafeAreaView>;
};
const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#0096C7',
    flex: 1,
  },
});
export default MainLayout;
