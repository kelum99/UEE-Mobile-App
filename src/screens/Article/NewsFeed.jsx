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

const NewsFeed = ({navigation}) => {
  return (
    <MainLayout>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable onPress={() => navigation.navigate('Article')}>
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
                    uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
            <Stack p={4} space={3}>
              <Stack space={2}>
                <Heading size="lg" ml="-1">
                  The Garden City
                </Heading>
              </Stack>
              <Text fontWeight="400">
                Bengaluru (also called Bangalore) is the center of India's
                high-tech industry. The city is also known for its parks and
                nightlife.
              </Text>
              <HStack my={2} justifyContent="space-between" alignItems="center">
                <Box>
                  <Text color="coolGray.600" fontWeight="400">
                    6 mins ago
                  </Text>
                </Box>
                <Button
                  onPress={() => navigation.navigate('Article')}
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
const Styles = StyleSheet.create({
  test: {
    backgroundColor: 'red',
    padding: 5,
  },
});
export default NewsFeed;
