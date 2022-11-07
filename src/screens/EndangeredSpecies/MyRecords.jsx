import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
  IconButton,
  Tooltip
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Endangered = ({route,navigation}) => {
  return (
   <MainLayout>
         <ScrollView
           style={{flex: 1}}
           contentContainerStyle={{
             alignItems: 'center',
             justifyContent: 'center',
           }}>
    <Box>
        <Pressable>
            <HStack justifyContent="space-between">
                <IconButton
                    onPress={() => navigation.navigate('AddSpecies')}
                    _icon={{
                        as: AntDesign,
                        name: 'plussquare',
                        color: '#091540',
                        size: 'lg',
                    }}
                />
            </HStack>
        </Pressable>
        <Pressable>
            <Box
               m={4}
               rounded="lg"
               overflow="hidden"
               borderColor="coolGray.200"
               backgroundColor="#fff"
               borderWidth="1">

               <Box>
                 <AspectRatio w="100%" ratio={16 / 9}>
                   <Image
                     source={{
                       uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Monachus_schauinslandi.jpg/800px-Monachus_schauinslandi.jpg',
                     }}
                     alt="image"
                   />
                 </AspectRatio>
               </Box>
               <Stack p={4} space={3}>
                <Box>
                 <Stack space={2}>
                   <Heading size="lg" ml="-1">
                     Hawaiian Monk Seal
                   </Heading>
                 </Stack>
                 <Text fontWeight="400" fontStyle= 'italic'>
                   Monachus schauinslandi
                 </Text>
               </Box>
                 <HStack my={2} justifyContent="space-between" alignItems="center">
                   <Box>
                    <Text fontWeight="400">
                       11-09-2022
                    </Text>
                   </Box>
                   <HStack justifyContent="space-between">

                  <IconButton
                                onPress={() => navigation.navigate('AddSpecies')}
                                  _icon={{
                                    as: MaterialIcons,
                                    name: 'remove-red-eye',
                                    color: '#091540',
                                    size: 'lg',
                                  }}
                                />

                                <IconButton

                                                                onPress={() => navigation.navigate('AddSpecies')}
                                                                  _icon={{
                                                                    as: MaterialIcons,
                                                                    name: 'delete',
                                                                    color: '#FF0000',
                                                                    size: 'lg',
                                                                  }}
                                                                />
                                                                </HStack>
                 </HStack>
               </Stack>
             </Box>
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
  allBtn:{
  cursor:'pointer'
  }

});

export default Endangered;
