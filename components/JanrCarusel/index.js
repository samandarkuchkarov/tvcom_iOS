import React from 'react'
import { Text, FlatList, TouchableOpacity, View } from 'react-native'
import styles from './style';
import FastImage from 'react-native-fast-image';

export default function JanrCarusel({data,selectedJanrId, setSelectedJanrId}) {
    const selectJanr = item => {
        if(selectedJanrId==item.gid){
          setSelectedJanrId(false);
        }else{
          setSelectedJanrId(item.gid);
        }
        
    };

    const renderItem = ({item,index}) =>{
        return <TouchableOpacity   onPress={() => selectJanr(item)}>
                  <View style={{...styles.btn,backgroundColor:item.gid == selectedJanrId? '#E41A4B' : '#1c1c1c'}}>
                    <Text allowFontScaling={false}style={styles.cardText}>
                        {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
    }
    
  return (
    <View>
        <FlatList
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
            <TouchableOpacity onPress={()=>setSelectedJanrId(false)}>
              <View style={{...styles.btn,marginLeft:20,backgroundColor:selectedJanrId ? '#1c1c1c': '#E41A4B'}}>
                <Text allowFontScaling={false}style={styles.cardText}>
                  Все
                </Text>
              </View>
            </TouchableOpacity>}
            style={styles.wrapper}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
    </View>
  )
}






// const getBillingList = []
// const getBitrixList = []

// for (let index = 0; index < getBillingList.length; index++) {

// }