import React, { useState, useEffect } from 'react'
import { Modal, View, Text, TouchableOpacity } from 'react-native'
import styles from './style'
import PayCarusel from '../payCarusel'
import { getQrPayme } from '../../Api'

export default function TariffModal({visible,setVisible,agree,message,setMessage,action,exit,userData,chosedTariff}) {

    const close = ()=>{
        setMessage('');
        setVisible(false);
    }
    const [qrForPayme,setQrForPayMe] = useState('')
    const money = Math.ceil(chosedTariff.realPrice-userData.balance)
    const payMethods = [
        {img:require('../../images/pay1.png'),qr:`https://www.apelsin.uz/open-service?serviceId=174&amount=${money*100}&id=${userData&&userData.abonement}`,name:'apelsin'},
        {img:require('../../images/pay2.png'),qr:'https://payme.uz/checkout/'+qrForPayme,name:'payme'},
        {img:require('../../images/pay8.png'),qr:`https://my.click.uz/services/pay?amount=${money}&merchant_id=1&service_id=13105&transaction_param=${userData&&userData.abonement}`},
        {img:require('../../images/pay9.png')},
      ]
      useEffect(()=>{
        const fetch = async() =>{
            if(money>0){
                const response = await getQrPayme(userData.abonement,money)
                setQrForPayMe(response.result.cheque._id)
            }
        }
        if(userData&&chosedTariff){
          fetch()
        }
      },[userData,chosedTariff])
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
            {message.includes('Недостаточно средств.')?<PayCarusel payMethods={payMethods}/>:<></>}
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
