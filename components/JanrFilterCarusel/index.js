import React from 'react'
import { Text, FlatList, TouchableOpacity, View, Image } from 'react-native'
import styles from './style';

export default function JanrFilterCarusel({data,selectedJanrId, setSelectedJanrId, selectJanr}) {

    
    const renderItem = ({item}) =>{
        let focus = selectedJanrId.some(i=>i.id==item.id)
        return <TouchableOpacity  onPress={() => selectJanr(item)}>
                    <View style={{...styles.card,backgroundColor:focus?'#E41A4B':'#1c1c1c'}}>
                        <Image 
                            style={styles.image}
                            source={focus ? {uri:'http://play.tvcom.uz:8009/storage/' +item.img2}: {uri:'http://play.tvcom.uz:8009/storage/' +item.img}
                        }/>
                        <Text allowFontScaling={false}style={{...styles.cardText}}>
                            {item.name}
                        </Text>
                    </View>
                </TouchableOpacity>
    }
  return (
    <>
        {data?<FlatList
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
                <TouchableOpacity onPress={()=>setSelectedJanrId([])}>
                    <View style={{...styles.card,backgroundColor:selectedJanrId.length?'#1c1c1c':'#E41A4B',marginLeft:10}}>
                        <Image 
                            style={styles.image}
                            source={selectedJanrId.length!=0?require('../../images/allTV0.png'):require('../../images/allTV1.png')}
                            />
                        <Text allowFontScaling={false}style={{...styles.cardText}}>
                            Все
                        </Text>
                    </View>
                </TouchableOpacity>
            }
            style={styles.wrapper}
            renderItem={renderItem}
            keyExtractor={(item,index) => item.id}
        />:<>
        <FlatList
            data={[11,12,13,14,51,61,17]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
                <TouchableOpacity onPress={()=>setSelectedJanrId([])}>
                    <View style={{...styles.card,backgroundColor:selectedJanrId.length?'#1c1c1c':'#E41A4B',marginLeft:10}}>
                        <Image 
                            style={styles.image}
                            source={selectedJanrId.length!=0?require('../../images/allTV0.png'):require('../../images/allTV1.png')}
                            />
                        <Text allowFontScaling={false}style={{...styles.cardText}}>
                            Все
                        </Text>
                    </View>
                </TouchableOpacity>
            }
            style={styles.wrapper}
            renderItem={()=><View style={{...styles.card,backgroundColor:'#1c1c1c'}}/>}
            keyExtractor={(item,index) => item}
        />
        </>}
    </>
  )
}
