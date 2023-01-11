import React, { createContext, useState } from 'react';
import axios from 'axios';
import { parse } from 'fast-xml-parser';
//import DeviceInfo from 'react-native-device-info';
import { getApiKey } from './Api';
import { getData } from './Api';
import { storeData } from './Api';
import * as Network from 'expo-network';

import * as Device from 'expo-device';


export const Datas = createContext(null);

export const ContextProvider = props => {
  const { children } = props;
  const [filterOpen, setFilter] = React.useState(false);
  const [isLogin, setLogin] = React.useState(-1);
  const [token, setToken] = React.useState(null);

  const [navigation, setNavigation] = React.useState(false);
  const [returnRoute, setRoute] = React.useState('HomePhone');
  const [apiKey,setApiKey] = React.useState()
  const [isWorld,setWorld] = useState(false)


    React.useEffect(()=>{
      getApiKey(apiKey,setApiKey)
    },[])

    React.useEffect(()=>{
      if(isLogin===0){
        setJanrTv([])
      }
    },[isLogin])






  const registration = async (phone,isPhone) => {
   const device_uid = await Network.getIpAddressAsync()
    return axios({
      method: 'GET',
      url: `https://mw.tvcom.uz/tvmiddleware/api/account/register`,
      params: {
        mobile_phone_number: phone,
        client_id: 1,
        api_key: '56JNSqNT',
        device:"ios",
        comment:isPhone?'Registration from android device new app':'Registration from android TV 2.0.2',
        send_sms:1,
        device_uid,
        device_model:Device.modelName
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
    const device_uid = await Network.getIpAddressAsync()
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

    let api_key = "56JNSqNT"
    if (isLogin !== 0 && token1) {
      if(params.genre){
        return axios({
          method: 'POST',
          url: `http://play.tvcom.uz:8008/api/genre/list`,
          data: {
            token: token1,
            ...params,
            video_provider_id:isWorld?'1,2':params.video_provider_id,
            
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
        console.log(params,1111111)
        return axios({
          method: 'GET',
          url: `https://mw.tvcom.uz/tvmiddleware/api/video/list/?client_id=1`,
          params: {
            authkey: token1,
            api_key:'56JNSqNT',
            device:'android_stb',
            device_uid,
            ...params,
            // video_provider_id:isWorld?'1,2':params.video_provider_id?params.video_provider_id:null,
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
            console.log(e.data.videos.map(i=>i.video_provider_id) )
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
            video_provider_id:isWorld?'1,2':params.video_provider_id,
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
            api_key:'56JNSqNT',
            device:'android_stb',
            device_uid,
            ...params,
            video_provider_id:isWorld?'1,2':params.video_provider_id,
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
   const device_uid = await Network.getIpAddressAsync()
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
            api_key:'56JNSqNT',
            device:'android_stb',
            device_uid,
            video_provider_id:isWorld?'1,2':null,

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
        video_provider_id:isWorld?'1,2':null
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
   const device_uid = await Network.getIpAddressAsync()
    if (isLogin) {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/video/detail/`,
        params: {
          vid: Number(id),
          authkey: token,
          device: "ios",
          client_id: 1,
          device_uid
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
          api_key: '56JNSqNT',
          device_uid
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
   const device_uid = await Network.getIpAddressAsync()
    return axios({
      method: 'GET',
      url: `https://mw.tvcom.uz/tvmiddleware/api/video/url/`,
      params: {
        vid: data.video_id,
        authkey: token,
        vfid: data.fileId,
        redirect:0,
        device:"ios",
        client_id:1,
        api_key:'56JNSqNT',
        device_uid
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
   const device_uid = await Network.getIpAddressAsync()
    if (isLogin) {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/video/list/?client_id=1`,
        params: {
          search: text,
          limit: 20,
          authkey:token,
          api_key:'56JNSqNT',
          device:'android_stb',
          device_uid,
          video_provider_id:isWorld?'1,2':null
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
          api_key:'56JNSqNT',
          device:'android_stb',
          device_uid,
          video_provider_id:isWorld?'1,2':null,
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
    
    const device_uid = await Network.getIpAddressAsync()

    if (token1) {
      return await axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/account/status/`,
        params: {
          authkey: token1,
          client_id: 1,
          device:"ios",
          device_uid,
          device_model:Device.modelName

          
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
     const device_uid = await Network.getIpAddressAsync()
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/channel/url/`,
        params: {
          cid: id,
          redirect:0,
          authkey:token,
          client_id:1,
          device:"ios",
          device_uid
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
   const device_uid = await Network.getIpAddressAsync()
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
          device:"ios",
          device_uid
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
    const time_from = new Date()
    time_from.setDate(time_from.getDate() - 6);
    const time_to	= new Date()
    time_to.setUTCHours(23,59,59,999);
    if (isLogin == 1) {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/program/list/`,
        params: {
          authkey: token,
          cid,
          client_id:1,
          api_key:'56JNSqNT',
          device:"android_stb",
          time_to:(time_to.valueOf()/1000).toFixed(0),
          time_from	:(time_from.valueOf()/1000).toFixed(0)
        },
      })
        .then(e => {
          let data
          if(typeof e.data === 'string'){
            data = parse(e.data).rss
          }else{
            data = e.data
          }
          const allData = data.programs.item?data.programs.item:data.programs
          let dates = []
          let currentDate = ''
          allData.forEach((element,index) => {
              let D = new Date(Number(element.begin_time)*1000)
              let month = (D.getUTCMonth()+1)>9?(D.getUTCMonth()+1):'0'+(D.getUTCMonth()+1)
              let day =D.getUTCDate()>9?D.getUTCDate():'0'+D.getUTCDate()
              let dateItem = month+'.'+day
              if(currentDate !== dateItem){
                  currentDate = dateItem
                  dates.push(currentDate)
              }
          });
          let result = {}
          dates.forEach((element,index) => {
              result[element] = allData.filter(program=>{
                  let D = new Date(Number(program.begin_time)*1000) 
                  let month = (D.getUTCMonth()+1)>9?(D.getUTCMonth()+1):'0'+(D.getUTCMonth()+1)
                  let day =D.getUTCDate()>9?D.getUTCDate():'0'+D.getUTCDate()
                  let dateItem = month+'.'+day
                  return dateItem===element
              })
          });
          return {data:result}
        })
        .catch(e => {
          console.log(e, 'getProgramListByDay',cid);
        });
    }
  };
  const getUserInfo = async (phone) => {
   const device_uid = await Network.getIpAddressAsync()
    if (isLogin == 1) {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/customer/info`,
        params: {
          authkey: token,
          client_id:1,
          api_key:'56JNSqNT',
          device:"android_stb",
          device_uid
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
   const device_uid = await Network.getIpAddressAsync()
    return axios({
      method: 'GET',
      url: `https://mw.tvcom.uz/tvmiddleware/api/video/settings/set`,
      params: {
        authkey: token,
        vid: id,
        is_favorited,
        client_id: 1,
        device:"ios",
        device_uid
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
   const device_uid = await Network.getIpAddressAsync()
    if (condition) {
      return axios({
        method: 'GET',
        url: `https://mw.tvcom.uz/tvmiddleware/api/settings/save/`,
        params: {
          authkey: token,
          favorite_channel: id,
          client_id: 1,
          device:"ios",
        device_uid
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
   const device_uid = await Network.getIpAddressAsync()
    return axios({
      method: 'POST',
      url: `https://mw.tvcom.uz/tvmiddleware/api/promo/activate`,
      params: {
        authkey:token,
        code: promo,
        client_id:1,
        api_key:'56JNSqNT',
        device:"ios",
        device_uid
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

    const device_uid = await Network.getIpAddressAsync()

    return axios({
      method: 'GET',
      url: `https://mw.tvcom.uz/tvmiddleware/api/customer/tariff/subscription/cost`,
      params: {
        authkey:token,
        tariff_id,
        client_id:1,
        api_key:'56JNSqNT',
        device:"ios",
        device_uid
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
    const device_uid = await Network.getIpAddressAsync()
    return axios({
      method: 'GET',
      url: 'https://mw.tvcom.uz/tvmiddleware/api/customer/tariff/subscribe',
      params: {
        authkey:token,
        tariff_id,
        client_id:1,
        api_key:'56JNSqNT',
        device:"ios",
        device_uid
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
    const device_uid = await Network.getIpAddressAsync()
    return axios({
      method: 'GET',
      url: 'https://mw.tvcom.uz/tvmiddleware/api/customer/tariff/unsubscribe/',
      params: {
        authkey:token,
        tariff_id,
        client_id:1,
        api_key:'56JNSqNT',
        device:"ios",
        device_uid
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
    const device_uid = await Network.getIpAddressAsync()
    return axios({
      method: 'GET',
      url: 'https://mw.tvcom.uz/tvmiddleware/api/channel/list/last?client_id=1&device=browser',
      params: {
        authkey: token,
        client_id:1,
        api_key:'56JNSqNT',
        device:"ios",
        device_uid
      
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
    const device_uid = await Network.getIpAddressAsync()
    return axios({
      method: 'GET',
      url: `https://mw.tvcom.uz/tvmiddleware/api/message/list/?client_id=1`,
      params: {
        authkey: token,
        client_id: 1,
        api_key:'56JNSqNT',
        device:"ios",
        device_uid
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
    const device_uid = await Network.getIpAddressAsync()
    return axios({
      method: 'GET',
      url: `https://mw.tvcom.uz/tvmiddleware/api/message/detail/?client_id=1`,
      params: {
        uuid,
        authkey: token,
        client_id:1,
        api_key:'56JNSqNT',
        device:"ios",
        device_uid
        
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
        isWorld,
        setWorld
      }}>
      {children}
    </Datas.Provider>
  );
};
