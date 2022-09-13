import React, {createContext, useContext, useEffect, useState} from 'react';
import {loginUser} from './http/userAPI';
import Errors from '../utils/errors';
import {getStorage, removeStorage, setStorage} from '../utils/storage';

const userAuth = {
  isAuthenticated: false,
  signin: async (username, pass, cb = null) => {
    try {
      const data = await loginUser({
        abonement: username.slice(0, 3) === '998' ? null : username,
        phoneNumber: username,
        password: pass,
      });

      if (data.error && data.error != 0) {
        const e = Errors.getLoginErrors(data.error);
        if (cb) cb(false, e);
        return;
      }
      await setStorage('token', data.authkey);
      await setStorage('user', data);
      userAuth.isAuthenticated = true;
      if (cb) cb(data);
    } catch (error) {
      console.log(error + ' authentication.js -> signin');
    }
  },

  signout: async (cb = () => {}) => {
    await removeStorage('token');
    await removeStorage('user');
    userAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

function useProvideAuth() {
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetch = async () => {
      setToken(await getStorage('token'));
      setUser(await getStorage('user'));
    };
    fetch();
  }, []);

  const signin = (username, password, cb) => {
    return userAuth.signin(
      username,
      password,
      async (data = false, error = null) => {
        if (data.authkey) {
          setToken(data.authkey);
          setUser(data);
        }
        cb(data, error);
      },
    );
  };

  const signout = cb => {
    return userAuth.signout(() => {
      setUser(null);
      setToken(null);
      cb();
    });
  };

  return {
    user: typeof user === 'object' || !user ? user : JSON.parse(user),
    token,
    signin,
    signout,
  };
}

const authContext = createContext();

export default function ProvideAuth({children}) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}
