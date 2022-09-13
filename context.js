import React, { createContext, useState } from 'react';
import axios from 'axios';
import { parse } from 'fast-xml-parser';
//import DeviceInfo from 'react-native-device-info';
import { getApiKey } from './Api';
import { getData } from './Api';
import { storeData } from './Api';


export const Datas = createContext(null);

export const ContextProvider = props => {
  const { children } = props;
  const [filterOpen, setFilter] = React.useState(false);
  const [isLogin, setLogin] = React.useState(-1);
  const [token, setToken] = React.useState(null);

  const [navigation, setNavigation] = React.useState(false);
  const [returnRoute, setRoute] = React.useState('HomePhone');
  const [apiKey,setApiKey] = React.useState()


    React.useEffect(()=>{
      getApiKey(apiKey,setApiKey)
    },[])

    React.useEffect(()=>{
      if(isLogin===0){
        setJanrTv([])
      }
    },[isLogin])






  const registration = async (phone,isPhone) => {
    // //const device_uid = await DeviceInfo.getMacAddress()
    // const device_model = await DeviceInfo.getModel()
    return axios({
      method: 'GET',
      url: `https://mw.tvcom.uz/tvmiddleware/api/account/register`,
      params: {
        mobile_phone_number: phone,
        client_id: 1,
        api_key: apiKey,
        device:isPhone?'android':'android_stb',
        comment:isPhone?'Registration from android device new app':'Registration from android TV 2.0.2',
        send_sms:1,
        // device_uid,
        // device_model
      },
    })
      .then(async e => {
        if(typeof e.data == 'string'){
          let data = parse(e.data)
          return {
            data:data.rss
          };
        }
        return {data:e.data}
      })
      .catch(e => {
        console.log(e, 'registration');
      });
  };
  
  const registrationAbon = async (phone, login) => {
    return axios({
      method: 'POST',
      url: `http://play.tvcom.uz/api/register/abon`,
      data: {
        phone,
        login,
        

      },
    })
      .then(async e => {
        return e;
      })
      .catch(e => {
        console.log(e, 'registrationAbon');
      });
  };
  const getJanr = () => {
    return axios({
      method: 'POST',
      url: `http://play.tvcom.uz:8008/api/genres?pass=@j9@LKLKK29782LLL)`,
    })
      .then(e => {
        return e.data.message;
      })
      .catch(e => {
        console.log(e, 'getJanr');
      });
  };
  
  const getFilms = async (params) => {
    let phone = params.phone
    ////const device_uid = await DeviceInfo.getMacAddress()
    if(phone){
      delete params.phone
    }
    let token1
    let result = await getData('token',setToken,setLogin)
    if(!token){
      if(result){
        token1 = result.token
      }
    }else{
      token1 = token
    }

    let api_key = apiKey
    if(!api_key){
      api_key = await getApiKey(apiKey,setApiKey)
    } 
    
    if (isLogin !== 0 && token1) {
      if(params.genre){
        return axios({
          method: 'POST',
          url: `http://play.tvcom.uz:8008/api/genre/list`,
          data: {
            token: token1,
            ...params,
            
          },
        }).then(e => {
            let data = e.data.data
            let filtered = []
            for(let i = 0;i<data.length;i++){
              if(Array.isArray(data[i])){
                filtered = [...data[i],...filtered]
              }else{
                filtered = [data[i],...filtered]
              }
            }
            return filtered
          }).catch(e => {
            console.log(e, 'getFilms janre');
            return []
          });

      }else{
        
        delete params.genre
        return axios({
          method: 'GET',
          url: `https://mw.tvcom.uz/tvmiddleware/api/video/list/?client_id=1`,
          params: {
            authkey: token1,
            api_key,
            device:'android_stb',
        //device_uid,
            ...params,
          },
        }).then(e => {
            if (typeof e.data == 'string') {
              if (e.data.includes('rss')) {
                let data = parse(e.data);
                if (!data.rss.videos) {
                  return [];
                }
                
                if(Array.isArray(data.rss.videos.item)){
                  return data.rss.videos.item;
                }else{
                  return [data.rss.videos.item];
                }
              }
            }
            if (!e.data.videos) {
              return [];
            }
            return e.data.videos;
          })
          .catch(e => {
            console.log(e, 'getFilms');
          });
      }
    } else {
      if(params.genre){
        return axios({
          method: 'POST',
          url: `http://play.tvcom.uz:8008/api/genre/list`,
          data: {
            ...params,
          },
        }).then(e => {
            let data = e.data.data
            let filtered = []
            for(let i = 0;i<data.length;i++){
              if(Array.isArray(data[i])){
                filtered = [...data[i],...filtered]
              }else{
                filtered = [data[i],...filtered]
              }
            }
            return filtered
          }).catch(e => {
            console.log(e, 'getFilms janre');
            return []
          });

      }else{
        return axios({
          method: 'GET',
          url: `https://mw.tvcom.uz/tvmiddleware/api/noauth/video/list/?client_id=1`,
          params: {
            api_key,
            device:'android_stb',
        //device_uid,
            ...params,
          },
        })
          .then(e => {
            if (typeof e.data == 'string') {
              if (e.data.includes('rss')) {
                let data = parse(e.data);
                if (!data.rss.videos) {
                  return [];
                }
                
                if(Array.isArray(data.rss.videos.item)){
                  return data.rss.videos.item;
                }else{
                  return [data.rss.videos.item];
                }
              }
            }
            if (!e.data.videos && e.data.videos.length == 0) {
              return [];
            }
            return e.data.videos;
          })
          .catch(e => {
            console.log(e, 'getFilms');
          });
      }
     
    }
  };
  
  const getFilmsWithParams = async (params) => {
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
    if (isLogin !== 0 && token1) {
        return axios({
          method: 'GET',
          url: `https://mw.tvcom.uz/tvmiddleware/api/video/list/?client_id=1`,
          params: {
            authkey: token1,
            ...params,
            api_key:apiKey,
            device:'android_stb',
        //device_uid

          },
        }).then(e => {
            if (typeof e.data == 'string') {
              if (e.data.includes('rss')) {
                let data = parse(e.data);
                if (!data.rss.videos) {return []}
                if(Array.isArray(data.rss.videos.item)){
                  return{
                    count:data.rss.count,
                    movies:data.rss.videos.item
                  };
                }else{
                  return{
                    count:data.rss.count,
                    movies:[data.rss.videos.item]
                  };
                }
               
              }
            }
            if (!e.data.videos) {return []}
            return{
              count:e.data.count,
              movies:e.data.videos
            };
          }).catch(e => {
            console.log(e, 'getFilms');
          });
      
    } 
  };

  const getPopular = async () => {
    return axios({
      method: 'POST',
      url: `http://play.tvcom.uz/api/auth/video/list`,
      data: {
        limit: 28,
        token,
        order: '-average_customers_rating',
      },
    })
      .then(e => {
        return e.data.data.videos.item;
      })
      .catch(e => {
        console.log(e, 'getPopular');
      });
  };

  const getCurrentMovie = async (id,phone) => {
    //const device_uid = await DeviceInfo.getMacAddress()
    if (isLogin) {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/video/detail/`,
        params: {
          vid: Number(id),
          authkey: token,
          device: phone?'android':'android_stb',
          client_id: 1,
        //device_uid
        },
      })
        .then(e => {
          if(typeof e.data === 'string'){
            let data = parse(e.data);
            return data.rss;
          }else{
            return e.data
          }
        })
        .catch(e => {
          console.log(e, 'getCurrentMovie');
        });
    } else {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/noauth/video/detail/`,
        params: {
          vid: Number(id),
          device: 'android_stb',
          client_id: 1,
          api_key: apiKey,
        //device_uid
        },
      })
        .then(e => {
          if(typeof e.data == 'string'){
            let data = parse(e.data);
            return data.rss;
          }
          return e.data
        })
        .catch(e => {
          console.log(e, 'getCurrentMovie');
        });
    }
  };

  const getSrc = async (data,phone) => {
    //const device_uid = await DeviceInfo.getMacAddress()
    return axios({
      method: 'GET',
      url: `https://mw.tvcom.uz/tvmiddleware/api/video/url/`,
      params: {
        vid: data.video_id,
        authkey: token,
        vfid: data.fileId,
        redirect:0,
        device:phone?'android':'android_stb',
        client_id:1,
        api_key:apiKey,
        //device_uid
      },
    })
      .then(e => {
        if(typeof e.data === 'string'){
          let data = parse(e.data)
          return data.rss.uri;
        }
        return e.data
      })
      .catch(e => {
        console.log(e, 'getSrc');
      });
  };

  const searchFilm = async text => {
    //const device_uid = await DeviceInfo.getMacAddress()
    if (isLogin) {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/video/list/?client_id=1`,
        params: {
          search: text,
          limit: 20,
          authkey:token,
          api_key:apiKey,
          device:'android_stb',
        //device_uid
        },
      })
        .then(e => {
          if (typeof e.data == 'string') {
            if (e.data.includes('rss')) {
              let data = parse(e.data);
         
              if (!data.rss.videos) {
                return [];
              }
              if(Array.isArray(data.rss.videos.item)){
                return data.rss.videos.item;
              }else{
                return [data.rss.videos.item];
              }
              
            }
          }
          if (e.data.data.videos && e.data.data.videos.item) {
            return e.data.data.videos.item;
          }
        })
        .catch(e => {
          console.log(e, 'searchFilm');
        });
    } else {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/noauth/video/list/?client_id=1`,
        params: {
          search: text,
          limit: 20,
          api_key:apiKey,
          device:'android_stb',
        //device_uid
        },
      })
        .then(e => {
          if (typeof e.data == 'string') {
            if (e.data.includes('rss')) {
              let data = parse(e.data);
              if (!data.rss.videos) {
                return [];
              }
              
              if(Array.isArray(data.rss.videos.item)){
                return data.rss.videos.item;
              }else{
                return [data.rss.videos.item];
              }
            }
          }
          if (e.data.data.videos && e.data.data.videos.item) {
            return e.data.data.videos.item;
          }
        })
        .catch(e => {
          console.log(e, 'searchFilm');
        });
    }
  };

  const checkToken = async (phone) => {
    let token1;
    if(!token){
      let result = await getData('token',setToken,setLogin)
      if(result){
        token1 = result.token
      }
    }else{
      token1 = token
    }
    //const device_model = DeviceInfo.getModel()
    //const device_uid = await DeviceInfo.getMacAddress()
    if (token1) {
      return await axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/account/status/`,
        params: {
          authkey: token1,
          client_id: 1,
          device:phone?'android':'android_stb',
        //device_uid,
          device_model

          
        },
      })
        .then(e => {
        
          if (typeof e.data == 'string') {
            
            if (e.data.includes('rss')) {
              let data = parse(e.data);
              if(debtStatus&&data.status_reason!=='DEBT'){
                setDebtStatus(false)
              }else if(!debtStatus && data.status_reason=='DEBT'){
                setDebtStatus(true)
              }
              if (data.rss.status == 1) {
                storeData('token', null);
                setToken()
                setLogin(0);
                return 0;
              } else {
                return 1;
              }
            }
          } else {
            if(debtStatus&&e.data.status_reason!=='DEBT'){
              setDebtStatus(false)
            }else if(!debtStatus && e.data.status_reason=='DEBT'){
              setDebtStatus(true)
            }
            if (e.data.status == 1) {
              storeData('token', null);
              setToken()
              setLogin(0);
              return 0;
            } else {
              return 1;
            }
          }
        })
        .catch(e => {
          console.log(e, 'checkToken');
        });
    } else {
      if(isLogin===1){
        storeData('token', null);
        setToken()
        setLogin(0);
        return 0
      }
    }
  };

  const getChannelIcons = () => {
    return axios({
      method: 'POST',
      url: `http://play.tvcom.uz:8008/api/icons?pass=@j9@LKLKK29782LLL)`,
    })
      .then(e => {
        return e.data.message;
      })
      .catch(e => {
        console.log(e, 'getChannelIcons');
      });
  };

  const getChannelSrc = async (id,phone) => {
    if (isLogin == 1) {
      //const device_uid = await DeviceInfo.getMacAddress()
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/channel/url/`,
        params: {
          cid: id,
          redirect:0,
          authkey:token,
          client_id:1,
          device:phone?'android':'android_stb',
        //device_uid
        },
      })
        .then(e => {
          if(typeof e.data == 'string'){
            uri = parse(e.data)
            return uri.rss.uri.replace('amp;','')
          }
          return e.data.uri.replace('amp;','')
        })
        .catch(e => {
          console.log(e, 'getChannelSrc');
        });
    }
  };

  const getTimeShift = async (cid, begin_time,phone) => {
    //const device_uid = await DeviceInfo.getMacAddress()
    if (isLogin == 1) {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/program/url`,
        params: {
          authkey: token,
          // pid,
          cid,
          time: Math.trunc(begin_time),
          redirect: 0,
          client_id: 1,
          device:phone?'android':'android_stb',
        //device_uid
        },
      })
        .then(e => {
          if (typeof e.data == 'string') {
            if (e.data.includes('rss')) {
              let data = parse(e.data);
              return data.rss;
            }
          }
          return e.data;
        })
        .catch(e => {
          console.log(e, 'getTimeShift');
        });
    }
  };

  const getProgramListByDay = (cid,phone) => {
    if (isLogin == 1) {
      return axios({
        method: 'POST',
        url: `http://play.tvcom.uz/api/auth/channel/epg`,
        data: {
          token: token,
          cid,
        },
      })
        .then(e => {
          return e.data;
        })
        .catch(e => {
          console.log(e, 'getProgramListByDay',cid);
        });
    }
  };
  const getUserInfo = async (phone) => {
    //const device_uid = await DeviceInfo.getMacAddress()
    if (isLogin == 1) {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/customer/info`,
        params: {
          authkey: token,
          client_id:1,
          api_key:apiKey,
          device:phone?'android':'android_stb',
        //device_uid
        },
      })
        .then(e => {
          if(typeof e.data == 'string'){
            let data = parse(e.data)
            return data.rss
          }
          return e.data
        })
        .catch(e => {
          console.log(e, 'getUserInfo');
        });
    }
  };


  const getAksiya = () => {
    return axios({
      method: 'GET',
      url: 'https://serv.comnet.uz/api/slider',
      headers: {
        Authorization: 'Bearer 3|YOz6gV9lvSlVao1VfTzboRMDSpipDNuSMeSLaNFo',
      },
    }).then(response => {
      return response.data.data;
    });
  };

  const getParners = () => {
    return axios({
      method: 'GET',
      url: 'https://serv.comnet.uz/api/partners',
      headers: {
        Authorization: 'Bearer 3|YOz6gV9lvSlVao1VfTzboRMDSpipDNuSMeSLaNFo',
      },
    }).then(response => {
      return response.data.data;
    });
  };

  const getDocs = () => {
    return axios({
      method: 'GET',
      url: `http://api92.tvcom.uz:9000/api/noauth/documents`,
    })
      .then(e => {
        return e.data['0'];
      })
      .catch(e => {
        console.log(e, 'getDocs');
      });
  };

  const toggleLike = async (id, is_favorited,phone) => {
    //const device_uid = await DeviceInfo.getMacAddress()
    return axios({
      method: 'GET',
      url: `https://mw.tvcom.uz/tvmiddleware/api/video/settings/set`,
      params: {
        authkey: token,
        vid: id,
        is_favorited,
        client_id: 1,
        device:phone?'android':'android_stb',
        //device_uid
      },
    })
      .then(e => {
        return;
      })
      .catch(e => {
        console.log(e, 'toggleLike');
      });
  };

  const toggleLikeTV = async (condition, id,phone) => {
    //const device_uid = await DeviceInfo.getMacAddress()
    if (condition) {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/settings/save/`,
        params: {
          authkey: token,
          favorite_channel: id,
          client_id: 1,
          device:phone?'android':'android_stb',
        //device_uid
        },
      })
        .then(e => {
          return e.data;
        })
        .catch(e => {
          console.log(e, 'toggleLikeTV');
        });
    } else {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/settings/save/`,
        params: {
          authkey: token,
          unfavorite_channel: id,
          client_id: 1,
          device:'android_stb'
        },
      })
        .then(e => {
          return e.data;
        })
        .catch(e => {
          console.log(e, 'toggleLikeTV');
        });
    }
  };


  const getTariffs = async () => {
    return axios({
      method: 'POST',
      url: `http://play.tvcom.uz:8008/api/tariffs?pass=@j9@LKLKK29782LLL)`,
    })
      .then(e => {
        return e.data.message;
      })
      .catch(e => {
        console.log(e, 'getTariffs');
      });
  };

  const getPromo = async (promo,phone) => {
    //const device_uid = await DeviceInfo.getMacAddress()
    return axios({
      method: 'POST',
      url: `https://mw.tvcom.uz/tvmiddleware/api/promo/activate`,
      params: {
        authkey:token,
        code: promo,
        client_id:1,
        api_key:apiKey,
        device:phone?'android':'android_stb',
        //device_uid
      },
    })
      .then(e => {
        if(typeof e.data == 'string'){
          let data = parse(e.data)
          return data.rss;
        }
        return e.data
      })
      .catch(e => {
        console.log(e, 'getPromo');
      });
  };

  const getPrice = async (tariff_id,phone) => {

    ////const device_uid = await DeviceInfo.getMacAddress()

    return axios({
      method: 'GET',
      url: `https://mw.tvcom.uz/tvmiddleware/api/customer/tariff/subscription/cost`,
      params: {
        authkey:token,
        tariff_id,
        client_id:1,
        api_key:apiKey,
        device:phone?'android':'android_stb',
        //device_uid
      },
    })
      .then(e => {
        if(typeof e.data ==='string'){
          let data = parse(e.data)
          return data.rss.price;
        }
        return e.data.price
      })
      .catch(e => {
        console.log(e, 'getPrice');
      });
  };

  const buyTariff = async (tariff_id,phone) => {
    ////const device_uid = await DeviceInfo.getMacAddress()
    return axios({
      method: 'GET',
      url: 'https://mw.tvcom.uz/tvmiddleware/api/customer/tariff/subscribe',
      params: {
        authkey:token,
        tariff_id,
        client_id:1,
        api_key:apiKey,
        device:phone?'android':'android_stb',
        //device_uid
      },
    })
      .then(e => {
        if(typeof e.data ==='string'){
          let data = parse(e.data)
          return data.rss;
        }
        return e.data
      })
      .catch(e => {
        console.log(e, 'buyTariff');
      });
  };

  const removeTariff = async (tariff_id,phone) => {
    ////const device_uid = await DeviceInfo.getMacAddress()
    return axios({
      method: 'GET',
      url: 'https://mw.tvcom.uz/tvmiddleware/api/customer/tariff/unsubscribe/',
      params: {
        authkey:token,
        tariff_id,
        client_id:1,
        api_key:apiKey,
        device:phone?'android':'android_stb',
        //device_uid
      },
    })
      .then(e => {
        if(typeof e.data ==='string'){
          let data = parse(e.data)
          return data.rss;
        }
        return e.data
      })
      .catch(e => {
        console.log(e, 'removeTariff');
      });
  };

  const lastChannels = async (phone) => {
    ////const device_uid = await DeviceInfo.getMacAddress()
    return axios({
      method: 'GET',
      url: 'https://mw.tvcom.uz/tvmiddleware/api/channel/list/last?client_id=1&device=browser',
      params: {
        authkey: token,
        client_id:1,
        api_key:apiKey,
        device:phone?'android':'android_stb',
        //device_uid
      
      },
    })
      .then(e => {
        if(typeof e.data === 'string'){
          let data = parse(e.data);
          return data.rss.channels.item;
        }else{
          return e.data.channels
        }
      })
      .catch(e => {
         console.log(e, 'lastChannels');
      });
  };
  
  const getCinema = async () => {
    return axios({
      method: 'POST',
      url: `http://play.tvcom.uz:8008/api/cinema?pass=@j9@LKLKK29782LLL)`,
    })
      .then(e => {
        return e.data.message;
      })
      .catch(e => {
        console.log(e, 'getCinema');
      });
  };

  const getBanner = async () => {
    return axios({
      method: 'POST',
      url: `http://play.tvcom.uz:8008/api/baner?pass=@j9@LKLKK29782LLL)`,
    })
      .then(e => {
        return e.data.message;
      })
      .catch(e => {
        console.log(e, 'getBanner');
      });
  };

  const getMesseges = async (phone) => {
    ////const device_uid = await DeviceInfo.getMacAddress()
    return axios({
      method: 'GET',
      url: `https://mw.tvcom.uz/tvmiddleware/api/message/list/?client_id=1`,
      params: {
        authkey: token,
        client_id: 1,
        api_key:apiKey,
        device:phone?'android':'android_stb',
        //device_uid
      },
    })
      .then(e => {

        return e.data.messages;
      })
      .catch(e => {
        console.log(e, 'getMesseges');
      });
  };

  const getCustomMesseges = async () => {
    return axios({
      method: 'POST',
      url: `http://play.tvcom.uz:8008/api/alerts?pass=@j9@LKLKK29782LLL)`,
    })
      .then(e => {
        return e.data.message;
      })
      .catch(e => {
        console.log(e, 'getCustomMesseges');
      });
  };

  const getMessegesDetail = async (uuid,phone) => {
    ////const device_uid = await DeviceInfo.getMacAddress()
    return axios({
      method: 'GET',
      url: `https://mw.tvcom.uz/tvmiddleware/api/message/detail/?client_id=1`,
      params: {
        uuid,
        authkey: token,
        client_id:1,
        api_key:apiKey,
        device:phone?'android':'android_stb',
        //device_uid
        
      },
    })
      .then(e => {
        return e.data.message;
      })
      .catch(e => {
        console.log(e, 'getMessegesDetail');
      });
  };
  

  
  const [banners,setBanners] = useState([])
  const [janrTv,setJanrTv] = useState([])

  const [channelList,setChannelList] = useState()
  const [centerMulti,setCenterMulti] = useState(true)
  const [debtStatus,setDebtStatus] = useState(false)
  const [tabBarVisible,setTabbarVisible] = useState(true)

  return (
    <Datas.Provider
      value={{
        setCenterMulti,
        centerMulti,
        setLogin,
        setToken,
        toggleLike,
        getSrc,
        checkToken,
        isLogin,
        filterOpen,
        setFilter,
        getFilms,
        getCurrentMovie,
        getJanr,
        searchFilm,
        getChannelSrc,
        getProgramListByDay,
        getTimeShift,
        getUserInfo,
        getAksiya,
        getParners,
        getDocs,
        toggleLikeTV,
        toggleLikeTV,
        navigation,
        setNavigation,
        returnRoute,
        setRoute,
        getTariffs,
        getPromo,
        getPrice,
        buyTariff,
        registration,
        registrationAbon,
        getPopular,
        removeTariff,
        lastChannels,
        getCinema,
        getBanner,
        getChannelIcons,
        getMesseges,
        getCustomMesseges,
        getMessegesDetail,
        getFilmsWithParams,
        setBanners,
        banners,
        janrTv,
        setJanrTv,
        apiKey,
        token,
        channelList,
        setChannelList,
        debtStatus,
        setDebtStatus,
        tabBarVisible,
        setTabbarVisible,
      }}>
      {children}
    </Datas.Provider>
  );
};