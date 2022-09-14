import React, { useContext } from 'react'
import { View,Dimensions } from 'react-native'
import styles from './style'
import TabBarComp from '../UI/TabBar'
const {width, height} = Dimensions.get('window');
import { Datas } from '../../context';

export default function TabBar({ref2,route}) {
    const {isLogin} = useContext(Datas)
    const data = [
        {
            name:'Главная',
            nav:'Home',
            src:require('../../assets/images/Tab/home0.png')
        },
        {
            name:'Телевидение',
            nav:'TvList',
            src:require('../../assets/images/Tab/TV.png')
        },
        {
            name:'Кинотеатр',
            nav:'Movie',
            src:require('../../assets/images/Tab/Cinema.png')
        },
        {
            name:'Интересное',
            nav:'Interesting',
            src:require('../../assets/images/Tab/Interesting.png')
        },
        {
            name: isLogin?'Профиль':'Вход',
            nav:'Profile',
            src: isLogin? require('../../assets/images/Tab/profile.png'):require('../../assets/images/Tab/exit.png')
        },
    ]

  return (
    <View style={styles.content}>
        {data.map(item=>{
            return <TabBarComp nav={item.nav}  ref2={ref2} color={'rgba(255, 255, 255, 0.3)'} key={item.name} name={item.name} focused={route.name===item.nav} src={item.src}/>
        })}
    </View>
  )
}
