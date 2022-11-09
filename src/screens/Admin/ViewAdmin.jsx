import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import MainLayout from '../../components/MainLayout';
import {Button, Center, Heading, Box} from 'native-base';
import axios from 'axios';

const CreateUser = ({navigation}) => {
  const [admins, setAdmins] = useState([]);
  const getAllAdmins = async () => {
    try {
      const res = await axios.get('http://10.0.2.2:5000/api/Admins');
      if (res.status === 200) {
        setAdmins(res.data);
        console.log('All Admins', res.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAllAdmins();
    console.log();
  }, []);

  return (
    <MainLayout>
      <ScrollView>
        <Box>
          <Center>
            <Heading>My Admins</Heading>
            {admins && (
              <>
                {admins.map(adminData => (
                  <Box>
                    <Button
                      key={adminData._id}
                      onPress={() =>
                        navigation.navigate({
                          name: 'EditAdmin',
                          params: {adminData},
                        })
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
