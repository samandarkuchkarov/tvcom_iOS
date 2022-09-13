import React, { useState } from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import styles from './style'

export default function DebtModal({debtDel, setDebtDel, tariffs, userData, monthly}) {

  
  return (
    <Modal animationType="slide" transparent={true} visible={debtDel?true:false} onRequestClose={() => {setDebtDel(false)}}>
    <View style={styles.screen}>
      <View style={styles.modal}>
            <Text allowFontScaling={false}style={styles.modalText}>На вашем аккаунте не достаточно средств для активации действующих подписок: {'\n'}{tariffs.filter(i=>i.is_assigned=='1').map(i=>i.name).join(', ')}</Text>

            <TouchableOpacity onPress={()=>setDebtDel(false)}>
                <View style={styles.back}>
                    <Text allowFontScaling={false}style={styles.backText}>Закрыть</Text>
                </View>
            </TouchableOpacity>
      </View>
    </View>
</Modal>
  )
}
