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
  IconButton,
  Text,
  Stack,
  Spinner,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import useRequest from '../../services/RequestContext';

const ResourceCat = ({route, navigation}) => {
  const [records, setRecords] = useState();
  const [loading, setLoading] = useState(false);
  const {request} = useRequest();
  const {add} = route.params;

  const getAllResources = useCallback(async () => {
    setLoading(true);
    const res = await request.get('Resources');
    if (res.status === 200) {
      setRecords(res.data);
      setLoading(false);
    }
  }, [request]);
  useEffect(() => {
    getAllResources().catch(console.error);
  }, [getAllResources, add]);
  return (
    <MainLayout>
      {loading ? (
        <Box flex={1} justifyContent="center" alignItems="center">
          <Spinner size={'lg'} color="#fff" />
        </Box>
      ) : (
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
                    navigation.navigate('AddResources', {
                      record: null,
                      edit: false,
                    })
                  }
                  _icon={{
                    as: AntDesign,
                    name: 'plussquare',
                    color: '#091540',
                    size: 'lg',
                  }}
                />

                <IconButton
                  onPress={() =>
                    navigation.navigate('Records', {updated: false})
                  }
                  _icon={{
                    as: MaterialIcons,
                    name: 'folder',
                    color: '#091540',
                    size: 'lg',
                  }}
                />
              </HStack>
            </Pressable>
          </Box>
          {records &&
            records.map(item => (
              <Pressable key={item._id}>
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
                    </Box>
                    <HStack
                      my={2}
                      justifyContent="space-between"
                      alignItems="center">
                      <Box>
                        <Text fontWeight="400">{item.addedBy}</Text>
                        <Text fontWeight="400">
                          {moment(item.date).format('YYYY-MM-DD')}
                        </Text>
                      </Box>
                      <Button
                        style={styles.readMoreBtn}
                        key={item._id}
                        onPress={() =>
                          navigation.navigate('ReadRecord', {record: item})
                        }
                        _text={{fontWeight: 'bold'}}
                        size={'sm'}>
                        Read More
                      </Button>
                    </HStack>
                  </Stack>
                </Box>
              </Pressable>
            ))}
        </ScrollView>
      )}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  readMoreBtn: {
    backgroundColor: '#091540',
  },
});

export default ResourceCat;
