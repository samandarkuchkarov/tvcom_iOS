import React, { useRef, useState } from 'react'
import { TouchableWithoutFeedback, View, Image, Text, Dimensions, ActivityIndicator } from 'react-native'
import styles from './style'
import { convertToNormal } from '../../../helper'
import SliderMovie from '../SliderMovie'

const {width, height} = Dimensions.get('window');

export default function NotFullControllerMovie({ restartVisibility, controllerVisible, isPouse,setPouse, defaultStatus, status, video, rotate,loading, change, doubleScreen, skip, CloseTrailerComp, sek, serials, next,pervius, loadData }) {



  
  return (
    <>
        {controllerVisible?<TouchableWithoutFeedback onPress={(e)=>{restartVisibility(true)}}>
            <View style={styles.container}>
                <View style={styles.btnList2}>
                    <CloseTrailerComp/>
                    {serials&&serials.length>1&&loadData?<TouchableWithoutFeedback onPress={pervius}>
                            <Image source={require('../../../images/Left.png')} style={{...styles.leftSkipSeria,opacity:loadData&&loadData.fileId==serials[0].id?0:1}}/>
                    </TouchableWithoutFeedback>:<></>}
                    {!loading?<TouchableWithoutFeedback onPress={()=>{restartVisibility();setPouse(i=>!i)}}>
                      <View style={styles.pouseWrapper}>
                        {isPouse?<Image style={styles.centerIcon1} source={require('../../../images/startIcon.png')}/>:<></>}
                        {!isPouse?<Image style={styles.centerIcon0} source={require('../../../images/Pause-button.png')}/>:<></>}
                      </View>
                    </TouchableWithoutFeedback>:<></>}
                    {loading?<View style={styles.pouseWrapper}>
                        <ActivityIndicator size={'large'} color='#E41A4B'/>
                    </View>:<></>}
                    {serials&&serials.length>1?<TouchableWithoutFeedback onPress={next}>
                            <Image source={require('../../../images/Right.png')} style={{...styles.leftSkipSeria,opacity:loadData&&loadData.fileId==serials[serials.length-1].id?0:1}}/>
                    </TouchableWithoutFeedback>:<></>}

                </View>
                <View style={styles.secondScreen}>
                    <View style={styles.bottomInfo}>
                       {status?<Text allowFontScaling={false}style={styles.time}>{convertToNormal(status.currentTime)} / {convertToNormal(defaultStatus.duration)} </Text>:<></>}
                        <TouchableWithoutFeedback onPress={rotate}>
                            <Image style={styles.fullScreenIcon} source={require('../../assets/images/fullScreen1.png')}/>
                        </TouchableWithoutFeedback>   
                    </View>
                    <SliderMovie loading={loading} change={change} status={status} video={video} restartVisibility={restartVisibility} defaultStatus={defaultStatus}/>
                </View>
            </View>
        </TouchableWithoutFeedback>:<></>}
        {!controllerVisible?<TouchableWithoutFeedback onPress={()=>{restartVisibility(false)}}>
            <View style={styles.container2}>
                <View style={{...styles.btnList,justifyContent:'space-between'}}>
                    <TouchableWithoutFeedback onPress={()=>skip('left')}>
                        <View style={{...styles.skipBlock,opacity:doubleScreen===1?1:0}}>
                            <Image source={require('../../../images/leftSkip.png')} style={styles.leftSkip}/>
                            <Text allowFontScaling={false}style={styles.sec}>{sek} сек</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {loading?
                    <View style={styles.pouseWrapper}>
                        <ActivityIndicator size={'large'} color='#fff'/>
                    </View>:<></>}

                    <TouchableWithoutFeedback onPress={()=>skip('right')}>
                        <View style={{...styles.skipBlock,opacity:doubleScreen===2?1:0}}>
                            <Image source={require('../../../images/rightSkip.png')} style={styles.leftSkip}/>
                            <Text allowFontScaling={false}style={styles.sec}>{sek} сек</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </TouchableWithoutFeedback>:<></>}
    
    </>
  )
}
