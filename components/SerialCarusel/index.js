import React, { useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import styles from './style'

export default function SerialCarusel({ season, data, load, normal, pos, loadData }) {

    const [scrollIndex,setScrollIndex] = useState(0)
    const flatList = useRef()

    useEffect(()=>{
        if(pos&&pos!=-1&&flatList.current){
            for(let i = 0;i<data.length;i++){
                if(data[i].id==pos.id){
                    flatList.current.scrollToIndex({
                        animated:false,
                        index:i
                    });
                }
            }
        }
    },[pos,flatList])
    
    const renderItem = ({item,index}) =>{
        return  <TouchableOpacity onPress={()=>load(item)}>
                    <View style={{...styles.item,marginLeft:index==0?10:0}}>
                        {pos.id&&pos.id!=-1&&pos.id==item.id?<Image style={styles.serialFace} source={require('../../../images/serialFace1.png')}/>:<></>}
                        {pos.id&&pos.id!=-1&&pos.id!=item.id?<Image style={styles.serialFace} source={require('../../../images/serialFace.png')}/>:<></>}
                        {(pos.id==0||pos.id==-1)&&loadData&&loadData.fileId==item.id?<Image style={styles.serialFace} source={require('../../../images/serialFace1.png')}/>:<></>}
                        {(pos.id==0||pos.id==-1)&&loadData&&loadData.fileId!=item.id?<Image style={styles.serialFace} source={require('../../../images/serialFace.png')}/>:<></>}
                        {pos.id==-1&&!loadData?<Image style={styles.serialFace} source={require('../../../images/serialFace.png')}/>:<></>}
                        <Text allowFontScaling={false}numberOfLines={2} style={styles.seriaText}>{normal?'Серия ':""}{normal?item.seria:item.caption}</Text>
                    </View>
                </TouchableOpacity>
    }


  return (
    <View style={styles.container}>
        {season?<Text allowFontScaling={false}style={styles.season}>Сезон {season}</Text>:<></>}
        <FlatList
            data={data}
            ref={flatList}
            getItemLayout={(data, index) => (
                {length: 140, offset: 140 * index, index}
              )}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={renderItem}
        />
    </View>
  )
}
