import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, View, Image, Text, Dimensions, TouchableOpacity, Linking } from 'react-native'
import { Datas } from '../../context';
import styles from './style'
const { width } = Dimensions.get('window');
import { getData, getQrPayme } from '../../Api';

export default function PayMethods({navigation}) {
    const money = 10000
    const {isLogin} = useContext(Datas)
    const [qrForPayme,setQrForPayMe] = useState('')
    const [abonement,setAbonement] = useState('')

    const payMethods = [
        {img:require('../../images/pay1.png'),qr:`https://www.apelsin.uz/open-service?serviceId=174&amount=${money*100}&id=${abonement}`,name:'apelsin'},
        {img:require('../../images/pay2.png'),qr:'https://payme.uz/checkout/'+qrForPayme,name:'payme'},
        {img:require('../../images/pay8.png'),qr:`https://my.click.uz/services/pay?amount=${money}&merchant_id=1&service_id=13105&transaction_param=${abonement}`},
        {img:require('../../images/pay9.png')},
    ]
    useEffect(()=>{
        const fetch = async() =>{
        const abonement = await getData('abonement')
        const response = await getQrPayme(abonement.number,money)
        setAbonement(abonement.number)
        setQrForPayMe(response.result.cheque._id)
        }
        if(isLogin){
            fetch()
        }
        
      },[isLogin])

  return (
    <ScrollView style={styles.wrapper}>
        <View style={styles.container}>
            <Text allowFontScaling={false}style={styles.title}>Способы оплаты:</Text>
            <View style={styles.way}>
                <Text allowFontScaling={false}style={styles.wayOrder}>1</Text>
                <Text allowFontScaling={false}style={styles.wayText}>Наличными или пластиковой картой UzCard в офисе компании;</Text>
            </View>
            <View style={styles.way}>
                <Text allowFontScaling={false}style={styles.wayOrder}>2</Text>
                <Text allowFontScaling={false}style={styles.wayText}>Через платежные системы, выбрав TVCOM, указав номер абонемента и вносимую сумму;</Text>
            </View>

            <View style={styles.content}>
                {payMethods?payMethods.map((item,index)=>{
                    return  <View style={{...styles.item,width:(width-20)/2}} key={index}>
                                <TouchableOpacity onPress={()=>isLogin&&item.qr?Linking.openURL(item.qr):''}>
                                    <View style={styles.wrapperItem}>
                                        <Image key={index} style={styles.image} source={item.img} />
                                    </View>
                                </TouchableOpacity>
                            </View> 
                }):
                <></>}
            </View>
        </View>
    </ScrollView>
  )
}
