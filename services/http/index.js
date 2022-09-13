import axios from 'axios';
import {getStorage} from '../../utils/storage';
import {CONFIG_HTTP} from './config';

export const $host = axios.create({
  baseURL: CONFIG_HTTP.APP_API,
});

export const $hostWithParams = axios.create({
  baseURL: CONFIG_HTTP.APP_API,
  params: {
    client_id: CONFIG_HTTP.CLIENT_ID,
    api_key: CONFIG_HTTP.API_KEY,
  },
});

export const $authHost = async (api = false, token = false) =>
  axios.create({
    baseURL: CONFIG_HTTP.APP_API,
    params: {
      client_id: CONFIG_HTTP.CLIENT_ID,
      api_key: api ? CONFIG_HTTP.API_KEY : null,
      [token ? 'token' : 'authkey']: await getStorage('token'),
    },
  });

export const $authHostCustomUrl = async () =>
  axios.create({
    params: {
      client_id: CONFIG_HTTP.CLIENT_ID,
      authkey: await getStorage('token'),
    },
  });
