import React, { useContext, useRef, useState, useCallback, useEffect } from 'react'
import styles from './style'
import { Image, TouchableWithoutFeedback, View, BackHandler, Text } from 'react-native'
import { Datas } from '../../../context';
import ControllerTV from '../ControllerTV';
import Orientation from 'react-native-orientation-locker';
import { StatusBar,Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import VideoPlayer from '../../../components/VideoPlayer';
import { getFullChannels, getChannel, getTime } from '../../../Api';
import FastImage from 'react-native-fast-image'

const { width, height } = Dimensions.get('window');

export default function PlayerChannel({channel,programData,setProgramData,allProgram,setAllProgram,isFullScreen,setFullScreen,timeData,setTimeData,setLive,live,change,setChange,timer,setTimer,disableTimeShift, setDisableTimeShift,fetchTimeShift,uri,setUri,setCurrentChannel,currentChannel}) {
    const video = useRef()
    const [isPouse,setPouse] = useState(false)
    const { getChannelSrc, setTabbarVisible, isLogin, token, apiKey, getProgramListByDay,getTimeShift } = useContext(Datas)
    const [currentId,setCurrentId] = useState()
    const [channelList,setChannelList] = useState({
      all:[],
      filtered:[]
    })
    const [controllerVisible,setControllerVisible] = useState(false)
    const timerController = useRef()
    const timerPrograms = useRef()
    const [lastProgram,setLastProgram] = useState()
    const [nextProgram,setNextProgram] = useState()

    useEffect(() => {
      if (timer) {
        const interval = setInterval(() => {
          if (!isPouse) {
            setTimer(i => {
              return Number(i) + 5;
            });
          }
        }, 5000,isPouse);
        return () => clearInterval(interval);
      }
    }, [timeData.begin_time,isPouse]);
    
    const start = async() =>{  
      await getChannelList();
      setControllerVisible(true)
      setCurrentId(channel.id)
      clearTimeout(timerController.current)
      timerController.current = setTimeout(()=>{
        setControllerVisible(false)
      },5000)
    }

    useEffect(()=>{
      start()
    },[channel])

    const getChannelList = async() => {
        let data = await getChannel(isLogin,token,apiKey,true);
        let icons = await getFullChannels()
        if(data&&icons){
          for(let i = 0;i<data.length;i++){
            icons = icons.filter(item=>item.id!=data[i].id)
          }
          icons = icons.map(item=>{
            let New = {...item}
            New.has_subscription = 0
            return New
          })
          
          if (data && data.length ) {
            data = [...data,...icons]
            data = data.sort((a, b) => Number(a.channel_sort) - Number(b.channel_sort));         
            setChannelList({
              all: data,
              filtered: data,
            });
          }

        }
    }


    React.useEffect(() => {
      let render = true;
      const fetch = async () => {
        
        const current = channelList.all.filter(item => item.id == currentId)[0];
        setCurrentChannel(current)
        setLive(true)

        if (current.has_subscription) {
          if(current.program_id){
            let time = await getTime() 
            const data ={uri: await getChannelSrc(current.id,true)}
            
            if(render&&data.uri){
              setTimer(time);
              setUri(data.uri);
              setLive(true)
              if(current.program_id){
                setDisableTimeShift(false)
                setTimeData({
                  begin_time:current.program_begin_time,
                  end_time:current.program_end_time,
                  cid:current.id,
                  rpg:{
                    id: current.program_id,
                    description:current.program_description,
                    begin_time:current.program_begin_time,
                    end_time:current.program_end_time,
                    name:current.program_name,
                    preview:current.program_preview_url
                  },
                });
              }else{
                setTimer(time);
                setUri(data.uri);
                setLive(true)
                setDisableTimeShift(true)
                setTimeData({
                  begin_time:false,
                });
              }
            }
          }else{
            setDisableTimeShift(true)
            const data ={uri: await getChannelSrc(current.id,true)}
            setUri(data.uri);
            setLive(true)
          }
        }
      };
      if(isLogin==1&&currentId&&channelList.all&&channelList.all.length){
        fetch()
        
      }
      
      
      return () => {
        render = false;
      };
    }, [currentId,channelList.all]);


    const rotate = ()=>{
        if(!isFullScreen){
            Orientation.lockToLandscape();
            setFullScreen(true)
            StatusBar.setHidden(true)
            setTabbarVisible(false)
        }else{
            Orientation.lockToPortrait();
            StatusBar.setHidden(false)
            setTabbarVisible(true)
            setFullScreen(false)
        }

    }

    const backAction = () =>{
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
          Orientation.lockToPortrait();
          StatusBar.setHidden(false)
          setTabbarVisible(true)
          setFullScreen(false)
          return isFullScreen
        }
        
    }

    useFocusEffect(
        useCallback(() => {
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
          );
          return () => {
            backHandler.remove();
          };
        }, []),
    );


    useEffect(()=>{
      let render = true
      const fetch = async() => {
        if(timeData.cid){
          clearTimeout(timerPrograms.current)
          
          timerPrograms.current = setTimeout(async()=>{
            let programData = await getProgramListByDay(timeData.cid,true);
            if(render&&programData&&programData.data){
              setProgramData(programData);
              const date = Object.keys(programData.data);
              const sectionList = [];
              for (let i = 0; i < date.length; i++) {
                let array = programData.data[date[i]].map(item => {
                  item.date = date[i];
                  return item;
                });
                sectionList.push(...array);
              }
              setAllProgram(sectionList)
            }
  
          },1000)
        }
      }
      fetch()
      return ()=>{
        render=false
        clearTimeout(timerPrograms.current)
      }
    },[timeData.cid])

    useEffect(()=>{
      if(allProgram){
        allProgram.forEach((item,index)=>{
        let aviable = item.begin_time < timer && item.end_time > timer
          if(aviable){
            setTimeData({
              begin_time:item.begin_time,
              cid:timeData.cid,
              end_time:item.end_time,
              rpg:item,
            });
            if(allProgram[index-1]){
              setLastProgram(allProgram[index-1])
            }
            if(allProgram[index+1]){
              setNextProgram(allProgram[index+1])
            }

          }
        })
      }
    },[timer,allProgram])

  return (
    <View style={{backgroundColor:'#010101'}}>

        {uri ?
        <View style={styles.wrapperVideo}>
            <VideoPlayer
                ref={video} 
                style={{height:isFullScreen?width>height?height:width:width/1.77,width:isFullScreen?width>height? width:height:width}}
                autoPlay={false} 
                paused={isPouse}  
                source={uri}
            />
            <ControllerTV disableTimeShift={disableTimeShift} fetchTimeShift={fetchTimeShift} change={change} setChange={setChange} setLastProgram={setLastProgram} setNextProgram={setNextProgram} nextProgram={nextProgram} lastProgram={lastProgram} programData={programData} live={live} timer={timer} setTimeData={setTimeData} setLive={setLive} setDisableTimeShift={setDisableTimeShift} setUri={setUri} setTimer={setTimer} timeData={timeData} setControllerVisible={setControllerVisible} controllerVisible={controllerVisible} timerController={timerController} isPouse={isPouse} setPouse={setPouse}  isFullScreen={isFullScreen} rotate={rotate} />
        </View>
       : 
        <></>
      }
      {!isFullScreen&&timeData.rpg?<>
        <View style={styles.channelInfo}>
            <View style={styles.nameBlock}>
                {timeData.rpg.preview&&timeData.rpg.preview.length?<FastImage style={styles.icon} source={{uri:timeData.rpg.preview}}/>:currentChannel?<FastImage style={styles.icon} source={{uri:currentChannel.icon}}/>:<></>}
                <View>
                  <Text allowFontScaling={false}numberOfLines={2} style={styles.name}>{timeData.rpg.name}</Text>
                  <Text allowFontScaling={false}numberOfLines={3} style={styles.desc}>{currentChannel.program_description}</Text>
                </View>
            </View>
        </View>
      </>:<></>}

    </View>
  )
}