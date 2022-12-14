import React, {useEffect, useState} from 'react';
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
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import useRequest from '../../services/RequestContext';

const EndangeredPlants = ({navigation}) => {
  const [species, setSpecies] = useState([]);
  const {request} = useRequest();
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

              <IconButton
                onPress={() => navigation.navigate('MyRecords')}
                _icon={{
                  as: MaterialIcons,
                  name: 'folder',
                  color: '#091540',
                  size: 'lg',
                }}
              />
            </HStack>
          </Pressable>
          {species && (
            <>
              {species
                .filter(val => val.type === 'Plant')
                .map(speciesData => (
                  <Pressable key={speciesData._id}>
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
                            <Text fontWeight="400">{speciesData.addedBy}</Text>
                            <Text fontWeight="400">
                              {moment(speciesData.addedDate).format(
                                'YYYY-MM-DD',
                              )}
                            </Text>
                          </Box>
                          <Button
                            style={styles.readMoreBtn}
                            key={speciesData._id}
                            onPress={() =>
                              navigation.navigate({
                                name: 'ReadMore',
                                params: {speciesData},
                              })
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
            </>
          )}
        </Box>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  readMoreBtn: {
    backgroundColor: '#091540',
  },
  allBtn: {
    cursor: 'pointer',
  },
});

export default EndangeredPlants;
