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
} from 'native-base';

const Endangered = ({route}) => {
  return (
   <MainLayout>
         <ScrollView
           style={{flex: 1}}
           contentContainerStyle={{
             alignItems: 'center',
             justifyContent: 'center',
           }}>
           <Pressable >
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
                       Anne Perera
                    </Text>
                    <Text fontWeight="400">
                       11-09-2022
                    </Text>
                   </Box>
                   <Button style={styles.readMoreBtn}
                     _text={{fontWeight: 'bold'}}
                     size={'sm'}>
                     Read More
                   </Button>
                 </HStack>
               </Stack>
             </Box>
           </Pressable>
         </ScrollView>
       </MainLayout>
  );
};

const styles = StyleSheet.create({
  readMoreBtn: {
    backgroundColor: '#091540',
  },
});

export default Endangered;
