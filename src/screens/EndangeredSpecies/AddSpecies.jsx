import React, {useEffect, useState} from 'react';
import MainLayout from '../../components/MainLayout';
import {
  Box,
  FormControl,
  Input,
  Center,
  TextArea,
  Button,
  HStack,
  Progress,
  AspectRatio,
  Image,
  VStack,
  useToast,
} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';
import useRequest from '../../services/RequestContext';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const AddSpecies = ({route, navigation}) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    type: '',
    name: '',
    scientificName: '',
    imageURL: '',
    description: '',
    addedBy: '',
  });
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const {request} = useRequest();
  const toast = useToast();
  const {edit, selectSpecies} = route.params;

  const selectImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 1920,
      maxHeight: 1080,
      quality: 1,
    };
    await launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
      } else if (response.errorCode === 'camera_unavailable') {
        console.log('Camera not available on device');
      } else if (response.errorCode === 'permission') {
        console.log('Permission not satisfied');
      } else if (response.errorCode === 'others') {
        console.log(response.errorMessage);
      }
      if (response.assets) {
        console.log('rrr', response.assets);
        setUploaded(false);
        setImage(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    const filename = image.substring(image.lastIndexOf('/') + 1);
    setUploading(true);
    setTransferred(0);
    const task = storage().ref(filename).putFile(image);
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    const imgRef = await storage().ref('/' + filename);
    if (imgRef) {
      imgRef.getDownloadURL().then(url => setData({...data, imageURL: url}));
    }
    setUploading(false);
    setUploaded(true);
  };

  const onSubmit = async () => {
    try {
      const res = await request.post('EndangeredSpecies', data);
      if (res.status === 201) {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Endangered Species Submitted!
              </Box>
            );
          },
          placement: 'top',
        });
        navigation.navigate('MyRecords');
      } else {
        toast.show({
          render: () => {
            return (
              <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                Endangered Species Submission Failed!
              </Box>
            );
          },
          placement: 'top',
        });
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const onUpdate = async () => {
    try {
      const res = await request.put(
        `EndangeredSpecies/${selectSpecies._id}`,
        data,
      );
      if (res.status === 200) {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Species Record Updated!
              </Box>
            );
          },
          placement: 'top',
        });
        navigation.reset({index: 0, routes: [{name: 'MyRecords'}]});
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  useEffect(() => {
    if (edit && selectSpecies) {
      setUploaded(true);
      setData({
        type: selectSpecies.type,
        name: selectSpecies.name,
        scientificName: selectSpecies.scientificName,
        imageURL: selectSpecies.imageURL,
        description: selectSpecies.description,
        addedBy: selectSpecies.addedBy,
      });
      console.log('edit', edit);
    }
  }, [selectSpecies, edit]);

  return (
    <MainLayout>
      <ScrollView>
        <Box alignItems="center">
          <Center>
            {uploading && (
              <Progress
                mt={2}
                value={transferred}
                mx="3"
                bg="#fff"
                _filledTrack={{
                  bg: 'lime.500',
                }}
              />
            )}
            <HStack my={3} mr={3} justifyContent="space-between">
              {image ? (
                <AspectRatio w="68%" ratio={16 / 9}>
                  <Image alt="image" source={{uri: image}} />
                </AspectRatio>
              ) : (
                <AspectRatio w="68%" ratio={16 / 9}>
                  <Image
                    alt="image"
                    source={{
                      uri: edit
                        ? selectSpecies.imageURL
                        : 'https://www.libreriaalberti.com/static/img/no-preview.jpg',
                    }}
                  />
                </AspectRatio>
              )}

              <VStack mx={1}>
                <Button my={3} onPress={selectImage}>
                  {uploaded ? 'Change Image' : 'Browse'}
                </Button>
                {!uploaded && (
                  <>
                    {!uploading && (
                      <Button onPress={uploadImage}>Upload</Button>
                    )}
                  </>
                )}
              </VStack>
            </HStack>
            <FormControl isRequired my={2}>
              <FormControl.Label
                _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                Type
              </FormControl.Label>
              <Input
                defaultValue={edit ? selectSpecies.type : ''}
                onChangeText={text => setData({...data, type: text})}
                fontSize={14}
                width="350"
                variant="outline"
                placeholder="Enter Type(Animal/Plant)"
                backgroundColor="#fff"
              />
            </FormControl>
            <FormControl isRequired my={2}>
              <FormControl.Label
                _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                Name
              </FormControl.Label>
              <Input
                defaultValue={edit ? selectSpecies.name : ''}
                onChangeText={text => setData({...data, name: text})}
                fontSize={14}
                width="350"
                variant="outline"
                placeholder="Enter Name"
                backgroundColor="#fff"
              />
            </FormControl>
          </Center>
          <Center>
            <FormControl isRequired my={2}>
              <FormControl.Label
                _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                Scientific Name
              </FormControl.Label>
              <Input
                defaultValue={edit ? selectSpecies.scientificName : ''}
                onChangeText={text => setData({...data, scientificName: text})}
                fontSize={14}
                width="350"
                variant="outline"
                placeholder="Enter Scientific Name"
                backgroundColor="#fff"
              />
            </FormControl>
          </Center>
          <Center>
            <FormControl isRequired my={2}>
              <FormControl.Label
                _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                Description
              </FormControl.Label>
              <TextArea
                defaultValue={edit ? selectSpecies.description : ''}
                onChangeText={text => setData({...data, description: text})}
                fontSize={14}
                h={20}
                placeholder="Enter Description"
                w="350"
                backgroundColor="#fff"
              />
            </FormControl>
          </Center>
          <Center>
            <FormControl isRequired my={2}>
              <FormControl.Label
                _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                Added By
              </FormControl.Label>
              <Input
                defaultValue={edit ? selectSpecies.addedBy : ''}
                onChangeText={text => setData({...data, addedBy: text})}
                fontSize={14}
                width="350"
                placeholder="Enter Author Name"
                backgroundColor="#fff"
              />
            </FormControl>
          </Center>
          <HStack space={10} justifyContent="center" style={styles.btnGrp}>
            <Button
              onPress={edit ? onUpdate : onSubmit}
              style={styles.submitBtn}
              mt="5"
              backgroundColor="#091540"
              borderRadius="full"
              _text={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
              {edit ? 'Update' : 'Submit'}
            </Button>
            <Button
              onPress={() => navigation.navigate('MyRecords')}
              style={styles.cancelBtn}
              variant="outline"
              borderRadius="full"
              mt="5"
              backgroundColor="transparent"
              _text={{fontWeight: 'bold', fontSize: 16, color: '#091540'}}
              borderColor="#091540">
              Cancel
            </Button>
          </HStack>
        </Box>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: '#091540',
    width: 100,
  },
  cancelBtn: {
    width: 100,
    borderColor: '#091540',
  },
  btnGrp: {
    marginBottom: 20,
  },
});

export default AddSpecies;
