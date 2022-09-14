import React from 'react'
import { ScrollView, View, Image, Text } from 'react-native'
import styles from './style'

export default function Devices() {
  return (
    <ScrollView  contentContainerStyle={{alignItems:'center'}} style={styles.wrapper}>
        <Image style={styles.image} source={require('../../images/backMulti.png')}/>
        <View style={styles.texts}>
          <Text allowFontScaling={false}style={styles.title}>Одно приложение - <Text allowFontScaling={false}style={styles.red}>множество устройств!</Text></Text>
          <Text allowFontScaling={false}style={styles.desc}>
            Скачивайте приложение TVCOM
            на любое устройство SmartTV, 
            Android приставки, 
            смартфоны и планшеты 
            и наслаждайтесь просмотром 
            где бы вы не были.
          </Text>
          <Text allowFontScaling={false}style={styles.desc2}>
          Ищите приложение <Text allowFontScaling={false}style={styles.red}>TVCOM 
          в магазине приложений </Text>
          вашего устройства
          </Text>
          <View style={styles.imageList}>
              <View style={styles.imageWrapper}>
                <Image style={styles.qr} source={require('../../images/appstore.png')}/>
                <Text allowFontScaling={false}style={styles.device}>APP STORE</Text>
              </View>
              <View style={styles.imageWrapper}>
                <Image style={styles.qr} source={require('../../images/playstore.png')}/>
                <Text allowFontScaling={false} style={styles.device}>PLAY MARKET</Text>
              </View>
          </View>
        </View>
    </ScrollView>
  )
}
