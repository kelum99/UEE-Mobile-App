import React, {useEffect, useState} from 'react';
import MainLayout from '../../components/MainLayout';
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FormControl,
  HStack,
  Image,
  Input,
  Progress,
  Text,
  TextArea,
  useToast,
  VStack,
} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import useRequest from '../../services/RequestContext';

const AddResources = ({navigation, route}) => {
  const {edit, record} = route.params;
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: '',
    img: '',
    description: '',
    addedBy: '',
  });

  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const {request} = useRequest();
  const toast = useToast();

  useEffect(() => {
    if (edit && record) {
      setUploaded(true);
      setData({
        title: record.title,
        description: record.description,
        addedBy: record.addedBy,
        img: record.img,
      });
    }
  }, [record, edit]);

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
      imgRef.getDownloadURL().then(url => setData({...data, img: url}));
    }
    setUploading(false);
    setUploaded(true);
  };

  const onSubmit = async () => {
    try {
      const res = await request.post('Resources', data);
      if (res.status === 201) {
        toast.show({
          render: () => {
            return (
              <Box
                _text={{color: '#fff'}}
                bg="emerald.500"
                px="2"
                py="1"
                rounded="sm"
                mb={5}>
                Resources Added!
              </Box>
            );
          },
          placement: 'top',
        });
        navigation.navigate('ResourceCat', {add: true});
      } else {
        toast.show({
          render: () => {
            return (
              <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                Article Submission Failed!
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
      const res = await request.put(`Resources/${record._id}`, data);
      if (res.status === 200) {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Record Updated!
              </Box>
            );
          },
          placement: 'top',
        });
        navigation.navigate('Records', {updated: true});
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <MainLayout>
      <ScrollView style={{flex: 1}}>
        <Box alignItems="center">
          <Center>
            <FormControl isRequired my={2}>
              <FormControl.Label
                _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                Title
              </FormControl.Label>
              <Input
                defaultValue={edit ? record.title : ''}
                onChangeText={text => setData({...data, title: text})}
                fontSize={14}
                width="350"
                variant="outline"
                placeholder="Enter Title"
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
                defaultValue={edit ? record.description : ''}
                onChangeText={text => setData({...data, description: text})}
                fontSize={14}
                h={40}
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
                defaultValue={edit ? record.title : ''}
                onChangeText={text => setData({...data, addedBy: text})}
                fontSize={14}
                width="350"
                placeholder="Enter Author Name"
                backgroundColor="#fff"
              />
            </FormControl>
          </Center>
          {uploading && (
            <Progress
              mt={2}
              width={300}
              colorScheme="emerald"
              value={transferred}
            />
          )}
          {uploaded && (
            <Text fontWeight="600" mt={2} color="#fff">
              Upload Success
            </Text>
          )}
          <HStack my={3} mx={3} justifyContent="space-between">
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
                      ? record.img
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
                  {!uploading && <Button onPress={uploadImage}>Upload</Button>}
                </>
              )}
            </VStack>
          </HStack>

          <HStack space={10} justifyContent="center">
            <Button
              onPress={edit ? onUpdate : onSubmit}
              mt="5"
              backgroundColor="#091540"
              _text={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
              {edit ? 'Update' : 'Submit'}
            </Button>
            <Button
              variant="outline"
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

const Styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: '#091540',
    width: 100,
  },
  cancelBtn: {
    width: 100,
    borderColor: '#091540',
  },
  labelText: {
    fontSize: 16,
    color: '#fff',
  },
  input: {
    fontSize: 14,
    backgroundColor: '#fff',
    paddingLeft: 10,
  },
});
export default AddResources;
