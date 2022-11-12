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
  Alert,
  Text,
} from 'native-base';

const WelcomeBack = ({navigation}) => {
  const [formData, setFormData] = useState({userName: '', password: ''});
  // const {user} = route.params;
  const toast = useToast();

  const admin = {
    userName: 'Saman',
    password: 'saman123',
  };
  const user = {
    userName: 'Nimal',
    password: 'nimal123',
  };

  const login = () => {
    if (
      admin.userName === formData.userName &&
      admin.password === formData.password
    ) {
      toast.show({
        render: () => {
          return (
            <Alert justifyContent="center" status="success" variant="solid">
              <Text color="white" fontWeight="medium">
                Login Success!
              </Text>
            </Alert>
          );
        },
        duration: 2000,
        placement: 'top',
      });
      // navigation.navigate('AdminDashboard');
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'AdminDashboard'}],
      // });
    } else if (
      user.userName === formData.userName &&
      user.password === formData.password
    ) {
      toast.show({
        render: () => {
          return (
            <Alert justifyContent="center" status="success" variant="solid">
              <Text color="white" fontWeight="medium">
                Login Success!
              </Text>
            </Alert>
          );
        },
        duration: 2000,
        placement: 'top',
      });
      //navigation.navigate('NewsFeed');
      navigation.reset({
        index: 0,
        routes: [{name: 'NewsFeed'}],
      });
    } else {
      toast.show({
        render: () => {
          return (
            <Alert justifyContent="center" status="error" variant="solid">
              <Text color="white" fontWeight="medium">
                Login Faild! Try Again!
              </Text>
            </Alert>
          );
        },
        duration: 2000,
        placement: 'top',
      });
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
          Login !
        </Heading>
        <Box>
          <FormControl isRequired my={2}>
            <FormControl.Label
              _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
              Email
            </FormControl.Label>
            <Input
              fontSize={14}
              width="350"
              variant="underlined"
              onChangeText={text => setFormData({...formData, userName: text})}
            />
          </FormControl>
          <FormControl isRequired my={2}>
            <FormControl.Label
              _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
              Password
            </FormControl.Label>
            <Input
              fontSize={14}
              width="350"
              variant="underlined"
              onChangeText={text => setFormData({...formData, password: text})}
            />
          </FormControl>
          <Button
            onPress={login}
            borderRadius="full"
            mt="5"
            backgroundColor="#091540"
            _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
            Login
          </Button>
        </Box>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 30,
  },
});

export default WelcomeBack;
