import React, { useContext, useEffect, useState, useMemo, useRef } from 'react'
import {  View, Text, Image, TouchableWithoutFeedback, BackHandler, StatusBar, TouchableOpacity,ImageBackground, Share} from 'react-native';
import { Datas } from '../../context';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './style';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Gesture,ScrollView,GestureDetector} from 'react-native-gesture-handler'
import PlayerMovie from '../../components/PlayerMovie';
import { useFocusEffect } from '@react-navigation/native';
import SerialCarusel from '../../components/SerialCarusel'
import { setVideoPosition, getSubscriptionList } from '../../Api';
import * as NavigationBar from 'expo-navigation-bar';

import ActorCarusel from '../../components/ActorsCarusel';
import RecomendedCarusel from '../../components/RecomendedCarusel';
// import ModalToken from '../../components/ModalToken';


function CurrentMovie({ navigation, route }) {
  
  const movie = route.params
  const { isLogin, getSrc, checkToken, getCurrentMovie, toggleLike, getCinema, setLogin, setToken, apiKey, token, setTabbarVisible } = useContext(Datas);
  const [serials, setSerials] = useState();
  const [seasons, setSeasons] = useState();
  const [currentSeria, setCurrentSeria] = useState();
  const [normal, setNormal] = useState(1);
  const providerId = movie.video_provider_id
  const [aviable, setAviable] = useState()
  const [trailer, setTrailer] = useState();
  const [trailerUrl, setTrailerUrl] = useState();
  const [love, setLove] = useState();
  const [alert, setAlert] = useState(false);
  const [subscriptions, setSubscriptions] = useState(false)
  const [providerIcons, setProviderIcons] = useState()
  const [cinemaName, setCinemaName] = useState('')
  const [actors,setActors] = useState()
  const [mounted,setMounted] = useState(false)
  const [change,setChange] = useState({bool:-1})
  const [name,setName] = useState('')
  const [uri,setUri] = useState()
  const [isFullScreen,setFullScreen] = useState(false)
  const [trailerShow,setTrailerShow] = useState(false)
  const scrollView = useRef()
  const [loadData,setLoadData] = useState()
  const [status,setStatus] = useState()
  const [pos,setPos] = useState({pos:0,id:0})
  const [sek,setSek] = useState(0)


  useEffect(() => {

    const fetch = async () => {
     
      const unsubscribe = navigation.addListener('focus', async () => {
        setMounted(false)
        if(isLogin===1){
          setTrailer(false)
          let status = await checkToken(true);
          if (status == 0) {
            setAlert(true);
          }
        }
        if(isLogin){
          let subscriptions = await getSubscriptionList(setToken,setLogin,apiKey,token,true)
          setSubscriptions(subscriptions)
        }
        if(scrollView.current){
          scrollView.current.scrollTo({
            options:{
              x:0,
              y:0,
              animated:true
            }
          })
        }

        if(change.bool==-1){
          setChange(()=>{
            return {
              bool:false,
            }
          })
        }else{
          setChange((old)=>{
            return {
              bool:!old.bool,
            }
          })
        }
        
        
      });
      return unsubscribe;
    };
    fetch();
  }, [navigation,isLogin]);

  useEffect(() => {

    let render = true
    const fetch = async () => {
      let providers = providerIcons;
      if(!cinemaName|| providers){
        providers = await getCinema()
        if (render) {
          setProviderIcons(providers)
          providers.map(item => {
            if (item.provider_id == providerId) {
              setCinemaName(item.provider_name)
            }
          })
        }
      }
      let aviable = true;
      let movieTariffId =  providers.filter(item2=>item2.provider_id == movie.video_provider_id&&item2.provider_id!=3)[0];
      if(movieTariffId){
        movieTariffId = movieTariffId.provider
      }
      if(movie.video_provider_id!=3&&subscriptions&&movie.video_provider_id&&!isNaN(Number(movie.video_provider_id))){ 
        aviable = subscriptions.some(i=>movieTariffId==i.tariff_id)
      }

      if(!subscriptions&&movie.video_provider_id!=3){
        if(!isNaN(Number(movie.video_provider_id))){
          aviable = false
        }
      }

      if(movie.video_provider_id==null&&subscriptions&&subscriptions.length){
        aviable = true
      }
      if(render){
        setAviable(aviable)
      }

      if(aviable){
        const data = await getCurrentMovie(movie.id,true);
        if(data&&render){
          setLove(data.is_favorited);
          if(data.actors_info&&data.actors_info&&Array.isArray(data.actors_info)){
            setActors(data.actors_info)
          }else{
            setActors([])
          }
          
        }
        if(data&&data.actions&&render){
          let action = [];
          if(data.actions&&data.actions.item){
            action = data.actions.item
          }else{
            action = data.actions
          }
          if(action&&data){
            if(data.actions){
              if(!Array.isArray(action)){
                if(name!==movie.name){
                  setSerials();
                  setSeasons();
                }
                action = [action]
              }

              const trailer = action.filter(item => item.caption == 'Trailer'||item.caption == 'Трейлер')[0];
              setTrailer(trailer);

              action = action.filter(item =>item.caption !== 'Trailer' && item.caption !== 'Подписка на фильмы'&&item.caption !== 'Трейлер');
              
              if(action&&action.length==1){
                setPos({
                  pos:data.position,
                  id:false
                })
                action = action.map(item=>{
                  let New = {...item}
                  if(item.file_id){
                    New.id = item.file_id
                  }else{
                    New.file_id = item.id
                  }
                  return New
                })
                setSerials(action);
               
                setCurrentSeria(action[0]);
              }else if(action&&action.length>1){
                setPos({
                  pos:data.position,
                  id:data.position_asset_id
                })
                if (action.every(item => item.caption.toUpperCase().includes('СЕРИЯ') && item.caption.toUpperCase().includes('СЕЗОН'))) {
                  setNormal(true)
                  let order = action.map(item => {
                    let id = item.file_id;
                    item = item.caption.split(' ');
                    item = { season: item[1], seria: item[3], id };
                    return item;
                  });
                  order = order.sort((item1, item2) => {
                    return (
                      Number(item1.season + item1.seria) -
                      Number(item2.season + item2.seria)
                    );
                  });
                  setSeasons([...new Set(order.map(item => item.season))]);

                  order = order.map(i=>{
                    let New = {...i}
                    if(i.file_id){
                      New.id = i.file_id
                    }else{
                      New.file_id = i.id
                    }
                    return New
                  })
                  setSerials(order);
                  setCurrentSeria(order[0])

                }else{
                  setNormal(false)
                  let actionWithSeason = action.map(item => {
                    item.season = 1;
                    return item;
                  });
                  
                  actionWithSeason = actionWithSeason.map(i=>{
                    let New = {...i}
                    if(i.file_id){
                      New.id = i.file_id
                    }else{
                      New.file_id = i.id
                    }
                    return New
                  })
                  setSerials(actionWithSeason);
                  setCurrentSeria(actionWithSeason[0]);

                }

              }
             
            }
          }
         
        }
      }else{
        const data = await getCurrentMovie(movie.id,true);
        setLove(data.is_favorited);
        let action = data.actions
        if(!Array.isArray(action)){
          action = [action]
        }
        const trailer = action.filter(item => item.caption == 'Trailer'|| item.caption == 'Трейлер')[0];
        setTrailer(trailer);
        setActors(data.actors_info)
        if(movie.files){
          let files = movie.files.item
          if(files&&files.length>0){
            files = files.map(item=>{
              let New = {...item}
              New.caption = item.name
              if(item.id){
                New.file_id = item.id
              }else{
                New.id = item.file_id
              }
              return New
            })
            files = files.filter(i=>i.caption!=='Trailer'&& i.caption !== 'Трейлер')
            if(files&&files.length){
              if (files.every(item => item.caption.toUpperCase().includes('СЕРИЯ') && item.caption.toUpperCase().includes('СЕЗОН'))) {
                let order = files.map(item => {
                  let id = item.file_id;
                  item = item.caption.split(' ');
                  item = { season: item[1], seria: item[3], id,file_id:id };
                  return item;
                });
                order = order.sort((item1, item2) => {
                  return (
                    Number(item1.season + item1.seria) -
                    Number(item2.season + item2.seria)
                  );
                });
              
                setSeasons([...new Set(order.map(item => item.season))]);
                setSerials(order);
                setCurrentSeria(order[0])
                setNormal(true)
              }else{
                setNormal(false)
                let serials = [...new Map(files.map(item =>[item['caption'], item])).values()]
                serials = serials.map(item=>{
                  let New = {...item}
                  if(item.file_id){
                    New.id = item.file_id
                  }else{
                    New.file_id = item.id
                  }
                  return New
                })
                setSerials(serials)
              }

            }

          }
        }
        
      }

      setMounted(true)
      setName(movie.name)
    }

    if(change.bool!==-1){
      setMounted(false)
      fetch()
    }
    return () => { render = false }
  }, [isLogin,change])

  useEffect(() => {
    let render = true;
    const fetch = async () => {
      
      const response = await getSrc({
        video_id: movie.id,
        fileId: trailer.file_id,
      },true);
      if (render) {
        setTrailerUrl(response.uri);
      }
    };
    if (trailer) {
      fetch();
    }
    return () => {
      render = false;
    };
  }, [trailer,movie,isLogin]);

  const start = async() => {
    setTrailerShow(false)
    if(currentSeria.id){
      if(pos.id&&pos.pos){ 
        setLoadData({ video_id: movie.id, fileId: pos.id })
        const response = await getSrc({ video_id: movie.id, fileId: pos.id  },true);
        setUri(response.uri)
      }else{
        setLoadData({ video_id: movie.id, fileId: currentSeria.id })
        const response = await getSrc({ video_id: movie.id, fileId: currentSeria.id},true);
        setUri(response.uri)
      }
    }else{
      setLoadData({ video_id: movie.id, fileId: currentSeria.id })
      const response = await getSrc({ video_id: currentSeria.video_id, fileId: currentSeria.file_id },true);
      setUri(response.uri)
    }
  }

  const setPosition = async() =>{
    let loadData = false
    let status = false
    let serials = false
    setSerials((old)=>{
      serials = old
      return old
    })
    setLoadData((old)=>{
      loadData = old
      return old
    })
    setStatus((old)=>{
      status = old
      return old
    })
    if(loadData&&status&&serials){
      if(serials.length>1){
        const response = await setVideoPosition({content_id:loadData.video_id,asset_id:loadData.fileId,position:status.currentTime,phone:true})
      }else{
        const response = await setVideoPosition({content_id:loadData.video_id,position:status.currentTime,phone:true})
      }
    }
  }

  const backAction = async (e) =>{

    
    return 1
    
    let isFullScreen = false
    setFullScreen((old)=>{
      if(old){
        isFullScreen = true
        return false
      }else{
        isFullScreen = false
        return false
      }
    })
    
    if(isFullScreen){
      setPosition()
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      StatusBar.setHidden(false)
      setTabbarVisible(true)
      //showNavigationBar()
      return isFullScreen
    }
   // return  false
    
  }

  useEffect(() => {
    const fetch = async () => {
      const unsubscribe = navigation.addListener('beforeRemove', backAction);
      return unsubscribe;
    };
    fetch();
  }, [navigation]);


  const toggle = async condition => {
    await toggleLike(movie.id, condition,true);
    setLove(condition);
  };
  
  const share = async() => {
    const result = await Share.share({
      title:movie.name,
      message: 'Советую посмотреть:',
      urls:['http://play.tvcom.uz/movie/' + movie.id,movie.thumbnail_big],
      failOnCancel:false
    });
  }

  const CloseTrailerComp = () =>{
    return aviable&&trailerShow? <TouchableWithoutFeedback onPress={()=>start()}>
              <View style={styles.trailerBlock}>
                <Text allowFontScaling={false}style={styles.trailerText}>Смотреть Фильм</Text>
              </View>
        </TouchableWithoutFeedback>:<></>
  } 

  const load = async (item) =>{
    if(scrollView.current){

      if(aviable&&isLogin){
        setPos({
          pos:0,
          id:0
        })
        setTrailerShow(false)
        setLoadData({ video_id: movie.id, fileId: item.id })
        const response = await getSrc({ video_id: movie.id, fileId: item.id },true);
        setUri(response.uri)
      }
      scrollView.current.scrollTo({
        options:{
          x:0,
          y:0,
          animated:true
        }
      })
    }
  }

  const SecondFunc = () =>{
    scrollView.current.scrollTo({
      options:{
        x:0,
        y:0,
        animated:true
      }
    })
  }

  useEffect(() => {
    const fetch = async () => {
      const unsubscribe = navigation.addListener('blur', async () => {
        setUri('')
        setTrailer('')
        setTrailerShow(false)
        setTrailerUrl('')
        setActors()
      });
      return unsubscribe;
    };
    fetch();
  }, [navigation]);

  const pervius = async () => {
    for (let i = 0; i < serials.length; i++) {
      if (serials[i].file_id == loadData.fileId) {
        index = i;
        break
      }
    }
    if(serials[index-1]){
      setLoadData({ video_id: movie.id, fileId: serials[index-1].file_id})
      const response = await getSrc({ video_id: movie.id, fileId: serials[index-1].file_id },true);
      setUri(response.uri)
    }
  }

  const next = async ()=>{
    for (let i = 0; i < serials.length; i++) {
      if (serials[i].file_id == loadData.fileId) {
        index = i;
        break
      }
    }
    if(serials[index+1]){
      setLoadData({ video_id: movie.id, fileId: serials[index+1].file_id})
      const response = await getSrc({ video_id: movie.id, fileId: serials[index+1].file_id },true);
      setUri(response.uri)
    }
  }




  return (

    <ScrollView  ref={scrollView} style={styles.wrapper}>
        {/* {alert?<ModalToken navigation={navigation}/>:<></>} */}
        {!uri&&!trailerShow?<ImageBackground style={styles.image} source={{uri:movie.thumbnail_big}}>
          <View style={styles.center}>
            {trailerUrl?
            <TouchableWithoutFeedback onPress={()=>setTrailerShow(true)}>
              <View style={styles.trailerBlock}>
                <Text allowFontScaling={false}style={styles.trailerText}>Смотреть Трейлер</Text>
              </View>
            </TouchableWithoutFeedback>
              :<></>}
            {isLogin&&currentSeria&&aviable?<TouchableWithoutFeedback onPress={start}>
                <View style={styles.pouseWrapper}>
                  <Image style={styles.centerIcon1} source={require('../../images/startIcon.png')}/>
                </View>
            </TouchableWithoutFeedback>:<></>}
            {!isLogin?<TouchableWithoutFeedback onPress={()=>navigation.navigate('Login')}>
                <View style={styles.login}>
                    <Text allowFontScaling={false}style={styles.loginText}>Авторизоваться</Text>
                </View>
            </TouchableWithoutFeedback>:<></>}
            {isLogin&&!aviable&&cinemaName?<TouchableWithoutFeedback onPress={()=>{
              let item = providerIcons.filter(i=>i.provider_name==cinemaName)[0]
              navigation.navigate('PodpiskaMovie',{id:item.provider})
            }}>
                <View style={styles.login}>
                    <Text allowFontScaling={false}style={styles.loginText}>Купить подписку {cinemaName}</Text>
                </View>
            </TouchableWithoutFeedback>:<></>}
          </View>
          <View style={styles.rating}>
            {movie.kinopoisk_rating&&movie.kinopoisk_rating!='0.0'?<View style={styles.ratingItem}>
                <Image source={require('../../images/rating0.png')} style={styles.ratingIcon}/>
                <Text allowFontScaling={false}style={styles.ratingText}>{movie.kinopoisk_rating}</Text>
            </View>:<></>}
            {movie.imdb_rating&&movie.imdb_rating!='0.0'?<View style={styles.ratingItem}>
                <Image source={require('../../images/rating1.png')} style={styles.ratingIcon}/>
                <Text allowFontScaling={false}style={styles.ratingText}>{movie.imdb_rating}</Text>
            </View>:<></>}
          </View>
          <LinearGradient colors={['transparent','#00000096']} style={styles.movieContainer}>
                    
          </LinearGradient>
        </ImageBackground>:<></>}

        {uri||trailerShow?<>
          <PlayerMovie
            uri={uri}
            setSek={setSek}
            sek={sek}
            position={pos}
            isFullScreen={isFullScreen}
            setFullScreen={setFullScreen}
            serials={serials}
            currentSeria={currentSeria}
            movie={movie}
            setUri={setUri}
            status={status}
            setStatus={setStatus}
            pervius={pervius}
            next={next}
            trailer={trailerUrl}
            trailerShow={trailerShow}
            CloseTrailerComp={CloseTrailerComp}
            loadData={loadData}
          />
        </>:<></>}
        {!isFullScreen?<>
          <View style={styles.contentBtns}>
                  {isLogin&&(love==1||love==0)?
                  <TouchableOpacity onPress={() =>love==0?toggle(1):toggle(0)} >
                    <View style={styles.itemContent}>
                      <Image style={styles.fovoriteIcon} source={require('../../images/save.png')}/>
                      {love==0?<Text allowFontScaling={false}style={styles.fovoriteText}>Добавить в избранное</Text>:<Text allowFontScaling={false}style={styles.fovoriteText}>Убрать из избранного</Text>}
                    </View>
                  </TouchableOpacity>
                  :<></>}
                  {isLogin?<View style={{width:5}}/>:<></>}
                  <TouchableOpacity onPress={share}>
                    <View style={styles.itemContent}>
                      <Image style={styles.fovoriteIcon} source={require('../../images/share.png')}/>
                      <Text allowFontScaling={false}style={styles.fovoriteText}>Поделиться</Text>
                    </View>
                  </TouchableOpacity>
          </View>

          <View style={styles.textBlock}>
            <Text allowFontScaling={false}style={styles.title}>
                  {movie.name}
            </Text>
            <Text allowFontScaling={false}style={styles.desc}>
              {movie&&movie.description.replaceAll('<p>','').replaceAll('&nbsp;',' ').replaceAll('</p>',' ').replaceAll('<br>',' ').replaceAll('&lt;','').replaceAll('p&gt;','').replaceAll('&amp;',' ').replaceAll('nbsp;',' ').replaceAll('/br&gt;  /',' ').replaceAll('./',' ').replaceAll('<strong>',' ').replaceAll('</strong>',' ')}
            </Text>
          </View>

          <View style={styles.serialsBlock}>
            {normal && seasons && serials?<>
              {seasons.map((i,ii) => {
                
                return <SerialCarusel pos={pos} loadData={loadData} load={load} normal={normal} data={serials.filter(item => item.season == i)} season={i} key={(ii+1000)+(loadData?loadData.fileId:1)}/>
              })}
            </>:<></>}
            {!normal&&serials?<>
              <SerialCarusel pos={pos} loadData={loadData} normal={normal} load={load} data={serials}/>
            </>:<></>}
          </View>
          <View style={styles.actorCarusel}>
            <ActorCarusel navigation={navigation} actors={actors}/>
          </View>
            {mounted?<RecomendedCarusel SecondFunc={SecondFunc} providerIcons={providerIcons} subscriptions={subscriptions} actors={actors} movie={movie}  navigation={navigation} />:<></>}
        </>:<></>}

        
    </ScrollView>

  )
}

export default CurrentMovie