import React, { useContext, useRef, useState, useEffect } from 'react'
import styles from './style'
import { View, Text, Dimensions } from 'react-native'
import { Datas } from '../../context';
import { Video } from 'expo-av';
import ControllerMovie from '../ControllerMovie';
const { width, height } = Dimensions.get('window');
import { Audio } from 'expo-av'


export default function PlayerMovie({ serials, pervius, uri, isFullScreen, setFullScreen,trailerShow, trailer, CloseTrailerComp, status,setStatus, position, loadData, next, sek, setSek }) {

    const video = useRef()
    const [isPouse, setPouse] = useState(false);
    const [loading, setLoading] = useState(true);

    const [defaultStatus, setDeafaultStatus] = useState(null);
    const [resizeMode,setResizeMode] = useState('contain')
    
    const onProgress = e => {
        setStatus(e);
        setLoading(false);
    };
    useEffect(() => {
      Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
    }, [])
    useEffect(()=>{
      if(video.current&&uri){
        if(position.id){
          if(position.id == loadData.fileId){
            video.current.playFromPositionAsync(position.pos)
          }
        }else{
          video.current.playFromPositionAsync(position.pos)
        }
      }
    },[video,uri])
    
    const resize = (e) =>{
      if(e.velocity>0){
        setResizeMode('cover')
      }else if(e.velocity<0){
        setResizeMode('contain')
      }
    }

  return (
    <>
    <View style={{height:isFullScreen?width>height?height:width:width/1.77,width:isFullScreen?width>height? width:height:width,zIndex:3}}>
        <Video
          ref={video}
          source={{ uri:trailerShow?trailer:uri, type: trailerShow?trailer.includes('m3u8') ? 'm3u8' : 'mp4'  :uri.includes('m3u8') ? 'm3u8' : 'mp4' }}
          style={{height:isFullScreen?width>height?height:width:width/1.77,width:isFullScreen?width>height? width:height:width}}
          shouldPlay={false}
          volume={1}
          isMuted={false}
          // onEnd={nextLoad}
          useNativeControls
          resizeMode={resizeMode}
        />
    </View>
    </>
  )
}
