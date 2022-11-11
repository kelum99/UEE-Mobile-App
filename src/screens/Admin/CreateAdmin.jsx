import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {
  AspectRatio,
  Box,
  Button,
  FormControl,
  Heading,
  Image,
  Input,
  useToast,
} from 'native-base';
import useRequest from '../../services/RequestContext';

const CreateAdmin = ({navigation}) => {
  const [data, setData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });
  const {request} = useRequest();
  const toast = useToast();

  const onSubmit = async () => {
    try {
      const res = await request.post('Admins', data);
      if (res.status === 201) {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                Admin Added !
              </Box>
            );
          },
          placement: 'top',
        });
        navigation.navigate('AdminDashboard');
      } else {
        toast.show({
          render: () => {
            return (
              <Box bg="red.500" px="2" py="1" rounded="sm" mb={5}>
                Admin Adding Failed!
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
          Create an Admin Account
        </Heading>
        <Box>
          <FormControl isRequired my={2}>
            <FormControl.Label
              _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
              Name
            </FormControl.Label>
            <Input
              fontSize={14}
              width="350"
              variant="underlined"
              onChangeText={text => setData({...data, name: text})}
            />
          </FormControl>
          <FormControl isRequired my={2}>
            <FormControl.Label
              _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
              Phone Number
            </FormControl.Label>
            <Input
              keyboardType="numeric"
              fontSize={14}
              width="350"
              variant="underlined"
              onChangeText={text => setData({...data, mobile: text})}
            />
          </FormControl>
          <FormControl isRequired my={2}>
            <FormControl.Label
              _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
              Email
            </FormControl.Label>
            <Input
              fontSize={14}
              width="350"
              variant="underlined"
              onChangeText={text => setData({...data, email: text})}
            />
          </FormControl>
          <FormControl isRequired my={2}>
            <FormControl.Label
              _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
              Password
            </FormControl.Label>
            <Input
              type="password"
              fontSize={14}
              width="350"
              variant="underlined"
              onChangeText={text => setData({...data, password: text})}
            />
          </FormControl>
          <Button
            onPress={onSubmit}
            borderRadius="full"
            mt="5"
            backgroundColor="#091540"
            marginBottom={10}
            _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
            Add
          </Button>
        </Box>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 25,
  },
});

export default CreateAdmin;
