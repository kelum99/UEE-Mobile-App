import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from 'native-base';
import useRequest from '../../services/RequestContext';
import moment from 'moment';

const NewsFeed = ({navigation}) => {
  const [articles, setArticles] = useState([]);
  const {request} = useRequest();

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await request.get('Articles');
        setArticles(res.data.data);
        console.log('res data', res.data);
      } catch (e) {
        console.log('error', e);
      }
    };
    getArticles().catch(console.error);
  }, [request]);

  return (
    <MainLayout>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {articles.length > 0 && (
          <>
            {articles.map(item => (
              <Box
                key={item._id}
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
                        uri: `${item.img}`,
                      }}
                      alt="image"
                    />
                  </AspectRatio>
                </Box>
                <Stack p={4} space={3}>
                  <Stack space={2}>
                    <Heading size="lg" ml="-1">
                      {item.title}
                    </Heading>
                  </Stack>
                  <Text fontWeight="400">{item.description}</Text>
                  <HStack
                    my={2}
                    justifyContent="space-between"
                    alignItems="center">
                    <VStack>
                      <Text color="coolGray.600" fontWeight="600">
                        {item.authors.join(', ')}
                      </Text>
                      <Text color="coolGray.600" fontWeight="400">
                        {moment(item.createdDate).format('YYYY-MM-DD')}
                      </Text>
                    </VStack>
                    <Button
                      onPress={() =>
                        navigation.navigate('Article', {
                          params: {article: item},
                        })
                      }
                      _text={{fontWeight: 'bold'}}
                      size={'sm'}>
                      Read More
                    </Button>
                  </HStack>
                </Stack>
              </Box>
            ))}
          </>
        )}
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
