import React, { useContext } from 'react'
import {View, Text, Image, FlatList,Dimensions, TouchableOpacity} from 'react-native';
import styles from './style';
import FilmCardPhone from '../FilmCardPhone';
import { Datas } from '../../context';

const {width, height} = Dimensions.get('window');

export default function FilmCaruselPhone({movieContent,isLogin,subscriptions,providerIcons,name,navigation,SecondFunc,push,params}) {
    
    const {isWorld} = useContext(Datas)
    const onPress = (item) =>{
        if(push){
            navigation.push('CurrentMovie',item)
        }else{
            navigation.navigate('CurrentMovie',item)
        }
    }
    function renderItem({item,index}){

        return  <View style={{marginRight:10,marginLeft:index==0?10:0}}>
                    <FilmCardPhone onPress={()=>{onPress(item);SecondFunc?SecondFunc():''}} navigation={navigation} subscriptions={subscriptions} providerIcons={providerIcons} isLogin={isLogin}  item={item} />
                </View> 
    }
    function renderItem2({item,index}){

        return  <View style={{marginRight:10,marginLeft:index==0?10:0,height:252.5+45,width:170,backgroundColor:'#1c1c1c'}}>
                    
                </View> 
    }

    const listData = isWorld?movieContent.filter(i=>i.video_provider_id==1||i.video_provider_id==2):movieContent
    return (
        <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.title}>{name}</Text>
            {listData&&listData.length?
            <FlatList
                data={listData}
                renderItem={renderItem}
                keyExtractor={item => { return item.id}}
                horizontal={true}
                extraData={[isLogin,subscriptions]}
                showsHorizontalScrollIndicator={false}
                initialNumToRender={9}
                 ListFooterComponent={
                    params ? 
                    <TouchableOpacity onPress={()=>navigation.navigate('MovieList',{mainProps:params})}>
                        <View style={styles.block}>
                            <View style={styles.block3}>
                                <Image style={styles.dotts} source={require('../../images/3dotts.png')}/>
                            </View>
                            <View style={styles.block2}>
                            <Text style={styles.name2} numberOfLines={2}>
                                Еще
                            </Text>
                            <Text style={styles.textAviable}></Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    :<></>
                }
            />:<>
            <FlatList
                data={[1,2,3,4,5,6,7]}
                renderItem={renderItem2}
                keyExtractor={item => { return item}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
            </>}
        </View>
    )
}
