import React, { useContext, useEffect, useState } from 'react'
import { TouchableWithoutFeedback, View, Dimensions, Image, Text } from 'react-native'
import styles from './style'
import SliderTv from '../SliderTv';
import { Datas } from '../../../context';
import { getTime } from '../../../Api';
import {converter} from '../../../helper'



const {width,height} = Dimensions.get('window');


export default function notFullControll({rotate, findPos, sliderVal, setSliderValue, change, isPouse, setPouse, timeData, timer, live, restartVisibility, controllerVisible, fetchTimeShift, openLive, restart, disableTimeShift }) {


  return (
    <>


      {controllerVisible?
        <TouchableWithoutFeedback onPress={restartVisibility}>
          <View style={styles.content}>
              <View style={styles.btnContainer0}>
                <TouchableWithoutFeedback onPress={()=>!live?openLive():''}>
                  <View style={styles.liveBlock}>
                    {!live?<Image style={styles.liveIcon} source={require('../../assets/images/live0.png')}/>:<></>}
                    {live?<Image style={styles.liveIcon} source={require('../../assets/images/live1.png')}/>:<></>}
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.btnList}>
                   {!disableTimeShift? <TouchableWithoutFeedback onPress={()=>findPos('left')}>
                      <Image style={styles.skip} source={require('../../../images/Left.png')}/>
                    </TouchableWithoutFeedback>:<></>}

                    <TouchableWithoutFeedback onPress={()=>setPouse(i=>!i)}>
                      <View style={styles.pouseWrapper}>
                        {isPouse?<Image style={styles.centerIcon1} source={require('../../../images/startIcon.png')}/>:<></>}
                        {!isPouse?<Image style={styles.centerIcon0} source={require('../../../images/Pause-button.png')}/>:<></>}
                      </View>
                    </TouchableWithoutFeedback>

                    {!live&&!disableTimeShift?<TouchableWithoutFeedback onPress={()=>findPos('right')}>
                      <Image style={styles.skip} source={require('../../../images/Right.png')}/>
                    </TouchableWithoutFeedback>:<></>}
                    {live&&!disableTimeShift?<TouchableWithoutFeedback onPress={restart}>
                      <Image style={styles.skip} source={require('../../../images/restart0.png')}/>
                    </TouchableWithoutFeedback>:<></>}

                </View>
              </View>
              <View style={{...styles.bottom,justifyContent:disableTimeShift?'center':'flex-start'}}>
                <View style={{...styles.bottomData,justifyContent:disableTimeShift?'flex-end':'space-between'}}>
                    {timeData.begin_time?
                      <Text allowFontScaling={false}style={styles.time}>{converter(timeData.begin_time)}-{converter(timeData.end_time)}</Text>
                    :<></>}
                    <TouchableWithoutFeedback onPress={rotate}>
                      <Image style={styles.fullScreenIcon} source={require('../../assets/images/fullScreen1.png')}/>
                    </TouchableWithoutFeedback>
                </View>

                <SliderTv change={change} sliderVal={sliderVal} setSliderValue={setSliderValue} timer={timer} fetchTimeShift={fetchTimeShift} restartVisibility={restartVisibility} timeData={timeData}/>
              </View>
          </View>
        </TouchableWithoutFeedback>
      :<></>}
      {!controllerVisible?
          <TouchableWithoutFeedback onPress={restartVisibility}>
            <View style={styles.content}>
            </View>
          </TouchableWithoutFeedback>
      :<></>}
      
    
    </>
  )
}
