import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorage = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e, 'storage.js -> getStorage');
  }
};

export const setStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(e, 'storage.js -> setStorage');
  }
};

export const removeStorage = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e, 'storage.js -> removeStorage');
  }
};
