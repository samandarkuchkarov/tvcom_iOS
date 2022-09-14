import React,{useContext, useState, useEffect } from 'react'
import { ActivityIndicator, View, Dimensions } from 'react-native'
import PlayerChannel from '../../components/PlayerChannel'
import TimeShift from '../../components/TimeShift'
import { getTime } from '../../Api';
import {Datas} from '../../context'
const {height,width} = Dimensions.get('window');

const isTab =  height<width;
function CurrentTv({navigation,route}) {
    const channel = route.params


    const [allProgram,setAllProgram] = useState()
    const [programData, setProgramData] = useState();
    const [isFullScreen,setFullScreen] = useState(false)
    const [timeData,setTimeData] = useState({begin_time:false})
    const { getChannelSrc, getTimeShift, checkToken, isLogin } = useContext(Datas)
    const [uri,setUri] = useState()
    const [timer,setTimer] = useState(0)
    const [live,setLive] = useState(true)
    const [change,setChange] = useState(false)
    const [disableTimeShift,setDisableTimeShift] = useState(false)
    const [currentChannel,setCurrentChannel] = useState()
    const [alert,setAlert] = useState(false)
    const [tabFullScreen,setTabFullScreen] = useState(false)

    const fetchTimeShift = async (begin_time) => {
      let currentTime = await getTime();
      if (begin_time > currentTime) {
        
          const data ={uri: await getChannelSrc(timeData.cid,true)}
          setUri(data.uri);
          setTimer(currentTime);
          setLive(true)
          setChange(i=>!i)
          return;
      }
      
      const data = await getTimeShift(timeData.cid,begin_time,true);
  
      if(data&&data.uri){
        setLive(false)
        setUri(data.uri);
        setTimer(begin_time);
        setDisableTimeShift(false)
      }
    };

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
    <View style={{flex:1,backgroundColor:'#010101'}}>
        {alert?<ModalToken navigation={navigation}/>:<></>}

        {!uri?<View style={{height:height-100,justifyContent:'center'}}>
        <ActivityIndicator size={'large'} color='#fff'/>
        </View>:<></>}

        <PlayerChannel 
          fetchTimeShift={fetchTimeShift}
          uri={uri} 
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
          setUri={setUri} 
          timer={timer} 
          setTimer={setTimer} 
          setLive={setLive} 
          live={live} 
          change={change}
          setChange={setChange} 
          timeData={timeData} 
          setTimeData={setTimeData} 
          isFullScreen={isFullScreen} 
          setFullScreen={setFullScreen} 
          programData={programData} 
          setProgramData={setProgramData} 
          allProgram={allProgram} 
          setAllProgram={setAllProgram} 
          navigation={navigation} 
          disableTimeShift={disableTimeShift}
          setDisableTimeShift={setDisableTimeShift}
          channel={channel}
          tabFullScreen={tabFullScreen}
          setTabFullScreen={setTabFullScreen}
          />
        {!isFullScreen&&!tabFullScreen?
        <TimeShift
          programData={programData}
          timeData={timeData}
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
          fetchTimeShift={fetchTimeShift}
        />:<></>}
    </View>
  )
}

export default CurrentTv