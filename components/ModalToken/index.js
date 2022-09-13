import React, { useState } from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import styles from './style'

export default function ModalToken({navigation}) {

  const [modalVisible,setModalVisible] = useState(true)
  
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {setModalVisible(false)}}>
    <View style={styles.screen}>
      <View style={styles.modal}>
          { }
          <Text allowFontScaling={false}style={styles.title}>Уважаемый зритель!</Text>
          <Text allowFontScaling={false}style={styles.modalText}>
            Вход в Ваш аккаунт выполнен на другом устройстве. Для одновременного
            просмотра на нескольких устройствах необходимо подключить услугу
            “Мультидоступ”
          </Text>
          <TouchableOpacity onPress={()=>setModalVisible(false)}>
              <View style={styles.back}>
                  <Text allowFontScaling={false}style={styles.backText}>Закрыть</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
              <View style={styles.back}>
                  <Text allowFontScaling={false}style={styles.backText}>Подробнее</Text>
              </View>
          </TouchableOpacity>
      </View>
    </View>
</Modal>
  )
}
