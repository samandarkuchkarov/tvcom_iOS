import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import styles from './style';



const Choser = ({navigation}) => {
    
    const Press = (name) =>{
        navigation.navigate(name)
    }
    const route = navigation.getState().routes
    let name = route[route.length-1].name
    
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <View  style={styles.list}>
                    <TouchableWithoutFeedback onPress={()=>Press('MovieList')}>
                        <Text allowFontScaling={false}style={{...styles.item,color:name==='MovieList'?'#fff':'#bcbcbc'}}>Фильмы</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>Press('Serial')}>
                        <Text allowFontScaling={false}style={{...styles.item,color:name==='Serial'?'#fff':'#bcbcbc'}}>Сериалы</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>Press('Kids')}>
                        <Text allowFontScaling={false}style={{...styles.item,color:name==='Kids'?'#fff':'#bcbcbc'}}>Детям</Text>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>Press('Shows')}>
                        <Text allowFontScaling={false}style={{...styles.item,color:name==='Shows'?'#fff':'#bcbcbc'}}>Шоу</Text>
                    </TouchableWithoutFeedback>                   
                </View>
                <View style={styles.list}>
                    <Text allowFontScaling={false}style={{borderBottomColor:name==='MovieList'?'#E41A4B':'transparent',...styles.active}}>Фильмы</Text>
                    <Text allowFontScaling={false}style={{borderBottomColor:name==='Serial'?'#E41A4B':'transparent',...styles.active}}>Сериалы</Text>
                    <Text allowFontScaling={false}style={{borderBottomColor:name==='Kids'?'#E41A4B':'transparent',...styles.active}}>Детям</Text>
                    <Text allowFontScaling={false}style={{borderBottomColor:name==='Shows'?'#E41A4B':'transparent',...styles.active}}>Шоу</Text>
                </View>
            </View>
        </View>
    );
  };
  export default Choser;