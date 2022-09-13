import { View, Text, StatusBar } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import { Datas } from '../../../context'
import NotFullControllerMovie from '../notFullControllerMovie'
import Orientation from 'react-native-orientation-locker';
import FullControlMovie from '../FullControlMovie'


export default function ControllerMovie({isPouse,setPouse,defaultStatus,status,video,isFullScreen,setFullScreen,loading, CloseTrailerComp,serials,next,pervius,loadData, sek, setSek, resize}) {

    const {setTabbarVisible} = useContext(Datas)
    const timerController = useRef()
    const [controllerVisible,setControllerVisible] = useState(false)
    const timer = useRef()
    const counter = useRef(0)
    const [change,setChange] = useState(false)
    const [doubleScreen,setDoubleScreen] = useState(false)
    const timerForVisibility = useRef(false)
    const [skipStatus,setSkipStatus] = useState({bool:false,change:false})
    const skipStatusTimer = useRef()
    const timerSkip = useRef()
    const skipSec = useRef(0)

    const leftSkip = async () =>{
        if(status){
            skipSec.current = skipSec.current-10
            const time = status.currentTime - skipSec.current
            clearTimeout(timerSkip.current)
            if(time<0){
                timerSkip.current = setTimeout(()=>{
                    video.current.seek(0)

                },300)
                setDoubleScreen(1)
                setChange(i=>!i)
                setSek(0)
            }else{
                timerSkip.current = setTimeout(()=>{
                    video.current.seek(time)
                },300)
                setDoubleScreen(1)
                setChange(i=>!i)
                setSek(i=>i-10)
            }

        }
    }

    useEffect(()=>{
        if(skipStatus.bool){
            clearTimeout(skipStatusTimer.current)
            skipStatusTimer.current = setTimeout(()=>{
                setSek(0)
                skipSec.current = 0
                setDoubleScreen(false)
                setSkipStatus({bool:false,change:skipStatus.change})
            },800)
        }
    },[skipStatus])

    const rightSkip = async() =>{
        if(status){
            skipSec.current = skipSec.current+10
            const time = status.currentTime + skipSec.current
            clearTimeout(timerSkip.current)
            if(time>defaultStatus.duration){
                timerSkip.current = setTimeout(()=>{
                    video.current.seek(defaultStatus.duration)
                },300)
                setDoubleScreen(2)
                setChange(i=>!i)
                setSek(0)
            }else{
                timerSkip.current = setTimeout(()=>{
                    video.current.seek(time)
                },300)
                setDoubleScreen(2)
                setChange(i=>!i)
                setSek(i=>i+10)
            }
        }
    }

    const skip = (condition) =>{
            if(!isPouse){
                counter.current = counter.current + 1
                if (counter.current % 2==0|| skipStatus.bool) {
                 
                    setSkipStatus({bool:true,change:!skipStatus.change})
                    clearTimeout(timer.current)
                    if(condition=='right'){
                        rightSkip()
                    }else{
                        leftSkip()
                    }
                    timer.current = setTimeout(() => {
                        counter.current = 0 
                    }, 300)
                } else {
                    timer.current = setTimeout(() => {
                        restartVisibility2()
                        counter.current = 0
                    }, 300)
                }
            }else{
                restartVisibility()
            }
    }

    const restartVisibility = (condition) =>{
        if(condition){
            setControllerVisible(false)
        }else{
            clearTimeout(timerController.current)
            setControllerVisible(true)
            timerController.current = setTimeout(()=>{
              setControllerVisible(false)
            },5000)
        }
    }
    const restartVisibility2 = () =>{
        clearTimeout(timerForVisibility.current)
        timerForVisibility.current = setTimeout(()=>{
            if(counter.current!=2){
                restartVisibility()
            }
        },200,counter.current)  
    }


    useEffect(()=>{
        return ()=>{
            clearTimeout(timerController.current)
        }
    },[])
    
    const rotate = ()=>{
        if(!isFullScreen){
            //hideNavigationBar()
            Orientation.lockToLandscape();
            setFullScreen(true)
            StatusBar.setHidden(true)
            setTabbarVisible(false)
        }else{
            showNavigationBar()
            Orientation.lockToPortrait();
            StatusBar.setHidden(false)
            setTabbarVisible(true)
            setFullScreen(false)
        }

    }

    

  return (
    <>  
        {isFullScreen?
        <FullControlMovie
                loading={loading}
                restartVisibility={restartVisibility}
                restartVisibility2={restartVisibility2}
                controllerVisible={controllerVisible}
                isPouse={isPouse}
                setPouse={setPouse}
                change={change}
                resize={resize}
                doubleScreen={doubleScreen}
                skip={skip}
                rotate={rotate}
                serials={serials}
                video={video}
                sek={sek}
                status={status}
                defaultStatus={defaultStatus}
                CloseTrailerComp={CloseTrailerComp}
                pervius={pervius}
                loadData={loadData}
                next={next}
        />
        :<></>}
        {!isFullScreen?
            <NotFullControllerMovie
                CloseTrailerComp={CloseTrailerComp}
                loading={loading}
                restartVisibility={restartVisibility}
                restartVisibility2={restartVisibility2}
                controllerVisible={controllerVisible}
                isPouse={isPouse}
                setPouse={setPouse}
                pervius={pervius}
                loadData={loadData}
                change={change}
                serials={serials}
                next={next}
                doubleScreen={doubleScreen}
                sek={sek}
                skip={skip}
                rotate={rotate}
                video={video}
                status={status}
                defaultStatus={defaultStatus}
            />
        :<></>}
    </>
  )
}
