import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {Button, Center, Heading, Box} from 'native-base';
import useRequest from '../../services/RequestContext';

const CreateUser = ({navigation, route}) => {
  const [admins, setAdmins] = useState([]);
  const {request} = useRequest();
  const {edit, deleteX} = route.params;

  const getAllAdmins = useCallback(async () => {
    try {
      const res = await request.get('Admins/');
      if (res.status === 200) {
        setAdmins(res.data);
        console.log('All Admins', res.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [request]);

  useEffect(() => {
    getAllAdmins().catch(console.error);
  }, [edit, getAllAdmins, deleteX]);

  return (
    <MainLayout>
      <ScrollView>
        <Box>
          <Center>
            <Heading>My Admins</Heading>
            {admins && (
              <>
                {admins.map(adminData => (
                  <Box key={adminData._id}>
                    <Button
                      key={adminData._id}
                      onPress={() =>
                        navigation.navigate('EditAdmin', {admin: adminData})
                      }
                      style={styles.adminBtn}
                      borderRadius="full"
                      mt="5"
                      backgroundColor="#091540"
                      _text={{
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: '#fff',
                      }}>
                      {adminData.name}
                    </Button>
                  </Box>
                ))}
              </>
            )}
          </Center>
        </Box>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  adminBtn: {
    margin: 20,
    fontSize: 30,
    width: 350,
  },
});

export default CreateUser;
