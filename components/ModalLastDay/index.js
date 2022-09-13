import React from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import styles from './style'

export default function ModalLastDay({modalData,setModalData,navigation}) {
    


  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalData?true:false}
        onRequestClose={()=>setModalData(false)}
    >
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Text allowFontScaling={false}style={styles.text}>Уважаемый абонент!  {modalData.subscriptions[0].end_date} заканчивается подписка на {modalData.subscriptions.map(i=>i.tariff_name).join(', ')}. Просим заранее оплатить {modalData.monthly_payment-modalData.balance} сум, остаток на лицевом счету {modalData.balance} сум</Text>
                <TouchableOpacity onPress={()=>setModalData(false)}>
                    <View style={styles.back}>
                        <Text allowFontScaling={false}style={styles.backText}>Закрыть</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                    <View style={styles.back}>
                        <Text allowFontScaling={false}style={styles.backText}>Перейти в личный кабинет</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    </Modal>
  )
}
