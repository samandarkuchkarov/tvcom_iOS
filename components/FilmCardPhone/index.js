import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style';


const FilmCardPhone = ({item,providerIcons,isLogin,subscriptions,onPress}) => {
   
    let aviable = true
    const icon =providerIcons&&providerIcons.filter(item2=>item2.provider_id == item.video_provider_id&&item.video_provider_id!=3)[0]
    let movieTariffId =  providerIcons.filter(item2=>item2.provider_id == item.video_provider_id&&item2.video_provider_id!=3)[0]
    if(movieTariffId){
        movieTariffId = movieTariffId.provider
    }
    if(item.video_provider_id!=3&&subscriptions&&item.video_provider_id&&!isNaN(Number(item.video_provider_id))){ 
        aviable = subscriptions.some(i=>movieTariffId==i.tariff_id)
    }

    if(!subscriptions&&item.video_provider_id!=3){
        if(!isNaN(Number(item.video_provider_id))){
        aviable = false
        }
    }
    if(item.video_provider_id==null){
        aviable = true
    }
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={()=>{onPress(item)}}>
                <View>
                    <View style={styles.imageWrapper}>
                        
                        {icon? <FastImage resizeMode={FastImage.resizeMode.contain} style={styles.cinema_icon} source={{uri:`http://play.tvcom.uz:8008/storage/`+icon.img}}/>
                        :<></>}

                        <FastImage
                            style={styles.image}
                            resizeMode={FastImage.resizeMode.cover}
                            source={{
                                uri: typeof item.thumbnail_big == 'string' && item.thumbnail_big.length 
                                ?  item.thumbnail_big
                                :  'https://st.depositphotos.com/3265665/4462/i/600/depositphotos_44627471-stock-photo-transparent.jpg',
                                priority: FastImage.priority.normal,
                            }}
                        />
                    </View>
                    <View style={styles.textContent}>
                        <Text allowFontScaling={false}style={styles.name} numberOfLines={1}>
                            {item.name}
                        </Text>
                        {aviable&&isLogin ? 
                            <Text allowFontScaling={false}style={styles.textAviable}>доступно</Text>
                        : isLogin?
                            <Text allowFontScaling={false}style={styles.textAviable2}>подписка</Text>:<></>
                        }
                        {!isLogin ? 
                            <Text allowFontScaling={false}style={styles.textAviable2}>авторизоваться</Text>
                            : <></>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
  };
  export default FilmCardPhone;