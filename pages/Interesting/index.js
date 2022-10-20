import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import {globalStyles} from '../../utils/constants';
import ModalToken from '../../components/ModalToken';
import { Datas } from '../../context';
import BannerCarousel from '../../components/BannerCarousel';
import { listCaruselName, MainScreenParamsIfLogin } from '../../helper';
import { getSubscriptionList } from '../../Api';
import FilmCaruselPhone from '../../components/FilmCaruselPhone';
import styles from './style';

export default function Interesting({navigation}) {

  const {checkToken, isLogin, setToken, setLogin, apiKey, token, getCinema, getFilms } = useContext(Datas)
  const [alert,setAlert] = useState(false)
  const [data,setData] = useState(false)
  const [change,setChange] = useState(-1)
  const [subscriptions,setSubscription] = useState()
  const [providerIcons,setProviderIcons] = useState()
  const [refreshing,setRefreshing] = useState(false)
  
  useEffect(() => {
    const fetch = async () => {
      const unsubscribe = navigation.addListener('focus', async () => {
        setChange(i => {
          if (i === -1) {
            return false;
          } else {
            return !i;
          }
        });
        if(isLogin){
          let status = await checkToken(true);
          if (status == 0) {
            setAlert(true);
          }

        }
      });
      return unsubscribe;
    };
    fetch();
  }, [navigation]);

  useEffect(()=>{
    const fetch = async() => {
      let render = true
      if(isLogin){
        let subscriptions = await getSubscriptionList(setToken,setLogin,apiKey,token,true)
        if(render){
          setSubscription(subscriptions)
        }
        
        let content = [...listCaruselName]
        for(let i = 0;i<MainScreenParamsIfLogin.length;i++){
          const movie = await getFilms(MainScreenParamsIfLogin[i]);
          content[i].movies = movie?movie:[];
          content[i].params = MainScreenParamsIfLogin[i];
        }
        content = content.filter(i=>i.movies)
        if(render){
          setData(content)
        }
      }


    }
    if(change!==-1){
      fetch()
    }
    return ()=>{render = false}
  },[change])

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
  
  const onRefresh = async() =>{
    setRefreshing(true)
    if(isLogin){
      let subscriptions = await getSubscriptionList(setToken,setLogin,apiKey,token,true)

      setSubscription(subscriptions)

      
      let content = [...listCaruselName]
      for(let i = 0;i<MainScreenParamsIfLogin.length;i++){
        const movie = await getFilms(MainScreenParamsIfLogin[i]);
        content[i].movies = movie?movie:[];
        content[i].params = MainScreenParamsIfLogin[i];
      }
      content = content.filter(i=>i.movies)
      setData(content)
    }
    setRefreshing(false)
  }

  return (
    <ScrollView 
    refreshControl={<RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />}
    style={globalStyles.container}>
      {alert?<ModalToken navigation={navigation}/>:<></>}
      <BannerCarousel navigation={navigation}/>

      {!isLogin?<>
        <View style={styles.emptyBlock}>
          <Text allowFontScaling={false}style={styles.text}>Войдите или зарегистрируйтесь чтобы не потерять любимые фильмы</Text>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <View style={styles.emptyBtn}>
            <Text allowFontScaling={false}style={styles.text}>Войти</Text>
          </View>
        </TouchableOpacity>
      </>:<></>}
      {isLogin&&data==false?<>
        <View style={styles.emptyBlock}>
          <Text allowFontScaling={false}style={styles.text}>Здесь будет ваша история просмотров и понравившиеся вам фильмы</Text>
        </View>
      </>:isLogin&&data.length&&data[0].movies.length==0&&data[1].movies.length==0?<>
        <View style={styles.emptyBlock}>
          <Text allowFontScaling={false}style={styles.text}>Здесь будет ваша история просмотров и понравившиеся вам фильмы</Text>
        </View>
      </>:<>
      <View style={{marginTop:10}}/>
      {isLogin&&data.length?<>
        {data.map((item,index)=>{
          return(
            item.movies.length?<FilmCaruselPhone 
            key={subscriptions?subscriptions.length+' '+item.name:item.name }
            providerIcons={providerIcons}
            index={index}
            subscriptions={subscriptions}
            navigation={navigation}
            params={item.params}
            name={item.name}
            movieContent={item.movies}
            isLogin={isLogin}
            />:<></>
          )
        })}
      </>:<></>}
      </>}
    </ScrollView>
  );
}
