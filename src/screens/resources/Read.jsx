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

const ReadRecord = ({route}) => {
  const {record} = route.params;

  return (
    <MainLayout>
      <ScrollView>
        {record && (
          <>
            <Box m={4} rounded="lg" overflow="hidden" backgroundColor="#fff">
              <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                  <Image
                    source={{
                      uri: record.img,
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Box>
                <VStack my={4}>
                  <Center>
                    <Heading>{record.title}</Heading>
                  </Center>
                </VStack>
                <VStack my={3} mx={4}>
                  <Text>{record.description} </Text>
                </VStack>
                <VStack mx={4} my={4}>
                  <HStack justifyContent="space-between">
                    <Text fontWeight="600">{record.addedBy}</Text>
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
export default ReadRecord;
