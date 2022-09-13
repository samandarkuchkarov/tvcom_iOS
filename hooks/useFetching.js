import {useState} from 'react';
import { navigate } from '../../Navigation/PhoneNavigation';
import {useAuth} from '../services/authentication';
import responseError from '../utils/errors/response';

const useFetching = (callback, initial = [], initialLoading) => {
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(initialLoading ?? true);
  const [error, setError] = useState();

  const auth = useAuth();

  const getData = async (...args) => {
    setLoading(true);
    try {
      await new Promise((resolve, _) => {
        setTimeout(resolve, 500);
      });
      const result = await callback(...args);
      setData(result);
      setLoading(false);
      return result;
    } catch (error) {
      const e = responseError(error);
      setError(e);
      console.log(e.message + ' useFetching.js');
      if (typeof e.message !== 'string') return;
      const errorLower = e.message.toLowerCase();
      if (
        errorLower === 'authkey is invalid' ||
        errorLower === 'cannot convert undefined or null to object'
        // Videofile is not found
        // Server Error -> Channel "Dunyo bo'ylab"
        // Account hasn't access for this video
      ) {
        auth.signout();
      }
    } finally {
      setLoading(false);
    }
  };

  return [getData, data, loading, error];
};

export default useFetching;
