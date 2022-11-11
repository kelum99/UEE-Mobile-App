import React from 'react';
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
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Records = ({route, navigation}) => {
  const {isOpen, onOpen, onClose} = useDisclose();

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
                onPress={() => navigation.navigate('AddResources')}
                _icon={{
                  as: AntDesign,
                  name: 'plussquare',
                  color: '#091540',
                  size: 'lg',
                }}
              />
            </HStack>
          </Pressable>
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
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Monachus_schauinslandi.jpg/800px-Monachus_schauinslandi.jpg',
                  }}
                  alt="image"
                />
              </AspectRatio>
            </Box>
            <Stack p={4} space={3}>
              <Box>
                <Stack space={2}>
                  <Heading size="lg" ml="-1">
                    Hawaiian Monk Seal
                  </Heading>
                </Stack>
                <Text fontWeight="400" fontStyle="italic">
                  Monachus schauinslandi
                </Text>
              </Box>
              <HStack my={2} justifyContent="space-between" alignItems="center">
                <Box>
                  <Text fontWeight="400">11-09-2022</Text>
                </Box>
                <HStack justifyContent="space-between">
                  <IconButton
                    onPress={() => navigation.navigate('AddResources')}
                    _icon={{
                      as: MaterialIcons,
                      name: 'remove-red-eye',
                      color: '#091540',
                      size: 'lg',
                    }}
                  />
                  <IconButton
                    onPress={onOpen}
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
                    <Button borderRadius="full" style={styles.deleteBtn}>
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

export default Records;
