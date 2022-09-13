import React from 'react'
import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import styles from './style'

export default function FilterYears({years,selectedYears,setSelectedYears}) {
    
    const setYear = (item) =>{
        const arr = [...selectedYears]
        if(item.name==='Все'){
            setSelectedYears([])
            return
        }
        if(selectedYears.length==0){
            setSelectedYears([item])
            return
        }
        if(arr.length){
            if(arr.filter(i=>i.name==item.name).length){
                setSelectedYears(arr.filter(i=>i.name!=item.name))
            }else{
                arr.push(item)
                setSelectedYears(arr)
            }
        }
    }

    const renderItem = ({item,index}) =>{
        let focus = selectedYears.some(i=>i.name==item.name)
        return <>
            <TouchableOpacity onPress={()=>setYear(item)}>
                <Text allowFontScaling={false}style={{...styles.year,backgroundColor:focus?'#E41A4B':selectedYears.length==0&&index==0?'#E41A4B':'#1c1c1c'}}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        </>
    }

  return (
    <View>
        {years?
            <FlatList
                data={years}
                renderItem={renderItem}
                horizontal={true}
                style={{marginBottom:10}}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => { return item.name}}
            />
        :<></>}
    </View>

  )
}
