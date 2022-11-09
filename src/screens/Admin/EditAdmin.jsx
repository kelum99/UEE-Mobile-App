import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
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
} from 'native-base';
import axios from 'axios';

const EditAdmin = ({route}) => {
  const [admin, setAdmin] = useState({});
  const {adminData} = route.params;

  const getAdmin = async () => {
    try {
      const res = await axios.get(
        `http://10.0.2.2:5000/api/Admins/${adminData._id}`,
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
                <Input fontSize={14} width="350" variant="underlined" />
              </FormControl>
              <FormControl isRequired my={2}>
                <FormControl.Label
                  _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                  Phone Number
                </FormControl.Label>
                <Input fontSize={14} width="350" variant="underlined" />
              </FormControl>
              <FormControl isRequired my={2}>
                <FormControl.Label
                  _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                  Email
                </FormControl.Label>
                <Input fontSize={14} width="350" variant="underlined" />
              </FormControl>
              <FormControl isRequired my={2}>
                <FormControl.Label
                  _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                  Password
                </FormControl.Label>
                <Input fontSize={14} width="350" variant="underlined" />
              </FormControl>
              <HStack style={{justifyContent: 'center'}}>
                <Button
                  style={styles.btn}
                  mt="5"
                  backgroundColor="#091540"
                  _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                  Update
                </Button>
                <Button
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
