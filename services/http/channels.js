import axios from 'axios';
import {$authHost} from '.';
import {getStorageUrl} from '../../utils/data';
import {parseXML} from '../../utils/parser';

export const getChannels = async () => {
  const {data} = await $authHost().get('/tvmiddleware/api/channel/list/', {
    params: {
      device: 'android_stb',
    },
  });

  return parseXML(data).channels.item;
};

export const getChannelIcons = async isLogged => {
  const noauthChannelsIcon = await axios({
    method: 'POST',
    url: `http://play.tvcom.uz:8009/api/icons?pass=@j9@LKLKK29782LLL)`,
  });

  let result = noauthChannelsIcon.data.message;

  if (isLogged) {
    const authChannels = await getChannels();

    result = authChannels.map(aCh => {
      const sync = result.find(ch => aCh.id == ch.genre_id);
      return {
        ...aCh,
        icon: sync?.img ? getStorageUrl(sync?.img) : aCh.icon,
      };
    });
  } else {
    result.forEach(channel => {
      channel.img = getStorageUrl(channel.img);
    });
  }
  return result;
};

export const getFavChannels = async isLogged => {
  const {data} = await axios({
    method: 'POST',
    url: 'http://play.tvcom.uz:8009/api/favchan?pass=@j9@LKLKK29782LLL)',
  });

  const iconsData = await getChannelIcons(isLogged);
  const result = iconsData.filter(ch => {
    return data.message.find(f => f.channel_id === ch.id);
  });

  return result;
};

export const getChannelDetail = async cid => {
  const {data} = await $authHost().get('/tvmiddleware/api/channel/url/', {
    params: {
      cid,
      redirect: 0,
    },
  });

  return parseXML(data);
};

export const getProgramListByDay = async cid => {
  const {data} = await axios.post('http://play.tvcom.uz/api/auth/channel/epg', {
    cid,
    token: localStorage.getItem('token'),
  });

  return data.data;
};

export const getProgramUrl = async (cid, time) => {
  const {data} = await $authHost().get('/tvmiddleware/api/program/url', {
    params: {
      cid,
      time,
      redirect: 0,
    },
  });

  return parseXML(data);
};
