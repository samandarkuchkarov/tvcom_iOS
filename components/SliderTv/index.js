import React, { useState, useEffect } from 'react'
import  Slider  from '@react-native-community/slider';
import { StyleSheet } from 'react-native';
import { getTime } from '../../Api';


export default function SliderTv({ timeData, restartVisibility, fetchTimeShift, timer, change, sliderVal, setSliderValue }) {
    
    const changePosition = (sec) =>{

      fetchTimeShift(sec)
    }

    useEffect(() => {
        setSliderValue(timer)
    }, [change])


  return (
    <>
        {timeData.begin_time&&timeData.end_time&&sliderVal?
        <Slider 
          value={(Number(sliderVal))}
          style={styles.slider}
          minimumValue={Number(timeData.begin_time)}
          maximumValue={Number(timeData.end_time)}
          key={timeData.begin_time+' ' + change + timeData.begin_time == timer}
          minimumTrackTintColor="#E41A4B"
          maximumTrackTintColor="#fff"
          onSlidingComplete={changePosition}
          thumbTintColor='#fff'
          onValueChange={()=>{restartVisibility()}}
        />:
        <></>}
    </>
  )
}
const styles = StyleSheet.create({
    slider:{
       width:'100%',
     }
   });
