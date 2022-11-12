import React, {useCallback, useEffect, useState} from 'react';
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
  useToast,
} from 'native-base';
import {StyleSheet} from 'react-native';
import useRequest from '../../services/RequestContext';

const ViewPost = ({route}) => {
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(false);
  const {request} = useRequest();
  const toast = useToast();

  const getArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await request.get('Articles');
      if (res.status === 200) {
        setArticles(res.data.data);
      }
    } catch (e) {
      console.log('error', e);
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    getArticles().catch(console.error);
  }, [getArticles]);

  return (
    <MainLayout>
      <ScrollView>
        <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
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
          <Box>
            <VStack my={4}>
              <Center>
                <Text fontStyle="bold" fontWeight={800} fontSize={15}>
                  Inflation Reduction Act Passed – NOAA Weighs in on Ocean
                  Ramifications
                </Text>
              </Center>
            </VStack>
            <VStack mx={4}>
              <Text>
                Over the next five years, the $3.3 billion for NOAA in the
                Inflation Reduction Act will support Americans to prepare,
                adapt, and build resilience to weather and climate events;
                improve supercomputing capacity and research on weather, oceans
                and climate; strengthen NOAA’s hurricane hunter fleet; and
                replace aging NOAA facilities. This, in combination with funds
                NOAA received from Congress through the Bipartisan
                Infrastructure Law, will further strengthen NOAA’s efforts to
                build a Climate-Ready Nation.{' '}
              </Text>
            </VStack>
            <VStack mx={4} my={4}>
              <HStack justifyContent="space-between">
                <Text fontWeight="600">15-10-2022</Text>
                <Text fontWeight="600">Sakuni Perera</Text>
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
