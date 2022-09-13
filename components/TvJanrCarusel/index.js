import React from 'react'
import { Text, FlatList, TouchableOpacity, View } from 'react-native'
import styles from './style';
import FastImage from 'react-native-fast-image';

export default function TvJanrCarusel({data,selectedJanrId, setSelectedJanrId,isLogin}) {
    const selectJanr = item => {
        if(selectedJanrId==item.gid){
          setSelectedJanrId(false);
        }else{
          setSelectedJanrId(item.janrTv);
        }
        
    };

    const renderItem = ({item,index}) =>{
        return <TouchableOpacity   onPress={() =>{selectJanr(item)}}>
                    <View style={{...styles.cardblock,backgroundColor:item.janrTv == selectedJanrId? '#E41A4B' : '#1c1c1c'}}>
                        <Text allowFontScaling={false}style={styles.cardText}>
                            {item.desc}
                        </Text>
                    </View>
                </TouchableOpacity>
    }

  return (
    <>
        <FlatList
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponentStyle={{flexDirection:'row'}}
            ListHeaderComponent={
                <>
            <TouchableOpacity onPress={()=>{setSelectedJanrId(false)}}>
                <View style={{...styles.cardblock,backgroundColor:!selectedJanrId? '#E41A4B' : '#1c1c1c'}}>
                    <Text allowFontScaling={false}style={styles.cardText}>
                    Все
                    </Text>
                </View>
            </TouchableOpacity>
            {isLogin==1?<>
                <TouchableOpacity onPress={()=>{setSelectedJanrId(-1)}}>
                    <View style={{...styles.cardblock,backgroundColor:-1 == selectedJanrId? '#E41A4B' : '#1c1c1c'}}>
                        <Text allowFontScaling={false}style={styles.cardText}>
                        Избранные
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setSelectedJanrId(-2)}}>
                <View style={{...styles.cardblock,backgroundColor:-2 == selectedJanrId? '#E41A4B' : '#1c1c1c'}}>
                        <Text allowFontScaling={false}style={styles.cardText}>
                        Просмотренные
                        </Text>
                    </View>
                </TouchableOpacity>
            </>:<></>}
                </>
            }
            style={styles.wrapper}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    </>
  )
}
