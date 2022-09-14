import React,{ useEffect, useState, useRef } from 'react'
import { View, ScrollView, Text, TouchableWithoutFeedback, FlatList, Dimensions, Image } from 'react-native'
import { converter } from '../../helper';
import { getTime } from '../../Api';

import styles from './style';
const {width} = Dimensions.get('window');

export default function TimeShift({timeData,programData,fetchTimeShift,currentChannel}) {
    
    const [date,setDate] = useState()
    const [activeDay,setActiveDay] = useState()
    const [time,setTime] = useState()
    const [liveIndex,setLiveIndex] = useState()
    const flatlist = useRef()
    const scrollView = useRef()

    useEffect(() => {
      if(programData&&programData.data){
        const date = Object.keys(programData.data);
        if(date[date.length-1]){
            setActiveDay(date[date.length-1])
        }
        setDate(date)
      }
    
    }, [programData])

    useEffect(()=>{
        let render = true
        const fetch = async () =>{
            const time = await getTime()
            if(time&&render){
              setTime(time)
            }    
        }
        fetch()
        return ()=>{
            render = false
        }
    },[])

    useEffect(()=>{
        if(liveIndex&&flatlist.current){
            if(activeDay==date[date.length-1]){
                flatlist.current.scrollToIndex({
                    index:liveIndex,
                    animated:false
                })
            }
        }
    },[liveIndex,activeDay])


    const renderItem = ({item,index}) =>{
        let X =  (width-40)-60*1.71-10
        let live = time>Number(item.begin_time)&&time<Number(item.end_time)
        if(live){
            setLiveIndex(index)
            const length = (width-40)-60*1.71-10
            const begin = Number(item.begin_time)
            const end = Number(item.end_time)
            const sum = end - begin
            const current = (end - time)
            if(begin!=0&&end!=0){
              X = Math.floor((current*length)/sum)
            }
        }
        const future = !live && (time<item.end_time)
        const past =  !live && (time>item.end_time)

        const focused = timeData.begin_time&&timeData.rpg&&timeData.rpg.id == item.id

       return   <View style={{...styles.full,backgroundColor:focused?'#1c1c1c':'#010101'}}>
                    <TouchableWithoutFeedback onPress={()=>fetchTimeShift(item.begin_time)}>
                        <View style={styles.item}>
                            <View  style={styles.previewWrapper}>
                                {item.preview&&item.preview.length?<Image style={styles.preview} source={{uri:item.preview}}/>:currentChannel?<Image style={styles.preview} source={{uri:currentChannel.icon}}/>:<></>}
                                {live?<Image style={styles.shine} source={require('../../images/shine.png')}/>:<></>}
                                {past?<Image style={styles.watched} source={require('../../images/watchedSymbol.png')}/>:<></>}
                            </View>
                            <View style={styles.textBlock}>
                                <Text allowFontScaling={false}numberOfLines={1} style={{...styles.name,color:future?'#545252':live? '#E41A4B': '#fff'}}>{item.name}</Text>
                                <Text allowFontScaling={false}style={{...styles.time,color:future?'#545252':live? '#E41A4B': '#fff'}}>{converter(item.begin_time)}-{converter(item.end_time)}</Text>
                                {live?<View style={styles.processWrapper}>
                                    <View style={{...styles.process,width:X}}></View>
                                </View>:<></>}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
    }

  return (
    <View style={styles.wrapper}>
        <ScrollView ref={scrollView} onLayout={()=>{scrollView.current?scrollView.current.scrollToEnd():""}} showsHorizontalScrollIndicator={false} style={styles.slider} horizontal={true}>
            {date&&date.map(item=>{
                return <TouchableWithoutFeedback key={item} onPress={()=>setActiveDay(item)}>
                            <View style={{...styles.day,backgroundColor:activeDay===item?'#E41A4B':'#1c1c1c'}} >
                                <Text allowFontScaling={false}style={styles.dayText}>{item}</Text>
                            </View>
                        </TouchableWithoutFeedback>
            })}
        </ScrollView>
        {programData&&date&&activeDay&&programData.data[activeDay]&&time?
        <FlatList
            data={programData.data[activeDay]}
            renderItem={renderItem}
            ref={flatlist}
            key={activeDay}
            getItemLayout={(data, index) => (
                {length: 70, offset: 70 * index, index}
              )}
            keyExtractor={item => item.id + ' ' + time + ' ' + activeDay}
        />:<></>}
    </View>
  )
}
