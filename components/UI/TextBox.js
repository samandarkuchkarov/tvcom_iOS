import React, { useState } from 'react';
import {Text, TextInput, View, Image, TouchableWithoutFeedback} from 'react-native';

export default function TextBox({label, style, error, password,secureTextEntry,...inputProps}) {
  const [showWord,setShowWord] = useState(false)
  return (
    <View style={{width: '100%', ...style}}>
      {label && <Text allowFontScaling={false}style={{color: error ? '#ff4545' : '#474747',fontSize:18}}>{label}</Text>}
      <View style={{zIndex:2}}>
        {password?
        <TouchableWithoutFeedback onPress={()=>setShowWord(i=>!i)}>
            <Image style={{position:'absolute',width:30,height:30,right:10,top:10,tintColor:'#474747',zIndex:2,resizeMode:'contain'}} source={showWord?require('../../images/eye1.png'):require('../../images/eye0.png')}/>
        </TouchableWithoutFeedback>
        :<></>}
      <TextInput
        placeholderTextColor="grey"
        importantForAutofill="auto"
        style={{
          paddingVertical: 8,
          borderBottomColor: error ? '#ff4545' : '#474747',
          borderWidth: 1,
          color: error ? '#ff4545' : 'white',
          fontSize: 16,
          zIndex:1
        }}
        secureTextEntry={secureTextEntry&&!showWord}
        {...inputProps}
      />

      </View>
    </View>
  );
}
