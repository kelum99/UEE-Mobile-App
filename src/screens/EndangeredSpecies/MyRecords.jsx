import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {
  AspectRatio,
  Box,
  Button,
  Center,
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useRequest from '../../services/RequestContext';

const Endangered = ({route, navigation}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const [species, setSpecies] = useState([]);
  const [selected, setSelected] = useState();
  const {request} = useRequest();
  const toast = useToast();
  const getAllSpecies = async () => {
    try {
      const res = await request.get('EndangeredSpecies');
      if (res.status === 200) {
        setSpecies(res.data);
        console.log('All Species', res.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getAllSpecies();
    console.log();
  }, []);

  const onDelete = async () => {
    const res = await request.delete(`EndangeredSpecies/${selected?._id}`);
    if (res.status === 200) {
      toast.show({
        render: () => {
          return (
            <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
              Record Deleted!
            </Box>
          );
        },
        placement: 'top',
      });
      onClose();
      setSelected(undefined);
      getAllSpecies().catch(console.error);
    }
  };

  return (
    <MainLayout>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box>
          <Pressable>
            <HStack justifyContent="space-between">
              <IconButton
                onPress={() =>
                  navigation.navigate('AddSpecies', {
                    edit: false,
                    selectSpecies: undefined,
                  })
                }
                _icon={{
                  as: AntDesign,
                  name: 'plussquare',
                  color: '#091540',
                  size: 'lg',
                }}
              />
            </HStack>
          </Pressable>
          {species && (
            <>
              {species.map(speciesData => (
                <Box
                  key={speciesData._id}
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
                          uri: `${speciesData.imageURL}`,
                        }}
                        alt="image"
                      />
                    </AspectRatio>
                  </Box>
                  <Stack p={4} space={3}>
                    <Box>
                      <Stack space={2}>
                        <Heading size="lg" ml="-1">
                          {speciesData.name}
                        </Heading>
                      </Stack>
                      <Text fontWeight="400" fontStyle="italic">
                        {speciesData.scientificName}
                      </Text>
                    </Box>
                    <HStack
                      my={2}
                      justifyContent="space-between"
                      alignItems="center">
                      <Box>
                        <Text fontWeight="400">11-09-2022</Text>
                      </Box>
                      <HStack justifyContent="space-between">
                        <IconButton
                          onPress={() => {
                            navigation.navigate('AddSpecies', {
                              edit: true,
                              selectSpecies: speciesData,
                            });
                          }}
                          _icon={{
                            as: MaterialIcons,
                            name: 'remove-red-eye',
                            color: '#091540',
                            size: 'lg',
                          }}
                        />
                        <IconButton
                          onPress={() => {
                            setSelected(speciesData);
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
            </>
          )}
          <Actionsheet isOpen={isOpen} onClose={onClose}>
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
                    <Button
                      onPress={onDelete}
                      borderRadius="full"
                      style={styles.deleteBtn}>
                      <Text color="#fff" fontWeight="bold">
                        Delete
                      </Text>
                    </Button>
                  </Actionsheet.Item>
                </Box>
                <Box>
                  <Actionsheet.Item>
                    <Button
                      onPress={onClose}
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

export default Endangered;
