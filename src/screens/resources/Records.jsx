import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {
  AspectRatio,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
  IconButton,
  useDisclose,
  Actionsheet,
  Icon,
  Divider,
  useToast,
} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useRequest from '../../services/RequestContext';
import moment from 'moment';

const Records = ({route, navigation}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [data, setData] = useState();
  const [selected, setSelected] = useState();
  const {request} = useRequest();
  const toast = useToast();

  const getAllResources = useCallback(async () => {
    const res = await request.get('Resources');
    if (res.status === 200) {
      setData(res.data);
    }
  }, [request]);

  const onDelete = async () => {
    const res = await request.delete(`Resources/${selected._id}`);
    if (res) {
      setSelected(undefined);
      getAllResources().catch(console.error);
      onClose();
      toast.show({
        render: () => {
          return (
            <Box
              _text={{color: '#fff'}}
              bg="red.500"
              px="2"
              py="1"
              rounded="sm"
              mb={5}>
              Record Removed!
            </Box>
          );
        },
        placement: 'top',
      });
    }
  };

  useEffect(() => {
    getAllResources().catch(console.error);
  }, [getAllResources]);
  return (
    <MainLayout>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box>
          {data &&
            data.map(item => (
              <Box
                key={item._id}
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
                        uri: item.img,
                      }}
                      alt="image"
                    />
                  </AspectRatio>
                </Box>
                <Stack p={4} space={3}>
                  <Box>
                    <Stack space={2}>
                      <Heading size="lg" ml="-1">
                        {item.title}
                      </Heading>
                    </Stack>
                    <Text fontWeight="400" fontStyle="italic">
                      {item.description}
                    </Text>
                  </Box>
                  <HStack
                    my={2}
                    justifyContent="space-between"
                    alignItems="center">
                    <Box>
                      <Text fontWeight="400">
                        {moment(item.date).format('YYYY-MM-DD')}
                      </Text>
                    </Box>
                    <HStack justifyContent="space-between">
                      <IconButton
                        onPress={() =>
                          navigation.navigate('ReadRecord', {record: item})
                        }
                        _icon={{
                          as: MaterialIcons,
                          name: 'remove-red-eye',
                          color: '#091540',
                          size: 'lg',
                        }}
                      />
                      <IconButton
                        onPress={() => {
                          setSelected(item);
                          onOpen();
                        }}
                        _icon={{
                          as: MaterialIcons,
                          name: 'delete',
                          color: '#FF0000',
                          size: 'lg',
                        }}
                      />
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
            ))}
          <Actionsheet
            isOpen={isOpen}
            onClose={() => {
              setSelected(undefined);
              onClose();
            }}>
            <Actionsheet.Content>
              <Box w="100%" h={60} px={4} justifyContent="center">
                <Text fontSize="16" fontWeight="bold" color="#091540">
                  DELETE RECORD
                </Text>
              </Box>
              <Divider />
              <Box style={styles.iconContainer}>
                <Icon
                  as={MaterialIcons}
                  name={'delete'}
                  size="10"
                  color="#091540"
                />
              </Box>
              <Text fontSize="14" color="#091540">
                Are You Sure You Want to Delete this Record?
              </Text>
              <HStack>
                <Box>
                  <Actionsheet.Item>
                    <Button borderRadius="full" style={styles.deleteBtn}>
                      <Text color="#fff" fontWeight="bold" onPress={onDelete}>
                        Delete
                      </Text>
                    </Button>
                  </Actionsheet.Item>
                </Box>
                <Box>
                  <Actionsheet.Item>
                    <Button
                      onPress={() => {
                        onClose();
                        setSelected(undefined);
                      }}
                      borderRadius="full"
                      variant="outline"
                      style={styles.cancelBtn}>
                      <Text color="#091540" fontWeight="bold">
                        Cancel
                      </Text>
                    </Button>
                  </Actionsheet.Item>
                </Box>
              </HStack>
            </Actionsheet.Content>
          </Actionsheet>
        </Box>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 1000,
    backgroundColor: '#aed2eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: '#091540',
    width: 100,
  },
  cancelBtn: {
    width: 100,
    borderColor: '#091540',
  },
});

export default Records;
