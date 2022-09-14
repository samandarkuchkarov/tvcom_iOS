import React, {useState,useEffect,useContext} from 'react'
import { View, Image, TextInput, Text } from 'react-native'
import styles from './style'
import { Datas } from '../../context';
import FilmCaruselPhone from '../../components/FilmCaruselPhone';
import { getSubscriptionList } from '../../Api';
import ModalToken from '../../components/ModalToken';

export default function Search({navigation}) {

    const [text, onChangeText] = useState('');
    const [subscriptions,setSubscriptions] = useState(false)
    const { searchFilm, getCinema, isLogin, getFilms, setToken, setLogin, apiKey, token, checkToken } = useContext(Datas);
    const [providerIcons,setProviderIcons] = useState()
    const [movieContent, setMovieContent] = useState();
    const [result,setResult] = useState(false)
    const [alert,setAlert] = useState(false)

    useEffect(()=>{
        let render = true
        const fetch = async() =>{
          const providers = await getCinema()
          if(render){
            setProviderIcons(providers)
          }
        } 
        fetch()
        return () => {render = false}
      },[])

    useEffect(() => {
    let render = true;
    const fetch = async () => {
        if (text.length >= 3) {
        let movieContent = await searchFilm(text);
        if (render) {
            setMovieContent(movieContent);
            setResult(true)
        }
        } else {
            let movieContent = await getFilms({
                order:'-average_customers_rating',
                limit:16,
                device:'android'
            });
            setResult(false)
            if (render) {
                setMovieContent(movieContent);
            }
        }
    };
    fetch();
    return () => {
        render = false;
    };
    }, [text]);

    useEffect(() => {
        const fetch = async () => {
          const unsubscribe = navigation.addListener('focus', async () => {
            if(isLogin){
              let status = await checkToken(true);
              if (status == 0) {
                setAlertToken(false);
              }
            }
          });
          return unsubscribe;
        };
        fetch();
      }, [navigation]);
    
    useEffect(()=>{
        const fetch = async() =>{
          if(isLogin){
            let subscriptions = await getSubscriptionList(setToken,setLogin,apiKey,token,true)
            setSubscriptions(subscriptions)
          }
        }
        fetch()
    },[isLogin])

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


  return (
    <View style={styles.wrapper}>
      {alert?<ModalToken navigation={navigation}/>:<></>}
        <View style={styles.textAreContent}>
            <Image source={require('../../assets/images/search.png')} style={styles.searchIcon}/>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholderTextColor='#bcbcbc'
                placeholder="Фильм, сериал или шоу"
            />
        </View>

        
          {providerIcons?<FilmCaruselPhone
            rating={false}
            key={subscriptions?subscriptions.length:''}
            providerIcons={providerIcons}
            subscriptions={subscriptions}
            navigation={navigation}
            params={{search:text}}
            name={result?'Все Результаты':'Рекомендуем к просмотру:'}
            movieContent={movieContent}
            isLogin={isLogin}
          />:<></>}
          {text.length!==0&&movieContent.length==0?<>
            <Text allowFontScaling={false}style={styles.empty}>
              Ничего не нашлось
            </Text>
          </>:<></>}
          
    </View> 
  )
}
