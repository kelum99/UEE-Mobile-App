import React from 'react';
import MainLayout from '../../components/MainLayout';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Heading,
  Box,
  Image,
  AspectRatio,
  HStack,
  Center,
  Pressable,
  Button,
} from 'native-base';

const AdminDashboard = ({navigation}) => {
  return (
    <MainLayout>
      <ScrollView>
        <Center>
          <HStack>
            <Box my={-2}>
              <Image
                style={styles.logo}
                source={require('../../assets/images/logo.png')}
                alt="image"
              />
            </Box>
            <Box>
              <Heading style={styles.title}>Oceanic</Heading>
            </Box>
          </HStack>
          <Pressable onPress={() => navigation.navigate('CreateAdmin')}>
            <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: 'https://blue-search.org/images/BG.jpg',
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Box>
                <Button
                  _text={{fontWeight: 'bold', fontSize: '18'}}
                  style={styles.adminBtn}
                  onPress={() => navigation.navigate('CreateAdmin')}>
                  Create Admin
                </Button>
              </Box>
            </Box>
          </Pressable>
          <Pressable
            onPress={() =>
              navigation.navigate('ViewAdmin', {edit: false, deleteX: false})
            }>
            <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: 'https://img2.storyblok.com/0x1000/filters:format(webp)/f/53624/1600x900/ebcd4ed668/kun-5c3a820db838345283.jpg',
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Box>
                <Button
                  _text={{fontWeight: 'bold', fontSize: '18'}}
                  style={styles.adminBtn}
                  onPress={() =>
                    navigation.navigate('ViewAdmin', {
                      edit: false,
                      deleteX: false,
                    })
                  }>
                  View Admin
                </Button>
              </Box>
            </Box>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Posts')}>
            <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: 'https://www.villashmparaisodelmar.com/wp-content/uploads/1735/1694/nggallery/situacion/00-SITUACION_CABECERA.jpg',
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Box>
                <Button
                  _text={{fontWeight: 'bold', fontSize: '18'}}
                  style={styles.adminBtn}
                  onPress={() => navigation.navigate('Posts')}>
                  Accept Post
                </Button>
              </Box>
            </Box>
          </Pressable>
        </Center>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    marginTop: 35,
  },
  adminBtn: {
    backgroundColor: '#091540',
    padding: 5,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

export default AdminDashboard;
