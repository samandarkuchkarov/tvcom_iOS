import React, { useState } from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import styles from './style'

export default function PromoModal({navigation,PromoMessage,setPromoMessage}) {

  
  return (
    <Modal animationType="slide" transparent={true} visible={PromoMessage?true:false} onRequestClose={() => {setPromoMessage('')}}>
    <View style={styles.screen}>
      <View style={styles.modal}>
          <Text allowFontScaling={false}style={styles.modalText}>
            {PromoMessage}
          </Text>
          <TouchableOpacity onPress={()=>setPromoMessage('')}>
              <View style={styles.back}>
                  <Text allowFontScaling={false}style={styles.backText}>Закрыть</Text>
              </View>
          </TouchableOpacity>
      </View>
    </View>
</Modal>
  )
}
