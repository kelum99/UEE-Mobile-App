import React, {useEffect, useCallback, useState} from 'react';
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
  useToast,
  Spinner,
} from 'native-base';
import useRequest from '../../services/RequestContext';
import moment from 'moment';

const Posts = ({navigation}) => {
  const [posts, setPosts] = useState();
  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);
  const {request} = useRequest();
  const toast = useToast();

  const getPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await request.get('Articles');
      if (res.status === 200) {
        setPosts(res.data.data);
      }
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    getPosts().catch(console.error);
  }, [getPosts]);

  return (
    <MainLayout>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Center>
          <Heading>Accept Posts</Heading>
        </Center>
        {loading ? (
          <Box flex={1} justifyContent="center" alignItems="center">
            <Spinner size={'lg'} color="#fff" />
          </Box>
        ) : (
          <>
            {posts &&
              posts.map(post => (
                <Box key={post._id}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('ViewPost', {selectPost: post})
                    }>
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
                              uri: `${post.img}`,
                            }}
                            alt="image"
                          />
                        </AspectRatio>
                      </Box>
                      <Stack p={4} space={3}>
                        <Box>
                          <Text fontWeight="600" fontStyle="bold" fontSize={15}>
                            {post.title}
                          </Text>
                        </Box>
                        <HStack justifyContent="space-between">
                          <Text fontWeight="400">
                            {' '}
                            {moment(post.createdDate).format('YYYY-MM-DD')}
                          </Text>
                          <Text fontWeight="400" color="#c21313">
                            {post.status}
                          </Text>
                        </HStack>
                      </Stack>
                    </Box>
                  </Pressable>
                </Box>
              ))}
          </>
        )}
      </ScrollView>
    </MainLayout>
  );
};

export default Posts;
