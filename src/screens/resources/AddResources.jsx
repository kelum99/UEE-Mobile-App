import React from 'react';
import MainLayout from '../../components/MainLayout';
import {
  Box,
  FormControl,
  Input,
  Center,
  TextArea,
  Button,
  HStack,
} from 'native-base';
import {StyleSheet} from 'react-native';

const AddResources = ({route}) => {
  return (
    <MainLayout>
      <Box alignItems="center">
        <Center>
          <FormControl isRequired my={2}>
            <FormControl.Label
              _text={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
              Author Name
            </FormControl.Label>
            <Input
              fontSize={14}
              width="350"
              variant="outline"
              placeholder="Enter Author Name"
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
              fontSize={14}
              width="350"
              placeholder="Enter Author Name"
              backgroundColor="#fff"
            />
          </FormControl>
        </Center>
        <HStack space={10} justifyContent="center">
          <Button
            mt="5"
            backgroundColor="#091540"
            _text={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
            Submit
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
});
export default AddResources;
