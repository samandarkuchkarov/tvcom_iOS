import React, { useState } from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import styles from './style'
import PayCarusel from '../payCarusel'

export default function TariffModal({visible,setVisible,agree,message,setMessage,action,exit}) {

    const close = ()=>{
        setMessage('');
        setVisible(false);
    }
  
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={close}>
    <View style={styles.screen}>
     {!message?
        <View style={styles.modal}>
            <Text allowFontScaling={false}style={styles.modalText}>
                {agree}
            </Text>
            <TouchableOpacity onPress={()=>action()}>
                <View style={styles.back}>
                    <Text allowFontScaling={false}style={styles.backText}>Да</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={close}>
                <View style={styles.back}>
                    <Text allowFontScaling={false}style={styles.backText}>Нет</Text>
                </View>
            </TouchableOpacity>
        </View>:
        <View style={styles.modal}>
            <Text allowFontScaling={false}Text style={styles.modalText}>
                {message}
            </Text>
            {message.includes('Недостаточно средств.')?<PayCarusel/>:<></>}
            <TouchableOpacity onPress={()=>{close();exit?exit():''}}>
                <View style={styles.back}>
                    <Text allowFontScaling={false}style={styles.backText}>Закрыть</Text>
                </View>
            </TouchableOpacity>
        </View>}
    </View>
</Modal>
  )
}
