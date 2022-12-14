import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text as DescriptionText} from 'react-native';
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
            {articles
              .filter(val => val.status === 'Published')
              .map(item => (
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
                    <DescriptionText
                      style={{width: 320, fontWeight: '600', color: '#000'}}
                      numberOfLines={5}
                      ellipsizeMode={'tail'}>
                      {item.description}
                    </DescriptionText>
                    <HStack
                      my={2}
                      justifyContent="space-between"
                      alignItems="center">
                      <VStack>
                        <Text color="#122466" fontWeight="600">
                          {item.author}
                        </Text>
                        <Text color="#122466" fontWeight="400">
                          {moment(item.createdDate).format('YYYY-MM-DD')}
                        </Text>
                      </VStack>
                      <Button
                        backgroundColor="#091540"
                        onPress={() =>
                          navigation.navigate('Article', {
                            article: item,
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
