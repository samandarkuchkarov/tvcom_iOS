import { parse } from "fast-xml-parser";
import axios from "axios";
import base64 from "react-native-base64";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import DeviceInfo from 'react-native-device-info';

export const getChannel =async (isLogin,token,apiKey,phone) => {
    //const device_uid = await DeviceInfo.getMacAddress()
    if (isLogin == 1) {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/channel/list/`,
        params: {
          authkey: token,
          client_id: 1,
          device:phone? 'android' : 'android_stb',
          api_key:apiKey,
        //device_uid

        },
      })
        .then(e => {
          if(typeof e.data == 'string'){
            let data = parse(e.data)
            return data.rss.channels.item;
          }else{
            return e.data && e.data.channels
          }
        })
        .catch(e => {
          console.log(e, 'getChannel');
        });
    }
};

export const getChannelInfo = async(search,token) => {
  //const device_uid = await DeviceInfo.getMacAddress()
  return axios({
    method: 'GET',
    url: `https://mw.tvcom.uz/tvmiddleware/api/channel/list/search/`,
    params: {
      authkey: token,
      limit: 1,
      client_id: 1,
      search,
      device:'android_stb',
      device_uid
    },
  })
    .then(e => {
      if (typeof e.data == 'string') {
        if (e.data.includes('rss')) {
          let data = parse(e.data);
          if (data.rss.channels) {
            return data.rss.channels.item;
          }
        }
      }
      return e.data.channels[0];
    })
    .catch(e => {
      console.log(e, 'getChannelInfo');
    });
};

export const logoutApi = async (token,phone) => {
  //const device_uid = await DeviceInfo.getMacAddress()
  return axios({
    method: 'GET',
    url: `https://mw.tvcom.uz/tvmiddleware/api/logout`,
    params:{
      authkey:token,
      client_id:1,
      device: phone?'android':'android_stb',
      device_uid
    }
  })
    .then(e => {
      return e.data;
    })
    .catch(e => {
      console.log(e, 'logoutApi');
    });
}

export const getPodborkaChannels = async()=>{
  return  axios({
    method: 'POST',
    url: `http://play.tvcom.uz:8008/api/favchan?pass=@j9@LKLKK29782LLL)`,
  }).then(e => {
      return e.data.message
    })
    .catch(e => {
      console.log(e, 'getPodborkaChannels');
    });
}

export const getPodborka = async()=>{
  return axios({
    method: 'POST',
    url: `http://play.tvcom.uz:8008/api/podborki?pass=@j9@LKLKK29782LLL)`,
  }).then(e => {
      return e.data.data;
    })
    .catch(e => {
      console.log(e, 'getPodborka');
    });
}

export const login = async(data,apiKey,phone)=>{
  if(data.abonement.length == 12 && data.abonement.slice(0,3)=='998'){
    params = {
      phone_number:data.abonement,
      password:data.password,
    }
  }else{
    params = data
  }
  params.client_id = 1
  params.api_key = apiKey
  //const device_uid = await DeviceInfo.getMacAddress()
  //const device_model =  DeviceInfo.getModel()
  //const device_serial = DeviceInfo.getSerialNumber()
  return axios({
    method: 'GET',
    url: `https://mw.tvcom.uz/tvmiddleware/api/login`,
    params:{
      ...params,
      device:phone?'android':"android_stb",
      device_uid,
      device_model,
      device_serial
    
    }}).then(async e => {
      if(typeof e.data == 'string'){
        let data = parse(e.data)
        data = data.rss
        return data
      }else{
        return e.data
      }
    })
    .catch(e => {
      console.log(e, 'login');
    });
}

export const getApiKey = (apiKey,setApiKey) =>{
  if(!apiKey){
    return axios({
      method:'POST',
      url:'http://play.tvcom.uz:8008/api/moviekey?pass=@j9@LKLKK29782LLL)',
    }).then((e)=>{
      let key = base64.decode(e.data.message); 
      setApiKey(key)
      return key
    })
  }
}

