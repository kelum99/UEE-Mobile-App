import React, {useEffect, useState} from 'react';
import MainLayout from '../../components/MainLayout';
import {
  AspectRatio,
  Box,
  Image,
  Text,
  VStack,
  ScrollView,
  Center,
  HStack,
  Button,
} from 'native-base';
import {StyleSheet} from 'react-native';
import useRequest from '../../services/RequestContext';
import moment from 'moment';

const ViewPost = ({route}) => {
  const [post, setPost] = useState({});
  const {request} = useRequest();
  const {selectPost} = route.params;
  const getPost = async () => {
    try {
      const res = await request.get(`Articles/${selectPost._id}`);
      if (res.status === 200) {
        setPost(res.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getPost();
  });

  return (
    <MainLayout>
      <ScrollView>
        <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: `${selectPost.img}`,
                }}
                alt="image"
              />
            </AspectRatio>
          </Box>
          <Box>
            <VStack my={4}>
              <Center>
                <Text fontStyle="bold" fontWeight={800} fontSize={15}>
                  {selectPost.title}
                </Text>
              </Center>
            </VStack>
            <VStack mx={4}>
              <Text>{selectPost.description}</Text>
            </VStack>
            <VStack mx={4} my={4}>
              <HStack justifyContent="space-between">
                <Text fontWeight="600">
                  {' '}
                  {moment(post.createdDate).format('YYYY-MM-DD')}
                </Text>
                <Text fontWeight="600">{selectPost.author}</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
        <HStack style={{justifyContent: 'center'}}>
          <Button
            style={styles.btn}
            mt="5"
            backgroundColor="#091540"
            _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
            Accept
          </Button>
          <Button
            style={styles.btn}
            mt="5"
            backgroundColor="#c21313"
            _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
            Decline
          </Button>
        </HStack>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 150,
    borderRadius: 50,
    margin: 15,
  },
});

export default ViewPost;
