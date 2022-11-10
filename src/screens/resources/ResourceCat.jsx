import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Pressable,
  IconButton,
  Text,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ResourceCat = ({route, navigation}) => {
  return (
    <MainLayout>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box>
          <Pressable>
            <HStack justifyContent="space-between">
              <IconButton
                onPress={() => navigation.navigate('AddResources')}
                _icon={{
                  as: AntDesign,
                  name: 'plussquare',
                  color: '#091540',
                  size: 'lg',
                }}
              />

              <IconButton
                onPress={() => navigation.navigate('Records')}
                _icon={{
                  as: MaterialIcons,
                  name: 'folder',
                  color: '#091540',
                  size: 'lg',
                }}
              />
            </HStack>
          </Pressable>
        </Box>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  readMoreBtn: {
    backgroundColor: '#091540',
  },
});

export default ResourceCat;
