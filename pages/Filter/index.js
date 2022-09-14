import React,{ useContext, useEffect, useState, useRef } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View, Animated } from 'react-native'
import styles from './style'
import JanrFilterCarusel from '../../components/JanrFilterCarusel'
import { Datas } from '../../context'
import { yearsList, countries as listCountries } from '../../helper'
import FilterYears from '../../components/FilterYears'
import Cinema from '../../components/Cinema'
import ModalToken from '../../components/ModalToken';

export default function Filter({navigation}) {

    const [janres,setJanres] = useState();
    const [selectedJanrId,setSelectedJanrId] = useState([]);
    const {getJanr,checkToken, isLogin} = useContext(Datas)
    const [year,setYears] = useState()
    const [selectedYears,setSelectedYears] = useState([])
    const [countries, setCountries] = useState([]);
    const [selectedCountries,setSelectedCountries] = useState([])
    const [type,setType] = useState()
    const [cinema,setCinema] = useState()
    const [selectedCinema,setSelectedCinema] = useState({id:-1})
    const [alert, setAlert] = useState(false);
    
    useEffect(() => {
        const fetch = async () => {
          const unsubscribe = navigation.addListener('focus', async () => {
            if(isLogin){
              let status = await checkToken(true);
              if (status == 0) {
                setAlert(true);
              }
            }
          });
          return unsubscribe;
        };
        fetch();
      }, [navigation]);


    useEffect(() => {
      let render = true
      const fetch=async()=>{
            const janres = await getJanr();
            if(render&&janres){
                setJanres(janres)
            }
            const currentYear = new Date().getFullYear();
            let years = [{check: 1, name: 'Все'}];
            for(let i = currentYear; i > currentYear - 20; i--){
                if(i%10==0){
                    break
                }
                years.push({check: false, name: i});
            }
            years = [...years,...yearsList]
            if(years.length>28){
                let remove = years.length - 28
                for(let i = 0;i<remove;i++){
                    years.pop()
                }
            }
            setYears(years)
            setCountries([
                {name:'Все'},
                ...listCountries.map(i=>{
                    return {name:i}
                })
            ])
      }
      fetch()
      return () => {
        render = false
      }
    }, [])

    const selectJanr = item => {
        const arr = [...selectedJanrId]
        if(selectedJanrId.length==0){
            setSelectedJanrId([item])
            return
        }
        if(arr.length){
            if(arr.filter(i=>i.id==item.id).length){
                setSelectedJanrId(arr.filter(i=>i.id!=item.id))
            }else{
                arr.push(item)
                setSelectedJanrId(arr)
            }
        }
    };
    
   const submit = async () =>{
    const data ={ }
    if(selectedJanrId.length){
        data.genre = selectedJanrId.map(i=>i.gid).join(',')
    }
    if(selectedCountries.length){
        data.country = selectedCountries.map(i=>i.name).join(',') 
    }
    if(selectedYears.length){
        let yearParam = []
        if(selectedYears.length){
          selectedYears.forEach(element => {
            if(element.name){
              if(!`${element.name}`.includes('до')){
                if(`${element.name}`.includes('-')){
                    let space = `${element.name}`.split('-')
                    for(let i = Number(space[0]);i<=Number(space[1]);i++){
                      yearParam.push(i)
                    }
                }else{
                  yearParam.push(Number(element.name))
                }
              }else{
                for(let i = 1920;i<=1985;i++){
                  yearParam.push(i)
                }
              }
            }
          })
        }
        data.year =  [...new Set(yearParam)].join(',')
       
    }
    if(type&&type.length){
        data.order = type
    }
    if(selectedCinema.id!=-1){
        data.video_provider_id = selectedCinema.provider_id
    }
    navigation.push('MovieList',{
        mainProps:data,
        visibleData:{
            selectedJanrId,
            selectedYears,
            selectedCountries,
            type,
            cinema:selectedCinema.id!=-1?[selectedCinema]:false
        }
    })
    
   }
   const clear = ()=>{
    setSelectedJanrId([])
    setSelectedCountries([])
    setSelectedYears([])
    setType('')
    setSelectedCinema({id:-1})
   }

   

  return (
    <View style={styles.wrapper}>
         {alert?<ModalToken navigation={navigation}/>:<></>}
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                <Text allowFontScaling={false}style={styles.title}>Фильтры</Text>
                <View style={styles.typesContainer}>
                    <TouchableOpacity onPress={()=>setType(type=='-premiere_date'?'':'-premiere_date')}>
                        <View style={{...styles.type,backgroundColor:type=='-premiere_date'?'#E41A4B':'#1c1c1c'}}><Text allowFontScaling={false}style={styles.typeText}>по дате премьеры</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setType(type=='-average_customers_rating'?'':'-average_customers_rating')}>
                        <View style={{...styles.type,backgroundColor:type=='-average_customers_rating'?'#E41A4B':'#1c1c1c'}}><Text allowFontScaling={false}style={styles.typeText}>по рейтингу TVCOM</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setType(type=='-kinopoisk_rating'?'':'-kinopoisk_rating')}>
                        <View style={{...styles.type,backgroundColor:type=='-kinopoisk_rating'?'#E41A4B':'#1c1c1c'}}><Text allowFontScaling={false}style={styles.typeText}>по рейтингу Кинопоиска</Text></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setType(type=='-imdb_rating'?'':'-imdb_rating')}>
                        <View style={{...styles.type,backgroundColor:type=='-imdb_rating'?'#E41A4B':'#1c1c1c'}}><Text allowFontScaling={false}style={styles.typeText}>по рейтингу IMDB</Text></View>
                    </TouchableOpacity>
                    
    
                </View>
                <Text allowFontScaling={false}style={styles.titleCat}>Жанры</Text>
                <JanrFilterCarusel
                    data={janres}
                    selectJanr={selectJanr}
                    selectedJanrId={selectedJanrId}
                    setSelectedJanrId={setSelectedJanrId}
                />

                <View style={styles.selectYear}>
                    <Text allowFontScaling={false}style={styles.titleCat}>Годы</Text>
                </View>

                <FilterYears selectedYears={selectedYears} setSelectedYears={setSelectedYears} years={year}/>

                <View style={styles.selectYear}>
                    <Text allowFontScaling={false}style={styles.titleCat}>Страны</Text>
                </View>
                

                <FilterYears selectedYears={selectedCountries} setSelectedYears={setSelectedCountries} years={countries}/>
                <Text allowFontScaling={false}style={styles.titleCat}>Кинотеатры</Text>
                <Cinema setSelectedCinema={setSelectedCinema} selectedCinema={selectedCinema} cinema={cinema} setCinema={setCinema}/>

                <View style={styles.bottom}>

                </View>
            </ScrollView>
        </View>
        <View style={styles.btnContainer}>
            <TouchableOpacity onPress={submit}>
                <View style={styles.btnActive}>
                    <Text allowFontScaling={false}style={styles.btnText}>Показать результаты</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={clear}>
                <View style={styles.btnNotActive}>
                    <Text allowFontScaling={false}style={styles.btnText}>Сбросить Фильтры</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}