export const addViewed =  async(vid, assetsId, apiKey, token, phone) => {
  //const device_uid = await DeviceInfo.getMacAddress()
    return axios({
      method:'GET',
      url:'https://mw.tvcom.uz/tvmiddleware/api/content/position/set',
      params:{
        content_type:'video',
        api_key:apiKey,
        client_id:1,
        position:10,
        device:phone?'android':'android_stb',
        content_id:vid,
        authkey:token,
        asset_id:assetsId?assetsId:null,
        //device_uid,
      }
    }).then(e=>{
      if(typeof e.data ==='string'){
        let data = parse(e.data) 
        return data.rss
      }
      return e.data
    }).catch(e=>{
      console.log(e, 'addViewed' )
    })
}

export const getData = async (key,setToken,setLogin) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== 'null') {
        if (key == 'token') {
         if(JSON.parse(jsonValue)){
           setToken(JSON.parse(jsonValue).token);
         }
        }
      } else {
        if (key == 'token') {
          setToken(null);
          setLogin(0);
        }
      }
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      if (key == 'token') {
        console.log(e,'getData')
        setLogin(0);
      }
    }
};

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) { }
};
export const resetPassword = async( mobile_phone_number, code, apiKey, phone ) =>{
  //const device_uid = await DeviceInfo.getMacAddress()
  return axios({
    method:'GET',
    url:'https://mw.tvcom.uz/tvmiddleware/api/account/reset_password',
    params:{
      mobile_phone_number,
      api_key:apiKey,
      client_id:1,
      code:code?code:null,
      device:phone?'android':'android_stb',
      device_uid
    }
  }).then(e=>{
    if(typeof e.data ==='string'){
      let data = parse(e.data)
      return data.rss
    }
    return e.data
  }).catch(e=>{
    console.log(e, 'resetPassword' )
  })
}

export const getSubscriptionList = async (setToken,setLogin,apiKey,token,phone) => {
  //const device_uid = await DeviceInfo.getMacAddress()
  let token1
    if(!token){
      let result = await getData('token',setToken,setLogin)
      if(result){
        token1 = result.token
      }
    }else{
      token1 = token
    }

  if (token1) {
    return axios({
      method: 'GET',
      url: 'https://mw.tvcom.uz/tvmiddleware/api/customer/tariff/subscription/list/',
      params: {
        authkey: token1,
        api_key: apiKey,
        client_id: 1,
        device:phone?'android':'android_stb',
        //device_uid
      }
    }).then(e => {
      if (typeof e.data == 'string') {
        const data = parse(e.data)
        if (Array.isArray(data.rss.subscriptions.item)) {
          return data.rss.subscriptions.item
        } else {
          if(data.rss.subscriptions.item){
            return [data.rss.subscriptions.item]
          }else{
            return []
          }
        }

      } else {
        return e.data.subscriptions
      }
    }).catch(e => {
      console.log(e, 'getSubscriptionList')

    })
  }

}

export const getTime = async () => {
  return axios({
    method: 'POST',
    url: `http://play.tvcom.uz:8008/api/somedata?pass=@j9@LKLKK29782LLL)`,
  })
    .then(e => {
      return Number(e.data.message.timestamp);
    })
    .catch(e => {
      console.log(e, 'getTime');
    });
};
export const getFullChannels = async () => {
  return axios({
    method: 'POST',
    url: `http://play.tvcom.uz:8008/api/tvlist?pass=@j9@LKLKK29782LLL)`,
  })
    .then(e => {
      if(e.data.data){
        return e.data.data.channels.item;
      }else{
        return [];
      }
     
    })
    .catch(e => {
      console.log(e, 'getFullChannels');
    });
};

export const setVideoPosition = async ({content_type = "video",content_id,position,asset_id = null,phone=false}) => {
  return axios({
    method: 'GET',
    url: `https://mw.tvcom.uz/tvmiddleware/api/content/position/set/`,
    params:{
        device: phone?"android":"android_stb",
        content_type,
        content_id,
        position:position.toFixed(0),
        asset_id,
    }
  })
    .then(e => {
    
      return e.data
    })
    .catch(e => {
      //  console.log(e, 'setVideoPosition');
    });
};
export const getAnswers = async () => {
  return axios({
    method: 'POST',
    url: `http://play.tvcom.uz:8008/api/answers?pass=@j9@LKLKK29782LLL)`,
  })
    .then(e => {
     
      return e.data.data
    })
    .catch(e => {
      console.log(e, 'getAnswers');
    });
};

