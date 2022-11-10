import React, {useEffect, useState} from 'react';
import MainLayout from '../../components/MainLayout';
import {
  Actionsheet,
  Badge,
  Box,
  HStack,
  IconButton,
  Pressable,
  Stack,
  Text,
  useDisclose,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useRequest from '../../services/RequestContext';

const MyArticles = ({navigation}) => {
  const [articles, setArticles] = useState();
  const {isOpen, onOpen, onClose} = useDisclose();
  const {request} = useRequest();

  const getArticles = async () => {
    const res = await request.get('Articles');
    if (res.status === 200) {
      setArticles(res.data.data);
    }
  };
  useEffect(() => {
    getArticles().catch(console.error);
  });

  return (
    <MainLayout>
      {articles &&
        articles.map(article => (
          <Box key={article._id} backgroundColor="#fff" p={2}>
            <Pressable
              onPress={() =>
                navigation.navigate('Article', {article: article})
              }>
              <Stack space={3}>
                <HStack justifyContent="space-between" alignItmes="center">
                  <Badge colorScheme="success" _text={{color: 'green.500'}}>
                    {article.status}
                  </Badge>
                  <IconButton
                    position="absolute"
                    right={-10}
                    top={-8}
                    _icon={{
                      as: MaterialCommunityIcons,
                      name: 'dots-vertical',
                      color: '#000',
                      size: 'lg',
                    }}
                    onPress={onOpen}
                  />
                </HStack>
                <Box>
                  <Text fontSize={18} fontWeight="bold">
                    {article.title}
                  </Text>
                </Box>
              </Stack>
            </Pressable>
          </Box>
        ))}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>Preview</Actionsheet.Item>
          <Actionsheet.Item>Request Approval</Actionsheet.Item>
          <Actionsheet.Item>Update</Actionsheet.Item>
          <Actionsheet.Item>Delete</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </MainLayout>
  );
};
export default MyArticles;
