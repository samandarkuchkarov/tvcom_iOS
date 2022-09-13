import React, { useContext, useEffect, useState } from 'react'
import { TouchableWithoutFeedback, View, Dimensions, Image, Text } from 'react-native'
import styles from './style'
import SliderTv from '../SliderTv';
import { Datas } from '../../../context';
import { getTime } from '../../../Api';
import {converter} from '../../../helper'
import NotFullControll from '../notFullControll';
import FullControll from '../fullControll';


const {width,height} = Dimensions.get('window');


export default function ControllerTV({rotate, isFullScreen, isPouse, setPouse, setControllerVisible, controllerVisible, timerController, timeData, setLive, setUri, setTimer, setTimeData, disableTimeShift , timer, live, programData, nextProgram,lastProgram, setLastProgram, setNextProgram, fetchTimeShift, change, setChange }) {
  
  const { getChannelSrc } = useContext(Datas)
  const [sliderVal,setSliderValue] = useState(timer)

  const restartVisibility = () =>{
    clearTimeout(timerController.current)
    setControllerVisible(true)
    timerController.current = setTimeout(()=>{
      setControllerVisible(false)
    },5000)
  }


  const openLive = async () =>{
    restartVisibility()
    let currentTime = await getTime();
    const data ={uri: await getChannelSrc(timeData.cid,true)}
    setUri(data.uri);
    setTimer(currentTime);
    setLive(true)
    
    setChange(i=>!i)
  }

  useEffect(()=>{
    return()=>{
      clearTimeout(timerController.current)
    }
  },[])
  const findPos = async condition => {
    restartVisibility()
    if (programData&&programData.data) {
        const date = Object.keys(programData.data);
        const sectionList = [];
        for (let i = 0; i < date.length; i++) {
          let array = programData.data[date[i]].map(item => {
            item.date = date[i];
            return item;
          });
          sectionList.push(...array);
        }
        
        for(let i = 0;i<sectionList.length;i++){
            if(timeData.rpg.begin_time == sectionList[i].begin_time){
               if(condition=='left'){
                 if(sectionList[i-1]){
                  
                  if(sectionList[i-2]){
                    setLastProgram(sectionList[i-2])
                  }
                  if(sectionList[i]){
                    setNextProgram(sectionList[i])
                  }
                  setTimeData({
                    begin_time:sectionList[i-1].begin_time,
                    end_time:sectionList[i-1].end_time,
                    cid:timeData.cid,
                    rpg:sectionList[i-1]
                  })
                  setTimer(Number(sectionList[i-1].begin_time))
                  fetchTimeShift(Number(sectionList[i-1].begin_time))
                  setSliderValue(Number(sectionList[i-1].begin_time))
                  setChange(i=>!i)
                }      
               }else{
                  if(sectionList[i+1]){
                    if(sectionList[i+2]){
                      setLastProgram(sectionList[i+2])
                    }
                    if(sectionList[i]){
                      setNextProgram(sectionList[i])
                    }
                    setTimeData({
                      begin_time:sectionList[i+1].begin_time,
                      end_time:sectionList[i+1].end_time,
                      cid:timeData.cid,
                      rpg:sectionList[i+1]
                    })
                    setTimer(Number(sectionList[i+1].begin_time))
                    fetchTimeShift(sectionList[i+1].begin_time)
                    setSliderValue(sectionList[i+1].begin_time)
                    setChange(i=>!i)
                  }
               }
            }
        }
    }
  };

  const restart = async () => { 
    setTimer(timeData.rpg.begin_time)
    setChange(i=>!i)
    await fetchTimeShift(timeData.rpg.begin_time)
  }

  return (
    <>
      {isFullScreen?
      <FullControll 
          timeData={timeData} 
          fetchTimeShift={fetchTimeShift} 
          live={live} 
          timer={timer} 
          restart={restart}
          restartVisibility={restartVisibility} 
          controllerVisible={controllerVisible} 
          openLive={openLive} 
          isPouse={isPouse} 
          findPos={findPos} 
          setPouse={setPouse} 
          rotate={rotate} 
          change={change} 
          sliderVal={sliderVal} 
          nextProgram={nextProgram}
          lastProgram={lastProgram}
          disableTimeShift={disableTimeShift}
          setSliderValue={setSliderValue}/>
      :<></>}

      {!isFullScreen?<>
        <NotFullControll 
          timeData={timeData} 
          fetchTimeShift={fetchTimeShift} 
          live={live} 
          timer={timer} 
          restart={restart}
          restartVisibility={restartVisibility} 
          controllerVisible={controllerVisible} 
          openLive={openLive} 
          isPouse={isPouse} 
          disableTimeShift={disableTimeShift}
          findPos={findPos} 
          setPouse={setPouse} 
          rotate={rotate} 
          change={change} 
          sliderVal={sliderVal} 
          setSliderValue={setSliderValue}/>
      </>:<></>}
      
    
    </>
  )
}
