import React from 'react';
import MainLayout from '../../components/MainLayout';
import {AspectRatio, Box, Heading, Image, Text, VStack} from 'native-base';
import {ScrollView} from 'react-native';

const Article = ({route}) => {
  return (
    <MainLayout>
      <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff" flex={1}>
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
        <Box p={4} flex={1}>
          <ScrollView style={{flex: 1}}>
            <Heading>Title</Heading>
            <VStack my={2}>
              <Text>Author</Text>
              <Text>Date</Text>
            </VStack>
            <Text>Description</Text>
          </ScrollView>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Article;
