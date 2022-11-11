import React, {useState, useEffect} from 'react';
import MainLayout from '../../components/MainLayout';
import {
  AspectRatio,
  Box,
  Heading,
  Image,
  Text,
  VStack,
  ScrollView,
  Center,
  HStack,
} from 'native-base';
import axios from 'axios';
import moment from 'moment';

const Read = ({route}) => {
  const [resources, setResources] = useState({});
  const {resourcesData} = route.params;
  const getResources = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/Resources/${resourcesData._id}`,
      );
      if (res.status === 200) {
        setResources(res.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getResources();
  });

  return (
    <MainLayout>
      <ScrollView>
        {resources && (
          <>
            <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Monachus_schauinslandi.jpg/800px-Monachus_schauinslandi.jpg',
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Box>
                <VStack my={4}>
                  <Center>
                    <Heading>{resources.name}</Heading>
                    <Text fontStyle="italic">{resources.authorName}</Text>
                  </Center>
                </VStack>
                <VStack my={3} mx={4}>
                  <Text>{resources.description} </Text>
                </VStack>
                <VStack mx={4} my={4}>
                  <HStack justifyContent="space-between">
                    <Text fontWeight="600">{resources.addedBy}</Text>
                  </HStack>
                </VStack>
              </Box>
            </Box>
          </>
        )}
      </ScrollView>
    </MainLayout>
  );
};
export default Read;
