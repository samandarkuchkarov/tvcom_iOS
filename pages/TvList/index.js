import React, { useContext,useState,useEffect,useRef } from 'react'
import { View, Text, Dimensions, Animated, TouchableWithoutFeedback, Image, ActivityIndicator } from 'react-native'
import { globalStyles } from '../../utils/constants'
import { Datas } from '../../context';
import { getChannel, getFullChannels, getTime, getSubscriptionList } from '../../Api';
import styles from './styles';
import { converter } from '../../helper';
import TvJanrCarusel from '../../components/TvJanrCarusel';
import ModalToken from '../../components/ModalToken';

const {width} = Dimensions.get('window');

export default function TvList({navigation}) {

    const { isLogin,janrTv,setJanrTv,token,apiKey,lastChannels,getJanr,toggleLikeTV, checkToken, setToken, setLogin, isWorld } = useContext(Datas)

    const [tvlist,setTvlist] = useState({all:[],filtered:[]})
    const [mounted,setMounted] = useState(false)
    const [janres, setJanres] = useState();
    const [time,setTime] = useState(0)
    const [selectedJanrId,setSelectedJanrId] = useState(false)
    const [alert,setAlert] = useState(false)
    const [subscriptions, setSubscriptions] = useState(-1)
    const scrollY = useRef(new Animated.Value(0)).current

    const love = async(condition,item) => {
      setTvlist((old)=>{
        let oldAll = []
        let oldFiltered = []
        oldAll =  old.all.map((i,index)=>{
            let New = {...i}
            if(i.id == item.id){
              New.is_favorited = i.is_favorited==1?0:1
            }
            return New
        })
        oldFiltered =  old.filtered.map((i)=>{
          let New = {...i}
          if(i.id == item.id){
            New.is_favorited = i.is_favorited==1?0:1
          }
          return New
        })
        const a = {
          all:oldAll,
          filtered:oldFiltered
        }
        return a
      })
      await toggleLikeTV(!condition, item.genre_id,true);
    }

    useEffect(() => {
      let render = true;
      const fetch = async () => {
        
        let data = await getFullChannels(isWorld);
        let allData;
        if(isLogin===1){
          allData = await getChannel(isLogin,token,apiKey,true,isWorld);
        }
  
        let arr = [];
        let icons = [...data]
        
        if (allData && render) {
          for (let i = 0; i < allData.length; i++) {
            let currentData = data.filter( item => item.id == allData[i].id)[0];
            
            if(!currentData){
              currentData = {
                ...allData[i],
                genre_id:allData[i].id,
                channel_id:allData[i].category_id,
                name:allData[i].name,
                icon:allData[i].icon
              }
              arr.push(currentData)
            }else{
              let New = { ...allData[i] };
              New.genre_id = currentData.id;
              New.channel_id = currentData.category_id;
              New.name = currentData.name;
              New.icon = currentData.icon;
              arr.push(New);
              icons = icons.filter(item=>item.id != New.id)
            }
          }
          icons = icons.map(item=>{
            let New = {...item}
            New.has_subscription = 0
            return New
          })
          arr = [...arr,...icons]
          arr = arr.sort((a, b) => Number(a.channel_sort) - Number(b.channel_sort));
          setTvlist({
            all: arr,
            filtered: arr,
          });
  
        } else if (!allData && render) {
          data = data.map(i=>{
            let New = {...i}
            New.has_subscription = 0
            return New
          })
          setTvlist({
            all: data,
            filtered: data,
          });
        }
  
        let defaultJanr = janrTv
        
        if(defaultJanr.length==0){
          let janres = await getJanr();
          setJanrTv(janres)
          defaultJanr = janres
        }
        defaultJanr = defaultJanr.filter(item => item.janrTv);
        defaultJanr.reverse();      
  
        if (render) {
          setJanres(defaultJanr);
          setMounted(true)
        }
  
        
      };
  
      if (isLogin == 1 || isLogin == 0) {
        if(subscriptions!=-1){
          fetch();
        }
      }
      return () => {
        render = false;
      };
    }, [isLogin,subscriptions]);

    useEffect(() => {

      const unsubscribe = navigation.addListener('focus', async () => {
          const time = await getTime()
          if(time){
            setTime(time)
          }    
          let subscriptions = await getSubscriptionList(setToken,setLogin,apiKey,token,true)
          setSubscriptions(subscriptions)
      });
  
      return unsubscribe;
      
    }, [navigation,]);
  
  
    const renderItem = ({item,index}) => {
      const length = width-142-50
      const begin = Number(item.program_begin_time)
      const end = Number(item.program_end_time)
      const sum = end - begin
      const current = (end - time)
      let X =  width-142-50

      if(begin!=0&&end!=0){
        X = Math.floor((current*length)/sum)
      }
      

      const inputRange = [-1,0,95*index,95*(index+2)]
      const OpacityinputRange = [-1,0,95*index,95*(index+0.5)]
      const scale = scrollY.interpolate({
          inputRange,
          outputRange:[1,1,1,0]
      })
      const opacity = scrollY.interpolate({
          inputRange:OpacityinputRange,
          outputRange:[1,1,1,0]
      })

      const Press = (item) =>{
          if(isLogin){
            if(item.has_subscription==1){
              navigation.navigate('CurrentTv',item)
            }else{
              navigation.navigate('PodpiskaTv',item)
            }
          }else{
            navigation.navigate('Login')
          }
      }

      return  <TouchableWithoutFeedback onPress={()=> Press(item)}>
                <Animated.View style={{...styles.item,transform:[{scale:scale}],opacity:opacity}}>
                      <View style={{...styles.imageWrapper}}>
                         {isLogin&&item.has_subscription==0?
                          <View style={styles.lockWrapper}>
                             <Image style={styles.lock} source={require('../../images/lock.png')}/>
                          </View>
                            :<></>}
                          <Image 
                            style={styles.icon}
                            source={{ 
                              uri:item.icon
                            }}/>
                      </View>
                      <View style={styles.textBlock}>
                          <Text allowFontScaling={false}numberOfLines={2} style={styles.program_name}>{item.program_name?item.program_name:item.name}</Text>
                          <View style={styles.loveBlock}>
                            <Text allowFontScaling={false}style={styles.time}>{converter(item.program_begin_time)}-{converter(item.program_end_time)}</Text>
                            {isLogin==1?<TouchableWithoutFeedback onPress={()=>love(item.is_favorited==1,item)}>
                              <Image style={styles.love} source={item.is_favorited==1?require('../../images/loveTv1.png'):require('../../images/loveTv0.png')}/>
                            </TouchableWithoutFeedback>:<></>}
                          </View>
                          <View style={styles.processBlock}>
                            <View style={{...styles.redLine,width:X}}></View>
                          </View>
                      </View>
                </Animated.View>
              </TouchableWithoutFeedback>
    }

    useEffect(() => {
      
      if(selectedJanrId&&Number(selectedJanrId)>0){
        setTvlist((old)=>{
          return {
            all:old.all,
            filtered:old.all.filter(i=>i.category_id == selectedJanrId)
          }
        })
      }else if(!selectedJanrId){
        setTvlist((old)=>{
          return {
            all:old.all,
            filtered:old.all
          }
        })
      }else if(selectedJanrId==-1){
        setTvlist({
          all: tvlist.all,
          filtered: tvlist.all.filter(i=>i.is_favorited==1),
        });
      }else if(selectedJanrId==-2){
        const fetch = async()=>{
          const channels = await lastChannels();
          if (channels.length) {
            let arr = [];
            for (let i = 0; i < channels.length; i++) {
              arr.push(tvlist.all.filter(item => item.genre_id == channels[i].id)[0]);
            }
            setTvlist({
              all: tvlist.all,
              filtered: arr.filter(i => i),
            });
          } else {
            setTvlist({
              all: tvlist.all,
              filtered: [],
            });
          }
        } 

        fetch()
      }
    }, [selectedJanrId])
    
    useEffect(() => {
      const fetch = async () => {
        const unsubscribe = navigation.addListener('focus', async () => {
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
    
    return (
        <View style={globalStyles.container}>
          {alert?<ModalToken navigation={navigation}/>:<></>}
          {janres&&janres.length&&tvlist.filtered.length?<>
            {janres&&janres.length?<TvJanrCarusel isLogin={isLogin} data={janres} setSelectedJanrId={setSelectedJanrId} selectedJanrId={selectedJanrId}/>:<></>}
            {tvlist.filtered?
              <Animated.FlatList
                  onScroll={Animated.event([{nativeEvent:{contentOffset:{y:scrollY}}}],{useNativeDriver:true})}
                  renderItem={renderItem}
                  data={tvlist.filtered}
                  keyExtractor={item => item.id + ' ' + item.is_favorited + ' ' + item.has_subscription}
              />:<></>}
          </>:<>
          <View style={styles.center}>
              <ActivityIndicator size='large' color='#fff' />
          </View>
          </>}
        </View>
    )
}
