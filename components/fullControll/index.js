import React, { useContext, useEffect, useState } from 'react'
import { TouchableWithoutFeedback, View, Dimensions, Image, Text } from 'react-native'
import styles from './style'
import SliderTv from '../SliderTv';
import { Datas } from '../../context';
import { getTime } from '../../Api';
import {converter} from '../../helper'
import SliderTvFullScreen from '../SliderTvFullScreen';
import FastImage from 'react-native-fast-image';



const {width,height} = Dimensions.get('window');


export default function FullControll({rotate, findPos, sliderVal, setSliderValue, change, isPouse, setPouse, timeData, timer, live, restartVisibility, controllerVisible, fetchTimeShift, openLive, restart,nextProgram,lastProgram,disableTimeShift }) {

  return (
    <>


      {controllerVisible?
        <TouchableWithoutFeedback onPress={restartVisibility}>
          <View style={styles.contentFullScreen}>
            <TouchableWithoutFeedback onPress={()=>!live?openLive():''}>
              <View style={styles.liveBlock}>
                {!live?<Image style={styles.liveIcon} source={require('../../assets/images/live0.png')}/>:<></>}
                {live?<Image style={styles.liveIcon} source={require('../../assets/images/live1.png')}/>:<></>}
              </View>
            </TouchableWithoutFeedback>
            <View View style={styles.btnContainer}>
                <View style={styles.btnList}>
                  
                    {!disableTimeShift? <TouchableWithoutFeedback onPress={()=>findPos('left')}>
                      <Image style={styles.skip} source={require('../../images/Left.png')}/>
                    </TouchableWithoutFeedback>:<></>}   

                    <TouchableWithoutFeedback onPress={()=>setPouse(i=>!i)}>
                      <View style={styles.pouseWrapper}>
                        {isPouse?<Image style={styles.centerIcon1} source={require('../../images/startIcon.png')}/>:<></>}
                        {!isPouse?<Image style={styles.centerIcon0} source={require('../../images/Pause-button.png')}/>:<></>}
                      </View>
                    </TouchableWithoutFeedback>
                    {!live?<TouchableWithoutFeedback onPress={()=>findPos('right')}>
                      <Image style={styles.skip} source={require('../../images/Right.png')}/>
                    </TouchableWithoutFeedback>:<></>}
                    {live&&!disableTimeShift?<TouchableWithoutFeedback onPress={restart}>
                      <Image style={styles.skip} source={require('../../images/restart0.png')}/>
                    </TouchableWithoutFeedback>:<></>}

                </View>
            </View>
            {timeData.begin_time?<View style={styles.bottomContainer}>
                <View style={styles.timeInfo}>
                  <Text allowFontScaling={false}style={styles.time}>{converter(timeData.rpg.begin_time)}-{converter(timeData.rpg.end_time)}</Text>
                  {timeData.rpg?
                  <View style={styles.topContainer}>
                      {timeData.rpg.preview.length?<View style={styles.iconWrapper}>
                        <FastImage resizeMode={FastImage.resizeMode.stretch} style={styles.icon} source={{uri:timeData.rpg.preview}} />
                      </View>:<></>}
                      <View  style={styles.textBlock}>
                          <Text allowFontScaling={false}style={styles.time}>{converter(timeData.rpg.begin_time)}-{converter(timeData.rpg.end_time)}</Text>
                          <Text allowFontScaling={false}style={styles.nameProgram} numberOfLines={2}>{timeData.rpg.name}</Text>
                      </View>
                  </View>
                :<></>}
                  <TouchableWithoutFeedback onPress={rotate}>
                    <Image source={require('../../assets/images/fullScreen0.png')} style={styles.rotate} />
                  </TouchableWithoutFeedback>
                </View>
                <SliderTvFullScreen change={change} sliderVal={sliderVal} setSliderValue={setSliderValue} timer={timer} fetchTimeShift={fetchTimeShift} restartVisibility={restartVisibility} timeData={timeData}/>
                <View style={styles.bottomInfo}>

                   {lastProgram?
                   <View style={styles.bottomInfoItem}>
                      <View style={styles.iconWrapper}>
                        <Image style={styles.leftIcon} source={require('../../images/playerLeft.png')}/>
                        {lastProgram.preview.length?<FastImage resizeMode={FastImage.resizeMode.stretch} style={styles.icon} source={{uri:lastProgram.preview}} />:<></>}
                      </View>
                      <View  style={styles.textBlock}>
                          <Text allowFontScaling={false}style={styles.time}>{converter(lastProgram.begin_time)}-{converter(lastProgram.end_time)}</Text>
                          <Text allowFontScaling={false}style={styles.nameProgram} numberOfLines={2}>{lastProgram.name}</Text>
                      </View>
                    </View>:<></>}

                    {nextProgram?<View style={styles.bottomInfoItem2}>
                      <View style={styles.iconWrapper2}>
                        <Image style={styles.leftIcon} source={require('../../images/next.png')}/>
                        {nextProgram.preview.length?<FastImage resizeMode={FastImage.resizeMode.stretch} style={styles.icon} source={{uri:nextProgram.preview}} />:<></>}
                      </View>
                      <View  style={styles.textBlock}>
                          <Text allowFontScaling={false}style={styles.time}>{converter(nextProgram.begin_time)}-{converter(nextProgram.end_time)}</Text>
                          <Text allowFontScaling={false}style={styles.nameProgram} numberOfLines={2}>{nextProgram.name}</Text>
                      </View>
                    </View>:<></>}
                    
                </View>
            </View>:<></>}
          </View>
        </TouchableWithoutFeedback>
      :<></>}
      {!controllerVisible?
          <TouchableWithoutFeedback onPress={restartVisibility}>
            <View style={styles.contentFullScreen}>
            </View>
          </TouchableWithoutFeedback>
      :<></>}
      
    
    </>
  )
}
