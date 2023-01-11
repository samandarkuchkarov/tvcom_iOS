import React, {useContext, useEffect, useState} from 'react';
import {Datas} from '../../context';
import {ScrollView} from 'react-native';
import {globalStyles} from '../../utils/constants';
import BannerCarousel from '../../components/BannerCarousel';
import { getSubscriptionList, getPodborka, getPodborkaChannels, getChannel } from '../../Api';
import TvCarusel from '../../components/TvCarusel';
import FilmCarusel from '../../components/FilmCaruselPhone';
import ModalToken from '../../components/ModalToken/index.js';
import ModalLastDay from '../../components/ModalLastDay/index.js';
import { checkWorld } from '../../Api';


export default function Home({navigation}) {

  const {checkToken,isLogin,getCinema,getChannelIcons,token,apiKey,setToken,setLogin,getUserInfo, isWorld, setWorld} = useContext(Datas);
  
  const [change, setChange] = useState(-1);
  const [alert,setAlert] = useState(false)
  const [subscriptions,setSubscriptions] = useState(false)
  const [providerIcons,setProviderIcons] = useState()
  const [channels,setChannedls] = useState()
  const [listCarusel,setListCarusel] = useState([])
  const [dataLastDay,setDataLastDay] = useState()

  useEffect(() => {
    const fetch =async ()=>{
      const response = await checkWorld()
      console.log(response)
      if(response.message===true){
        await setWorld(false)
      }else if(response.message===false){
        await  setWorld(true)
      }else{
        setWorld(false)
      }
    }
    fetch()
    const unsubscribe = navigation.addListener('focus', async () => {
      setChange(i => {
        if (i === -1) {
          return false;
        } else {
          return !i;
        }
      });
    });

    return unsubscribe;
  }, [navigation]);

    useEffect(()=>{
    const fetch = async() => {
      const data = await getUserInfo()
      if(data){
        if(subscriptions.length){
          const currentDate = new Date().getDate()
          const date = new Date(subscriptions[0].end_date)
          const time = date.getDate()
          for(let i = time;i>time-3;i--){
            if(currentDate == i){
              if(data.monthly_payment>data.balance){
                setDataLastDay({
                  monthly_payment:data.monthly_payment,
                  balance:data.balance,
                  subscriptions
                })
              }
            }
          }
        }
      }
    }
    
    if(isLogin==1&&subscriptions){
      fetch()
    }
  },[subscriptions])

 
  useEffect(()=>{
    let render = true
    let log = isLogin

    const fetch = async()=>{
      let status = await checkToken(true);
      let subscriptions
      if(log===-1&&typeof status==='undefined'&&render){
        log = 0 
        setLogin(0)
      }

      if(status===1&&render){
        log = 1
        setLogin(1)
      }
      if(log){
        subscriptions = await getSubscriptionList(setToken,setLogin,apiKey,token,true)
        if(render&&subscriptions){
          setSubscriptions(subscriptions)
        }
      }
      if (status == 0 && render) {
        setAlert(true);
      }
      // viewed and fovorited
      // podborka
      
      if(log===1||log===0){
        if(listCarusel.length==0){
          let podborka = await getPodborka()
          if(render && podborka){
            podborka = podborka.sort((a, b) =>{ 
              let aa = a.sort?a.sort:10 
              let bb = b.sort?b.sort:10 
              return aa - bb
            })
            for(let i = 0;i<podborka.length;i++){
              if(podborka[i].params){
                let params = JSON.parse(podborka[i].params)[0]
                podborka[i].params = params
              }
            }
            setListCarusel(podborka)
          }
        }
      }

      let data = await getChannelIcons();
      let allData
      if(log){ 
        allData = await getChannel(log,token,apiKey,true,isWorld);
      }

      let podborka = await getPodborkaChannels()
      let arr = [];
      let icons = data?[...data]:[]
      if (allData && render && podborka && data) { 
        for (let i = 0; i < allData.length; i++) {
          let currentData = data&&data.filter( item => item.genre_id == allData[i].id)[0];
          
          if(!currentData){
            currentData = {
              ...allData[i],
              genre_id:allData[i].id,
              channel_id:allData[i].category_id,
              name:allData[i].name,
              img:allData[i].icon
            }
            arr.push(currentData)
          }else{
            let New = { ...allData[i] };
            New.genre_id = currentData.genre_id;
            New.channel_id = currentData.channel_id;
            New.img = currentData.img;
            arr.push(New);
            icons = icons&&icons.filter(item=>item.genre_id != New.genre_id)
          }
        }
        icons&&icons.map(i=>{
          let New = {...i}
          New.has_subscription = 0
          return New
        })
        arr = icons?[...arr,...icons]:arr

        let sorted = []

        podborka.forEach((elem,index)=>{
          let current = arr.filter(i=>i.genre_id == elem.channel_id)[0]
          sorted.push(current)
        })
        setChannedls(sorted)
  
      } else if (!allData && render && podborka && data) {
        let sorted = []
        
        podborka.forEach((elem,index)=>{
          let current = data.filter(i=>i.genre_id == elem.channel_id)[0]
          sorted.push(current)
        })
        sorted = sorted.map(i=>{
          let New = {...i}
          New.has_subscription = 0
          return New
        })
        setChannedls(sorted)
      }
    }
    if(change!==-1){
      fetch()
    }
    return ()=>{render=false}
  },[change,isLogin])
  
  
  useEffect(()=>{
    let render = true
    const fetch = async() =>{
      const providers = await getCinema()
      if(render){
        setProviderIcons(providers)
      }
    } 
    fetch()
    return () => {render = false}
  },[])

  

  return (
    <ScrollView style={globalStyles.container}>
        <BannerCarousel navigation={navigation} />
        {alert?<ModalToken navigation={navigation}/>:dataLastDay?<ModalLastDay modalData={dataLastDay} navigation={navigation} setModalData={setDataLastDay} />:<></>}
        <TvCarusel navigation={navigation} channels={channels}/> 
        {listCarusel&&listCarusel.length?
        listCarusel.map((item,index)=>(
          <FilmCarusel
            key={subscriptions?subscriptions.length+' '+item.name:item.name }
            providerIcons={providerIcons}
            index={index}
            subscriptions={subscriptions}
            navigation={navigation}
            params={item.params}
            name={item.name}
            movieContent={item.movies}
            isLogin={isLogin}
          />)):<></>
      }
      
    </ScrollView>
  );
}


