import React from 'react';
import MainLayout from '../../components/MainLayout';
import {FormControl, Input, Stack, TextArea} from 'native-base';
import {StyleSheet} from 'react-native';

const AddArticle = () => {
  return (
    <MainLayout>
      <Stack space={2} mx={3}>
        <FormControl>
          <FormControl.Label _text={Styles.labelText}>Title</FormControl.Label>
          <Input variant="filled" placeholder="Enter Title" />
        </FormControl>
        <FormControl>
          <FormControl.Label _text={Styles.labelText}>
            Author(s)
          </FormControl.Label>
          <Input variant="filled" placeholder="Enter Author(s)" />
        </FormControl>
        <FormControl>
          <FormControl.Label _text={Styles.labelText}>
            Description
          </FormControl.Label>
          <TextArea h="60%" placeholder="Text Area Placeholder" />
        </FormControl>
      </Stack>
    </MainLayout>
  );
};

const Styles = StyleSheet.create({
  labelText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default AddArticle;
