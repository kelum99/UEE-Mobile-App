import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {
  AspectRatio,
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  useDisclose,
  useToast,
} from 'native-base';
import axios from 'axios';
import useRequest from '../../services/RequestContext';

const EditAdmin = ({navigation, route}) => {
  const [admin, setAdmin] = useState({});
  const [data, setData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });
  const {edit} = route.params;
  const toast = useToast();
  const {request} = useRequest();
  const [selected, setSelected] = useState();
  const {isOpen, onOpen, onClose} = useDisclose();

  useEffect(() => {
    if (edit && admin) {
      setData({
        name: admin.name,
        mobile: admin.mobile,
        email: admin.email,
        password: admin.password,
      });
      console.log('edit', edit);
    }
  }, [admin, edit]);

  const getAdmin = async () => {
    try {
      const res = await axios.get(
        `http://10.0.2.2:5000/api/Admins/${data._id}`,
      );
      if (res.status === 200) {
        setAdmin(res.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAdmin();
  });

  const onUpdate = async () => {
    try {
      const res = await request.put(`Admins/${admin._id}`, {
        ...data,
        status: admin.status,
      });
      if (res.status === 200) {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Admin Updated !
              </Box>
            );
          },
          placement: 'top',
        });
        // eslint-disable-next-line no-undef
        navigation.reset({index: 0, routes: [(name: 'ViewAdmin')]});
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const onDelete = async () => {
    const res = await request.delete(`Admin/${selected?._id}`);
    if (res.status === 200) {
      toast.show({
        render: () => {
          return (
            <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
              Admin Deleted !
            </Box>
          );
        },
        placement: 'top',
      });
      onClose();
      setSelected(undefined);
      getAdmin().catch(console.error);
    }
  };

  const deletePopup = () => {
    Alert.alert('Delete Admin', 'Are you sure delete this admin', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Delete', onPress: onDelete, style: 'default'},
    ]);
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
          <AspectRatio w="100%">
            <Image
              source={{
                uri: 'https://img2.storyblok.com/0x1000/filters:format(webp)/f/53624/1600x900/ebcd4ed668/kun-5c3a820db838345283.jpg',
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
        <Heading color="#fff" style={styles.title}>
          Edit Details
        </Heading>
        {admin && (
          <>
            <Box>
              <FormControl isRequired my={2}>
                <FormControl.Label
                  _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                  Name
                </FormControl.Label>
                <Input
                  defaultValue={edit ? admin.name : ''}
                  fontSize={14}
                  width="350"
                  variant="underlined"
                />
              </FormControl>
              <FormControl isRequired my={2}>
                <FormControl.Label
                  _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                  Phone Number
                </FormControl.Label>
                <Input
                  defaultValue={edit ? admin.mobile : ''}
                  fontSize={14}
                  width="350"
                  variant="underlined"
                />
              </FormControl>
              <FormControl isRequired my={2}>
                <FormControl.Label
                  _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                  Email
                </FormControl.Label>
                <Input
                  defaultValue={edit ? admin.email : ''}
                  fontSize={14}
                  width="350"
                  variant="underlined"
                />
              </FormControl>
              <FormControl isRequired my={2}>
                <FormControl.Label
                  _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                  Password
                </FormControl.Label>
                <Input
                  defaultValue={edit ? admin.password : ''}
                  fontSize={14}
                  width="350"
                  variant="underlined"
                />
              </FormControl>
              <HStack style={{justifyContent: 'center'}}>
                <Button
                  onPress={onUpdate}
                  style={styles.btn}
                  mt="5"
                  backgroundColor="#091540"
                  _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                  Update
                </Button>
                <Button
                  onPress={deletePopup}
                  style={styles.btn}
                  mt="5"
                  backgroundColor="#c21313"
                  _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                  Delete
                </Button>
              </HStack>
            </Box>
          </>
        )}
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 25,
  },
  btn: {
    width: 150,
    borderRadius: 50,
    margin: 15,
  },
});

export default EditAdmin;
