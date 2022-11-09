import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RequestContext = createContext({});

export const RequestContextProvider = props => {
  const {children, baseURL} = props;
  const [token, setToken] = useState();

  const UpdateToken = async value => {
    if (value) {
      setToken(value);
      await AsyncStorage.setItem('token', value);
    } else {
      setToken(undefined);
      await AsyncStorage.removeItem('token');
    }
  };

  useEffect(() => {
    const setAsyncStorageToken = async () => {
      if (!token) {
        const newToken = await AsyncStorage.getItem('token');
        UpdateToken(newToken).catch(console.error);
      }
    };
    setAsyncStorageToken().catch(console.error);
  }, [token]);

  const request = useMemo(() => {
    if (token) {
      return axios.create({
        baseURL,
        timeout: 10000,
        headers: {Authorization: `Bearer ${token}`},
      });
    }
    return axios.create({
      baseURL,
      timeout: 10000,
    });
  }, [baseURL, token]);

  return (
    <RequestContext.Provider value={{request, token, UpdateToken}}>
      {children}
    </RequestContext.Provider>
  );
};

const useRequest = () => {
  const context = useContext(RequestContext);
  if (context) {
    return context;
  }
};

export default useRequest;
