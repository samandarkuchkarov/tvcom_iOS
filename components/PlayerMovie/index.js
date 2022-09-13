import React, { useContext, useRef, useState, useEffect } from 'react'
import styles from './style'
import { View, Text, Dimensions } from 'react-native'
import { Datas } from '../../../context';
import Video from 'react-native-video';
import ControllerMovie from '../ControllerMovie';
const { width, height } = Dimensions.get('window');



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

    useEffect(()=>{
      if(video.current&&uri){
        if(position.id){
          if(position.id == loadData.fileId){
            video.current.seek(position.pos)
          }
        }else{
          video.current.seek(position.pos)
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
          paused={isPouse}
          onBuffer={() => setLoading(true)}
          rate={1}
          // onEnd={nextLoad}
          onVideoError={(e)=>console.log(e)}
          onError={(e)=>console.log(e)}
          progressUpdateInterval={1000}
          controls={false}
          onProgress={e => onProgress(e)}
          onLoad={e => setDeafaultStatus(e)}
          resizeMode={resizeMode}
        />
        <ControllerMovie
            resize={resize}
            status={status}
            isPouse={isPouse}
            serials={serials}
            pervius={pervius}
            loadData={loadData}
            setSek={setSek}
            sek={sek}
            next={next}
            loading={loading}
            CloseTrailerComp={CloseTrailerComp}
            isFullScreen={isFullScreen}
            setFullScreen={setFullScreen}
            setPouse={setPouse}
            video={video}
            defaultStatus={defaultStatus}
        />
    </View>
    </>
  )
}
