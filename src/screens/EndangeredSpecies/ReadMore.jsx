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

const Article = ({route}) => {
  const [species, setSpecies] = useState({});
  const {speciesData} = route.params;
  const getSpecies = async () => {
    try {
      const res = await axios.get(
        `http://10.0.2.2:5000/api/EndangeredSpecies/${speciesData._id}`,
      );
      if (res.status === 200) {
        setSpecies(res.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getSpecies();
  });
  return (
    <MainLayout>
      <ScrollView>
        {species && (
          <>
            <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Monachus_schauinslandi.jpg/800px-Monachus_schauinslandi.jpg',
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Box>
                <VStack my={4}>
                  <Center>
                    <Heading>{species.name}</Heading>
                    <Text fontStyle="italic">{species.scientificName}</Text>
                  </Center>
                </VStack>
                <VStack my={3} mx={4}>
                  <Text>{species.description} </Text>
                </VStack>
                <VStack mx={4} my={4}>
                  <HStack justifyContent="space-between">
                    <Text fontWeight="600">{species.addedBy}</Text>
                    <Text fontWeight="600">
                      {' '}
                      {moment(speciesData.addedDate).format('YYYY-MM-DD')}
                    </Text>
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

export default Article;
