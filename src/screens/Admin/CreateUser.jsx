import React from 'react';
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
} from 'native-base';

const CreateUser = ({navigation}) => {
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
          Create Account
        </Heading>
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
          <Button
            borderRadius="full"
            mt="5"
            backgroundColor="#091540"
            _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
            Sign Up
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

export default CreateUser;
