import React from 'react';
import { StyleSheet} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {AspectRatio, Box, Image, Button, Pressable} from 'native-base';

const EndangeredSpecies = ({navigation}) => {
  return (
    <MainLayout>
     <Pressable onPress={() => navigation.navigate('Endangered')}>
      <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/dolphin-flight-art-design-photographycom.jpg',
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Box>
        <Button style={styles.speciesBtn} onPress={() => navigation.navigate('Endangered')}>Animals</Button>
        </Box>
      </Box>
       </Pressable>
        <Pressable onPress={() => navigation.navigate('Endangered')}>
          <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: 'https://images.ctfassets.net/cnu0m8re1exe/7tzbt6i4ZTFIcn1vXxdpGI/17547ebbbb0d788ab43c4b96f87b2f53/ocean.jpg',
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Box>
              <Button style={styles.speciesBtn} onPress={() => navigation.navigate('Endangered')}>Plants</Button>
              </Box>
            </Box>
             </Pressable>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  speciesBtn: {
    backgroundColor: '#091540',
    padding: 5,
    borderBottomRightRadius:8,
    borderBottomLeftRadius:8,
    borderTopLeftRadius:0,
    borderTopRightRadius:0
  },
});

export default EndangeredSpecies;
