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
  useToast,
} from 'native-base';
import useRequest from '../../services/RequestContext';

const EditAdmin = ({navigation, route}) => {
  const {admin} = route.params;
  const [data, setData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });
  const toast = useToast();
  const {request} = useRequest();

  useEffect(() => {
    if (admin) {
      setData({
        name: admin.name,
        mobile: admin.mobile,
        email: admin.email,
        password: admin.password,
      });
    }
  }, [admin]);

  // const getAdmin = async () => {
  //   try {
  //     const res = await request.get(`Admins/${data._id}`);
  //     if (res.status === 200) {
  //       setAdmin(res.data);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };
  //
  // useEffect(() => {
  //   getAdmin();
  // });

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
        navigation.navigate('ViewAdmin', {edit: true, deleteX: false});
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const onDelete = async () => {
    const res = await request.delete(`Admins/${admin._id}`);
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
      navigation.navigate('ViewAdmin', {edit: false, deleteX: true});
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
                  defaultValue={admin.name}
                  onChangeText={text => setData({...data, name: text})}
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
                  onChangeText={text => setData({...data, mobile: text})}
                  defaultValue={admin.mobile}
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
                  onChangeText={text => setData({...data, email: text})}
                  defaultValue={admin.email}
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
                  onChangeText={text => setData({...data, password: text})}
                  defaultValue={admin.password}
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
