import React from 'react'
import { ScrollView, Image, StyleSheet, View, TouchableOpacity, Linking } from 'react-native'

export default function payCarusel({payMethods}) {
  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={{marginTop:10}} horizontal={true}>
        {payMethods.map((item,index)=>{
            return(  
            <TouchableOpacity key={index} onPress={()=>item.qr?Linking.openURL(item.qr):''}>
                <View style={styles.imageWrapper}>
                    <Image  style={styles.image} source={item.img} />
                </View>
            </TouchableOpacity>
            )
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
