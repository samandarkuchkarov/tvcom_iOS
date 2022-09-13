import React, { useState, useContext } from 'react'
import { View, Text, FlatList,Image, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

import styles from './style'

const ActorItem = (item,navigation,index)=>{

    const searchMovies = () => {
       navigation.push('ActorResult',{aid:item.id,actor:item})
    }
 
    return<>
    <TouchableOpacity onPress={searchMovies}>
        <View style={{...styles.wrapperItem,marginLeft:index==0?10:0}}>
                <View style={styles.actorItem}>
                    <View style={styles.iconWrapper}>
                        <Image style={styles.icon} source={item.photo?{uri:item.photo}:require('../../../images/profileActors.png')}/>
                    </View>
                    <Text allowFontScaling={false}numberOfLines={2} style={styles.name}>
                        {item.name}
                    </Text>
                </View>
        </View>
    </TouchableOpacity>
    
    </>
}

const ActorCarusel = ({ actors, navigation }) => {
  const listActors = actors&&actors.length?actors:actors&&actors.item
  return listActors && listActors.length ?

    <View style={styles.wrapper}>
      <Text allowFontScaling={false}style={styles.actorText}>Актеры:</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        focusable={false}
        data={listActors}
        horizontal={true}
        renderItem={({item,index})=>ActorItem(item,navigation,index)}
        keyExtractor={(item)=>item.name+JSON.stringify(listActors.map(i=>i.name))}
      />
    </View>
    :<></>
}

export default ActorCarusel
