import {$host} from '.';
import {getStorageUrl} from '../../utils/data';
import {CONFIG_HTTP} from './config';

export const getBanners = async () => {
  const {data} = await $host.post(CONFIG_HTTP.BANNER_URL);
  const result = data.message.map(banner => {
    return {
      ...banner,
      img_mini: getStorageUrl(banner.img_mini),
    };
  });
  return result;
};
