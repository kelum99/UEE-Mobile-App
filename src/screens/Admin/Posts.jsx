import React, { useState } from "react";
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
  Badge,
  IconButton, useDisclose,
} from "native-base";
import myArticles from '../Article/MyArticles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import article from "../Article/Article";

const Posts = ({navigation}) => {
  const [selected, setSelected] = useState();
  const {isOpen, onOpen, onClose} = useDisclose();
  let articles;
  return (
    <MainLayout>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box>
          <Center>
            <Heading>Accept Posts</Heading>
          </Center>
          <Pressable onPress={() => navigation.navigate('ViewPost')}>
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
                      uri: 'https://hercanberra.com.au/wp-content/uploads/2020/12/beach-summer-walk.jpg',
                    }}
                    alt="image"
                  />
                </AspectRatio>
              </Box>
              <Stack p={4} space={3}>
                <Box>
                  <Text fontWeight="600" fontStyle="bold" fontSize={15}>
                    Scientists Identify Potential Bioindicators for Monitoring
                    Plastic Pollution
                  </Text>
                </Box>
                <HStack justifyContent="space-between">
                  <Text fontWeight="400">15-10-2022</Text>
                  <Text fontWeight="400" color="#c21313">
                    Pending
                  </Text>
                </HStack>
              </Stack>
            </Box>
          </Pressable>
        </Box>

        {articles.map(articles => (
          <Pressable
            key={article._id}
          onPress={() =>
            navigation.navigate({
              name: '',
              params: {},
            })
          }>

          </Pressable>
        ))}
        {/*{articles &&*/}
        {/*  articles.map(article => (*/}
        {/*    <Box*/}
        {/*      key={article._id}*/}
        {/*      backgroundColor="#fff"*/}
        {/*      p={3}*/}
        {/*      my={1}*/}
        {/*      mx={2}*/}
        {/*      rounded="lg">*/}
        {/*      <Pressable*/}
        {/*        onPress={() =>*/}
        {/*          navigation.navigate('Article', {article: article})*/}
        {/*        }>*/}
        {/*        <Stack space={3}>*/}
        {/*          <HStack justifyContent="space-between" alignItmes="center">*/}
        {/*            <Badge*/}
        {/*              variant={'solid'}*/}
        {/*              colorScheme={*/}
        {/*                article.status === 'Declined'*/}
        {/*                  ? 'error'*/}
        {/*                  : article.status === 'Pending'*/}
        {/*                  ? 'info'*/}
        {/*                  : article.status === 'Approved'*/}
        {/*                  ? 'teal'*/}
        {/*                  : 'Default'*/}
        {/*              }>*/}
        {/*              {article.status}*/}
        {/*            </Badge>*/}
        {/*            <IconButton*/}
        {/*              position="absolute"*/}
        {/*              right={-10}*/}
        {/*              top={-8}*/}
        {/*              _icon={{*/}
        {/*                as: MaterialCommunityIcons,*/}
        {/*                name: 'dots-vertical',*/}
        {/*                color: '#000',*/}
        {/*                size: 'lg',*/}
        {/*              }}*/}
        {/*              onPress={() => {*/}
        {/*                setSelected(article);*/}
        {/*                onOpen();*/}
        {/*              }}*/}
        {/*            />*/}
        {/*          </HStack>*/}
        {/*          <Box>*/}
        {/*            <Text fontSize={18} fontWeight="bold">*/}
        {/*              {article.title}*/}
        {/*            </Text>*/}
        {/*          </Box>*/}
        {/*        </Stack>*/}
        {/*      </Pressable>*/}
        {/*    </Box>*/}
        {/*  ))}*/}
      </ScrollView>
    </MainLayout>
  );
};

export default Posts;
