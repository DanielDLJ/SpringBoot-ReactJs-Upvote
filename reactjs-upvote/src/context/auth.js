import React, {createContext, useState, useEffect, useContext} from 'react';
import * as auth from '../api/auth-api';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loadingDataAuth, setLoadingDataAuth] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      // storeDataUser({id:122342,username:"DanielDLJ"})
      const storageUser = await getData();
      if (storageUser) {
        setUser(storageUser);
      }
      setLoadingDataAuth(false);
    }
    loadStorageData();
  }, []);

  useEffect(() => {
    console.log('User logado', user);
  }, [user]);



  async function logInUser(user) {
    let response = await auth.loginUser(user);
    // response = {username:"teste",id: 23423}
    if (response.error) {
      return response;
    }
    setUser(response);
    storeDataUser(response);

    return response;
  }
  

  async function registerUser(userToregister) {
    const response = await auth.register(userToregister);
    if (response.error) {
      return response;
    }
    setUser(response);
    storeDataUser(response);

    return response;
  }

  function signOut() {
    try {
        localStorage.clear();
        setUser(null);
      } catch (e) {
        console.log(e);
      }
    
  }

  async function getData() {
    try {
      const id = localStorage.getItem('user_id');
      const username = localStorage.getItem('user_username');
      if (id == null) return null;

      let user = {
        id: parseInt(id),
        username: username
      };
      return user;
    } catch (e) {
      console.log('[AuthProvider getData]', e);
    }
  }

  async function storeDataUser(user) {
    try {
        localStorage.setItem('user_id', user.id.toString());
        localStorage.setItem('user_username', user.username);
    } catch (e) {
      console.log('AuthContext storeDataUser', e);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loadingDataAuth,
        user,
        logInUser,
        registerUser,
        signOut,
        getData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;