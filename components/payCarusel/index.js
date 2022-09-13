import React from 'react'
import { ScrollView, Image, StyleSheet, View } from 'react-native'

export default function payCarusel() {
    const payMethods = [
        require('../../../images/pay1.png'),
        require('../../../images/pay2.png'),
        require('../../../images/pay3.png'),
        require('../../../images/pay4.png'),
        require('../../../images/pay5.png'),
        require('../../../images/pay6.png'),
        require('../../../images/pay7.png'),
        require('../../../images/pay8.png'),
        require('../../../images/pay9.png'),
        require('../../../images/pay10.png'),
        require('../../../images/pay11.png'),
        require('../../../images/pay12.png'),
      ]
  return (
    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        {payMethods.map((item,index)=>{
            return(  
            <View style={styles.imageWrapper}>
                <Image key={index} style={styles.image} source={item} />
            </View>)
        })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    image:{
        width:100,
        height:52,
        resizeMode:'contain',
        marginRight:10,
    },
    imageWrapper:{
        padding:10,
        backgroundColor:'#fff',
        borderRadius:7,
        marginRight:10,
        marginTop:5
    }
})
