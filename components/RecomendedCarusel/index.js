import React, { useContext, useEffect, useState } from 'react'
import {  ActivityIndicator, Dimensions, View } from 'react-native'
import { Datas } from '../../context';
import FilmCaruselPhone from '../FilmCaruselPhone';

const { width } = Dimensions.get('window');

import styles from './style'

const RecomendedCarusel = ({ navigation, providerIcons, subscriptions, actors, movie, SecondFunc }) => {

    const { getFilms, searchFilm, isLogin } = useContext(Datas)
    
    const [smilarContent,setSimilarContent] = useState([]);


    useEffect(()=>{
        let render = true;

        const fetch = async() => {
            if(actors.length){

                let recomended = []

                for (let i = 0;i<actors.length;i++){

                    let movies = await getFilms({aid:actors[i].id,limit:5,device:'android'})
                    movies = movies.filter((item)=>item.id)
                    if(movies.length){

                        for(let j = 0;j<recomended.length;j++){
                            movies = movies.filter((item)=>item.id != recomended[j].id)
                        }

                        recomended = [...recomended,...movies]
                    }

                    if(recomended.length>15){
                        
                        recomended = [...new Map(recomended.map(item =>[item['id'], item])).values()];
                        if(recomended.length>15){break}
                    }
                }
                if(render){
                    recomended =  recomended.filter(i=>i.id!==movie.id)
                    setSimilarContent(recomended)
                }
   

            }else{
                let smilar = await searchFilm(movie.name.slice(0, 3));

                if (smilar && smilar.length) {
                    smilar = smilar.filter(item => item.id != movie.id);
                    smilar =  smilar.filter(i=>i.id!==movie.id)
                    setSimilarContent(smilar)
                }
            }
        }

        if(Array.isArray(actors)){
            fetch()
        }

        return () => {render = false}

    },[actors,movie])


    return (

        <View style={styles.wrapper}>
                {smilarContent && smilarContent.length && providerIcons  ? 
                <FilmCaruselPhone
                    isLogin={isLogin}
                    push
                    providerIcons={providerIcons}
                    subscriptions={subscriptions}
                    SecondFunc={SecondFunc}
                    navigation={navigation}
                    name="Рекомендуем"
                    movieContent={smilarContent}
                />
                :<></>
                }
        </View>
    )
}

export default RecomendedCarusel
