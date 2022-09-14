import React, { useEffect, useState } from 'react'
import  Slider  from '@react-native-community/slider';

export default function SliderMovie({defaultStatus,restartVisibility,video,status,change,loading}) {
    
    const [sliderVal,setSliderValue] = useState(0)

    const changePosition = (sec) =>{
        if(video.current){
            video.current.playFromPositionAsync(sec)
        }
    }

    useEffect(()=>{
        if(status){
            setSliderValue(status.currentTime)
        }
    },[change])
  
    return (
    <>
        {defaultStatus?<Slider 
        value={(Number(sliderVal))}
        style={{width:'100%'}}
        disabled={loading}
        minimumValue={0}
        key={change}
        maximumValue={defaultStatus.duration}
        minimumTrackTintColor="#E41A4B"
        maximumTrackTintColor="#fff"
        onSlidingComplete={changePosition}
        thumbTintColor='#fff'
        onValueChange={()=>{restartVisibility()}}
        />:<></>}
    
    </>
  )
}
