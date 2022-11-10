import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {AspectRatio, Box, Image, Button, Pressable} from 'native-base';

const Resources = ({navigation}) => {
  return (
    <MainLayout>
      <ScrollView style={{flex: 1}}>
        <Pressable onPress={() => navigation.navigate('ResourceCat')}>
          <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri:
                      'https://www.innovationnewsnetwork.com/wp-content/uploads/2022/06/supporting-marine-conservation-696x392.jpg',
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
            <Box>
              <Button
                style={styles.speciesBtn}
                onPress={() => navigation.navigate('ResourceCat')}
              >
                Marine Conservation
              </Button>
            </Box>
          </Box>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('ResourceCat')}>
          <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri:
                      'https://media.greenmatters.com/brand-img/vULjW84A-/2160x1130/ocean-pollution-1598986193310.jpg',
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
            <Box>
              <Button
                style={styles.speciesBtn}
                onPress={() => navigation.navigate('ResourceCat')}
              >
                Ocean Pollution
              </Button>
            </Box>
          </Box>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('ResourceCat')}>
          <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
            <Box>
              <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                  source={{
                    uri:
                      'https://media.istockphoto.com/id/539675480/photo/tropical-fish-and-turtle.jpg?s=1024x1024&w=is&k=20&c=Wyj9SYlpcNGYJ67Xym4S8qV0ivcsSZn0OtS5yMOUGyk=',
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
            <Box>
              <Button
                style={styles.speciesBtn}
                onPress={() => navigation.navigate('ResourceCat')}
              >
                Marine Biodiversity
              </Button>
            </Box>
          </Box>
        </Pressable>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  speciesBtn: {
    backgroundColor: '#091540',
    padding: 5,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
export default Resources;
