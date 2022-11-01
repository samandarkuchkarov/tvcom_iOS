import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native'
import styles from './style'
import { getAnswers } from '../../Api'
import WebView from 'react-native-webview'
const { width, height } = Dimensions.get('window');
export default function Answers() {

  const [answers,setAnswers] = useState()
  const [selected,setSelected] = useState(-1)

  useEffect(() => {
    let render = true
    
    const fetch = async()=>{
      const answers = await getAnswers()
      setAnswers(answers)
    } 

    fetch()

    return () => {
      render = false
    }
  }, [])

  const press = (item) =>{
    if(item.id==selected){
      setSelected(false)
    }else{
      setSelected(item.id)
    }
  }
  
  return (
    <ScrollView style={styles.wrapper}>
      {answers&&answers.map((item,index)=>{

        return  <View style={{zIndex:2}} key={index}>
                  <View style={{zIndex:2}}>
                    <TouchableOpacity onPress={()=>press(item)}>
                      <View style={styles.question}>
                        <Text allowFontScaling={false}style={styles.questionText}>{item.question}</Text>
                        <Image source={require('../../images/channelRightArrow.png')} style={{...styles.arrow,transform:[{rotate:selected==item.id?'270deg':'90deg'}]}}/>
                      </View>
                    </TouchableOpacity>

                  </View>
                 {selected===item.id?<View style={{zIndex:1}}>
                  <WebView
                    style={styles.webView}
                    automaticallyAdjustContentInsets={true}
                    originWhitelist={['*']}
                    source={{ html:`
                    ${item.answer}
                    <style>
                    body{
                      background-color:#010101;
                      display:flex;
                      flex-direction:column;
                      align-items: center;
                    }
                    img{
                      width:50vw !important;
                      height:50vw !important;
                    }
                    p,li{
                      font-size:50px;
                      width:100%;
                      color:#fff;
                      margin:0px;
          
                    }
                    </style>
                    ` }}
                  />
                  </View>:<></>}
                </View>
      })}
    </ScrollView>
  )
}
