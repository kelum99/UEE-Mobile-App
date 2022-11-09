import React from 'react';
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

const MyArticles = ({navigation}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <MainLayout>
      <Box backgroundColor="#fff" p={2}>
        <Pressable onPress={() => navigation.navigate('Article')}>
          <Stack space={3}>
            <HStack justifyContent="space-between" alignItmes="center">
              <Badge colorScheme="success" _text={{color: 'green.500'}}>
                Success
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
                Title ASAsaS sadsd asdsada sada d3wad fggfd adasd
              </Text>
            </Box>
          </Stack>
        </Pressable>
      </Box>
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
