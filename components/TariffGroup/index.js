import React from 'react'
import { Text, View } from 'react-native'
import styles from './style'
import TariffItem from '../TariffItem'

export default function TariffGroup({ tariffs, openModal, openTariff, isLogin, navigation }) {
    const aviables = tariffs.all && tariffs.all.filter(item=>item.is_assigned==1)
    const unaviables = tariffs.all && tariffs.all.filter(item=>item.is_assigned==0)
  return (
    (
        <View style={styles.wrapper}>
          {isLogin?<>
            {tariffs.all&&aviables.length?<>
              {isLogin?<Text allowFontScaling={false}style={styles.name2}>Приобретенные подписки</Text>:<></>}
              {tariffs.all&&aviables.map((item)=>(
                  <TariffItem navigation={navigation} isLogin={isLogin}  openTariff={openTariff}  openModal={openModal}  item={item} key={item.id}/>
              ))}
            </>:<></>}
            
            {tariffs.all&&unaviables.length?<>
              <Text allowFontScaling={false}style={styles.name2}>Подписки</Text>
              {tariffs.all&&unaviables.map((item)=>(
                  <TariffItem navigation={navigation} isLogin={isLogin}  openTariff={openTariff}  openModal={openModal}  item={item} key={item.id}/>
              ))}    
          </>:<></>}
      
          </>:<></>}
          {!isLogin?<>
            {tariffs.all&&tariffs.all.map((item)=>(
                <TariffItem navigation={navigation} isLogin={isLogin}  openTariff={openTariff}  openModal={openModal}  item={item} key={item.id}/>
            ))}   
          </>:<></>}
        </View>)
  )
}
