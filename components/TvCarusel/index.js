import React, { useState, useContext } from 'react'
import { View, Text, FlatList, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { Datas } from '../../context'

const { width } = Dimensions.get('window');

import styles from './style'

const ChannelItem = ({item,isLogin,navigation,index})=>{
    const [error,setError] = useState(false)
    const onPress = () => {
        if (isLogin) {
          if (item.has_subscription == 1) {
            navigation.navigate('CurrentTv',item);
          } else {
            navigation.push('PodpiskaTv',{channel_id:item.genre_id});
          }
        } else {
          navigation.navigate('Login');
        }
      };
    
    return<>
        <View style={{...styles.channelItem,marginLeft:index==0?10:0}}>
          <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.back}>
                <View style={styles.imageWrapper}>

                    {item.img&&isLogin?<>
                      <Image
                        source={{uri:item.img.includes('://')? item.img : `http://play.tvcom.uz:8008/storage/` + item.img}}      
                        style={styles.SmallIcon}
                      />
                    </>:<></>}

                    {item.program_preview_url?item.program_preview_url.includes('jpeg')?
                    <Image
                      resizeMode='stretch'
                      source={{uri:error? item.icon :item.program_preview_url}}
                      onError={()=>setError(true)}
                      style={styles.icon}
                    />:
                    <Image
                        source={{uri:item.program_preview_url}}
                        style={styles.icon}
                    />:<></>}
                    {!item.program_preview_url?
                    <Image
                        source={{uri:item.img.includes('://')? item.img : `http://play.tvcom.uz:8008/storage/` + item.img}}      
                        style={styles.icon}
                    />:<></>}
                    { isLogin&&item.has_subscription != '1' ? (
                        <View style={styles.lockWrapper}>
                            <Image
                            style={styles.lock}
                            source={require('../../images/lock.png')}
                            />
                        </View>
                    ) : <></>}
                </View>
                <Text allowFontScaling={false}numberOfLines={2} style={styles.text}>{isLogin? item.program_name?item.program_name:item.name:item.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
    
    </>
}
const ChannelItemEmpty = ({index})=>{

  
  return<>
      <View style={{...styles.channelItem,marginLeft:index==0?10:0}}>
          <View style={styles.back}>
              <View style={styles.imageWrapperEmpty}>

              </View> 
              <Text allowFontScaling={false} style={styles.text}></Text>
          </View>
      </View>
  
  </>
}

const TvCarusel = ({channels,navigation}) => {

  const {isLogin} = useContext(Datas)
  const data = channels?channels.filter(o=>o):false

  return (
  <View style={styles.wrapper}>
      <Text allowFontScaling={false} style={styles.name}>Телеканалы</Text>
      {channels&&channels.length?
      <FlatList
        data={data}
        horizontal={true}
        renderItem={({item,index})=><ChannelItem index={index} item={item} isLogin={isLogin} navigation={navigation}/>}
        keyExtractor={(item)=>item.name+' '+ item.has_subscription+' ' +isLogin}
        extraData={channels}
        ListFooterComponent={<>
          <TouchableWithoutFeedback onPress={()=>navigation.navigate('TvList')}>
            <View>
              <View style={styles.imageWrapper2}>
                <Image style={styles.dotts} source={require('../../images/3dotts.png')}/>
              </View>
                <Text allowFontScaling={false}numberOfLines={2} style={styles.text}>Еще</Text>
            </View>
          </TouchableWithoutFeedback>
        </>}
      />
      :<>
      <FlatList
        data={['1','12','123','1234','12345']}
        horizontal={true}
        keyExtractor={(item)=>item}
        renderItem={({item,index})=><ChannelItemEmpty  index={index}/>}
        />
      </>}
  </View>)
}

export default TvCarusel
