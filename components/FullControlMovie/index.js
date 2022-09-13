import React from 'react'
import styles from './style'
import { View, TouchableWithoutFeedback, Image, Text, ActivityIndicator } from 'react-native'
import { convertToNormal } from '../../../helper'
import SliderMovie from '../SliderMovie'
import { PinchGestureHandler } from 'react-native-gesture-handler'

export default function FullControlMovie({  restartVisibility, controllerVisible, isPouse,setPouse, defaultStatus, status, video, rotate,loading, change, doubleScreen, skip, CloseTrailerComp, restartVisibility2, serials, next, pervius, loadData, sek, resize }) {
  return (
    <>{controllerVisible?
        <TouchableWithoutFeedback onPress={restartVisibility}>
          <View style={styles.contentFullScreen}>
                <View View style={styles.btnContainer}>
                    <CloseTrailerComp/>
                    <View style={styles.btnList}>
                        {serials&&serials.length>1&&loadData?<TouchableWithoutFeedback onPress={()=>{pervius();restartVisibility()}}>
                            <View style={styles.skipBlock}>
                                <Image source={require('../../../images/Left.png')} style={{...styles.leftSkip,opacity:loadData&&loadData.fileId==serials[0].id?0:1}}/>
                            </View>
                        </TouchableWithoutFeedback>:<></>}
                        {!loading?<TouchableWithoutFeedback onPress={()=>setPouse(i=>!i)}>
                        <View style={styles.pouseWrapper}>
                            {isPouse?<Image style={styles.centerIcon1} source={require('../../../images/startIcon.png')}/>:<></>}
                            {!isPouse?<Image style={styles.centerIcon0} source={require('../../../images/Pause-button.png')}/>:<></>}
                        </View>
                        </TouchableWithoutFeedback>:<></>}
                        {loading?
                         <View style={styles.pouseWrapper}>
                            <ActivityIndicator size={'large'} color='#E41A4B'/>
                        </View>
                        :<></>}
                        {serials&&serials.length>1&&loadData?<TouchableWithoutFeedback  onPress={()=>{next();restartVisibility()}}>
                            <View style={styles.skipBlock}>
                                <Image source={require('../../../images/Right.png')} style={{...styles.leftSkip,opacity:loadData&&loadData.fileId==serials[serials.length-1].id?0:1}}/>
                            </View>
                        </TouchableWithoutFeedback>:<></>}
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.timeInfo}>
                        {status?<Text allowFontScaling={false}style={styles.time}>{convertToNormal(status.currentTime)}-{convertToNormal(defaultStatus.duration)}</Text>:<></>}
                        <TouchableWithoutFeedback onPress={rotate}>
                            <Image source={require('../../assets/images/fullScreen0.png')} style={styles.rotate} />
                        </TouchableWithoutFeedback>
                    </View>
                    <SliderMovie loading={loading} change={change} status={status} video={video} restartVisibility={restartVisibility} defaultStatus={defaultStatus}/>
                </View>
          </View>
        </TouchableWithoutFeedback>
      :<></>}
      {!controllerVisible?
          <TouchableWithoutFeedback onPress={()=>restartVisibility(false)}>
            <PinchGestureHandler onHandlerStateChange={(e)=>resize(e.nativeEvent)}>
                <View style={styles.contentFullScreen}>
                    <View View style={styles.btnContainer}>
                        <View style={{...styles.btnList,justifyContent:'space-between'}}>
                            <TouchableWithoutFeedback onPress={()=>skip('left')}>
                                <View style={{...styles.skipBlock,opacity:doubleScreen===1?1:0}}>
                                    <Image source={require('../../../images/leftSkip.png')} style={styles.leftSkip}/>
                                    <Text allowFontScaling={false}style={styles.sec}>{sek} сек</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            {loading?
                            <View style={styles.pouseWrapper}>
                                <ActivityIndicator size={'large'} color='#E41A4B'/>
                            </View>
                            :<></>}
                            <TouchableWithoutFeedback  onPress={()=>skip('right')}>
                                <View style={{...styles.skipBlock,opacity:doubleScreen===2?1:0}}>
                                    <Image source={require('../../../images/rightSkip.png')} style={styles.leftSkip}/>
                                    <Text allowFontScaling={false}style={styles.sec}>{sek} сек</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>          
                    </View>
                </View>
            </PinchGestureHandler>
          </TouchableWithoutFeedback>
      :<></>}
      </>
  )
}
