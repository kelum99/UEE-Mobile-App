import React from 'react';
import MainLayout from '../../components/MainLayout';
import {AspectRatio, Box, Heading, Image, Text, VStack} from 'native-base';
import {ScrollView} from 'react-native';
import moment from 'moment';

const Article = ({route}) => {
  const {article} = route.params;
  return (
    <MainLayout>
      {article && (
        <Box
          m={4}
          rounded="lg"
          overflow="hidden"
          backgroundColor="#fff"
          flex={1}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: article.img,
                }}
                alt="image"
              />
            </AspectRatio>
          </Box>
          <Box p={4} flex={1}>
            <ScrollView style={{flex: 1}}>
              <Heading>{article.title}</Heading>
              <VStack my={2}>
                <Text color="#122466" style={{fontWeight: 'bold'}}>
                  {article.author}
                </Text>
                <Text>{moment(article.createdDate).format('YYYY-MM-DD')}</Text>
              </VStack>
              <Text>{article.description}</Text>
            </ScrollView>
          </Box>
        </Box>
      )}
    </MainLayout>
  );
};

export default Article;
