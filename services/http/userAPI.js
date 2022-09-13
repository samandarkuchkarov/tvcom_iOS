import {$authHost, $hostWithParams} from '.';
import {parseXML} from '../../utils/parser';

export const loginUser = async ({abonement, phoneNumber, password}) => {
  const {data} = await $hostWithParams.get('/tvmiddleware/api/login/', {
    params: abonement
      ? {
          abonement,
          password,
          device: 'android_stb',
        }
      : {
          phone_number: phoneNumber,
          password,
          device: 'android_stb',
        },
  });
  return parseXML(data);
};

export const logout = async () => {
  await $authHost().get('/tvmiddleware/api/logout/');
};

export const getSubscriptionTariffs = async () => {
  const data = $authHost().get(
    '/tvmiddleware/api/customer/tariff/subscription/list/',
  );

  return data;
};
