import React from 'react'
import { ScrollView, View, Image, Text, Dimensions } from 'react-native'
import styles from './style'
const { width } = Dimensions.get('window');

export default function PayMethods({navigation}) {

    const payMethods = [
        require('../../images/pay1.png'),
        require('../../images/pay2.png'),
        require('../../images/pay3.png'),
        require('../../images/pay4.png'),
        require('../../images/pay5.png'),
        require('../../images/pay6.png'),
        require('../../images/pay7.png'),
        require('../../images/pay8.png'),
        require('../../images/pay9.png'),
        require('../../images/pay10.png'),
        require('../../images/pay11.png'),
        require('../../images/pay12.png'),
      ]
    const splitToChunks = (array, parts) => {
        let result = [];
        for (let i = parts; i > 0; i--) {
            result.push(array.splice(0, Math.ceil(array.length / i)));
        }
        return result;
    }
    let index = Math.floor((width-10)/170)
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
                                <View style={styles.wrapperItem}>
                                    <Image key={index} style={styles.image} source={item} />
                                </View>
                            </View> 
                }):
                <></>}
            </View>
        </View>
    </ScrollView>
  )
}
