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
  Stack,
  Text,
  TextArea,
  useToast,
  VStack,
} from 'native-base';
import {StyleSheet, ScrollView} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import useRequest from '../../services/RequestContext';

const AddArticle = ({navigation, route}) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: '',
    img: '',
    description: '',
    author: '',
  });
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const {request} = useRequest();
  const {edit, article} = route.params;
  const toast = useToast();

  useEffect(() => {
    if (edit && article) {
      setUploaded(true);
      setData({
        title: article.title,
        description: article.description,
        author: article.author,
        img: article.img,
      });
      console.log('edit', edit);
    }
  }, [article, edit]);

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
      setUploading(false);
      setUploaded(true);
    }
  };

  const onSubmit = async () => {
    try {
      const res = await request.post('Articles', data);
      if (res.status === 201) {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Article Submitted!
              </Box>
            );
          },
          placement: 'top',
        });
        navigation.reset({index: 0, routes: [{name: 'MyArticles'}]});
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
      const res = await request.put(`Articles/${article._id}`, {
        ...data,
        status: article.status,
      });
      if (res.status === 200) {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Article Updated!
              </Box>
            );
          },
          placement: 'top',
        });
        navigation.reset({index: 0, routes: [{name: 'MyArticles'}]});
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <MainLayout>
      <ScrollView style={{flex: 1}}>
        <Stack space={2} mx={3}>
          <FormControl>
            <FormControl.Label _text={Styles.labelText}>
              Title
            </FormControl.Label>
            <Input
              defaultValue={edit ? article.title : ''}
              onChangeText={text => setData({...data, title: text})}
              style={Styles.input}
              variant="outline"
              placeholder="Enter Title"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label _text={Styles.labelText}>
              Author(s)
            </FormControl.Label>
            <Input
              defaultValue={edit ? article.author : ''}
              onChangeText={text => setData({...data, author: text})}
              style={Styles.input}
              variant="outline"
              placeholder=" Enter Author(s)"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label _text={Styles.labelText}>
              Description
            </FormControl.Label>
            <TextArea
              defaultValue={edit ? article.description : ''}
              onChangeText={text => setData({...data, description: text})}
              style={Styles.input}
              variant="outline"
              h={40}
              placeholder="Enter Description"
            />
          </FormControl>
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
          {uploaded && (
            <Text fontWeight="600" mt={2} color="#fff">
              Upload Success
            </Text>
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
                      ? article.img
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
          <Center>
            <Button onPress={edit ? onUpdate : onSubmit}>
              {edit ? 'Update Article' : 'Submit Article'}
            </Button>
          </Center>
        </Stack>
      </ScrollView>
    </MainLayout>
  );
};

const Styles = StyleSheet.create({
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

export default AddArticle;
