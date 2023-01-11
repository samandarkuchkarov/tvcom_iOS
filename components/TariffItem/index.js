import React from 'react'
import { View, Text, TouchableOpacity,Image } from 'react-native'
import styles from './style'

export default function TariffItem({openModal, isLogin, item, navigation}) {
    const more = () =>{
        if(item.tariff_id!==7){
            navigation.navigate('PodpiskaMovie',{id:item.tariff_id})
        }else{
            navigation.navigate('PodpiskaTv',{tariff_id:item.tariff_id})
        }
    }
  return (
    <View style={styles.wrapper}>
        <Image
            source={{uri: 'http://play.tvcom.uz:8008/storage/' + item.img_big}}
            style={styles.back}
        />
        <View style={styles.info}>
              <Text allowFontScaling={false}style={styles.desc}>{item.desc}</Text> 
        </View>
        <View style={styles.con}>
            <View style={styles.priceContent}>
                <Text allowFontScaling={false}style={styles.price}>{item.price} сум/месяц</Text>   
                {item.tariff_id==35||item.tariff_id==7||item.tariff_id==32?
                <TouchableOpacity onPress={more}>
                    <View style={styles.more}>
                        <Text allowFontScaling={false}style={styles.moreText}>Подробнее</Text>
                    </View>  
                </TouchableOpacity>:<></>}
            </View>
            <TouchableOpacity onPress={async()=>{
                if(isLogin){
                   await openModal(item);
                }else{
                    navigation.navigate('Login')
                }
                }}>
                <View style={styles.btn}>
                    {isLogin?<Text allowFontScaling={false}style={{...styles.tariffBtnText}}>{item.is_assigned?'Отменить':'Купить'}</Text>:<></>}
                    {!isLogin?<Text allowFontScaling={false}style={{...styles.tariffBtnText}}>Авторизоваться</Text>:<></>}
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}
