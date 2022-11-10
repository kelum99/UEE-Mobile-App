import React, {useCallback, useEffect, useState} from 'react';
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
  useToast,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useRequest from '../../services/RequestContext';
import {Alert} from 'react-native';

const MyArticles = ({navigation}) => {
  const [articles, setArticles] = useState();
  const [selected, setSelected] = useState();
  const {isOpen, onOpen, onClose} = useDisclose();
  const {request} = useRequest();
  const toast = useToast();

  const getArticles = useCallback(async () => {
    const res = await request.get('Articles');
    if (res.status === 200) {
      setArticles(res.data.data);
      console.log('res', res.data.data);
    }
  }, [request]);

  useEffect(() => {
    getArticles().catch(console.error);
  }, [getArticles]);

  const onDelete = async () => {
    const res = await request.delete(`Articles/${selected?._id}`);
    if (res.status === 200) {
      toast.show({
        render: () => {
          return (
            <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
              Article Deleted!
            </Box>
          );
        },
        placement: 'top',
      });
      onClose();
      setSelected(undefined);
      getArticles().catch(console.error);
    }
  };

  const deletePopup = () => {
    Alert.alert('Delete Article', 'Are you sure delete this article', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Delete', onPress: onDelete, style: 'default'},
    ]);
  };

  return (
    <MainLayout>
      {articles &&
        articles.map(article => (
          <Box key={article._id} backgroundColor="#fff" p={2} my={1}>
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
                    onPress={() => {
                      setSelected(article);
                      onOpen();
                    }}
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
      <Actionsheet
        isOpen={isOpen}
        onClose={() => {
          setSelected(undefined);
          onClose();
        }}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={() => navigation.navigate('Article', {article: selected})}>
            Preview
          </Actionsheet.Item>
          {selected?.status === 'Draft' ? (
            <Actionsheet.Item>Request Approval</Actionsheet.Item>
          ) : selected?.status === 'Declined' ? (
            <Actionsheet.Item>Request Again</Actionsheet.Item>
          ) : selected?.status === 'Approved' ? (
            <Actionsheet.Item>Publish</Actionsheet.Item>
          ) : selected?.status === 'Published' ? (
            <Actionsheet.Item>Un-publish</Actionsheet.Item>
          ) : (
            <></>
          )}
          <Actionsheet.Item>Update</Actionsheet.Item>
          <Actionsheet.Item onPress={deletePopup}>Delete</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </MainLayout>
  );
};
export default MyArticles;
