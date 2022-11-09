import React from 'react';
import {ScrollView} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {
  AspectRatio,
  Box,
  Heading,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
  Center,
} from 'native-base';

const Posts = ({navigation}) => {
  return (
    <MainLayout>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box>
          <Center>
            <Heading>Accept Posts</Heading>
          </Center>
          <Pressable onPress={() => navigation.navigate('ViewPost')}>
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
                      uri: 'https://hercanberra.com.au/wp-content/uploads/2020/12/beach-summer-walk.jpg',
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Stack p={4} space={3}>
                <Box>
                  <Text fontWeight="600" fontStyle="bold" fontSize={15}>
                    Scientists Identify Potential Bioindicators for Monitoring
                    Plastic Pollution
                  </Text>
                </Box>
                <HStack justifyContent="space-between">
                  <Text fontWeight="400">15-10-2022</Text>
                  <Text fontWeight="400" color="#c21313">
                    Pending
                  </Text>
                </HStack>
              </Stack>
            </Box>
          </Pressable>
        </Box>
      </ScrollView>
    </MainLayout>
  );
};

export default Posts;
