import React, {useState,useEffect,useContext} from 'react'
import { View, Image, TextInput, Text, Keyboard, FlatList, Dimensions, ActivityIndicator } from 'react-native'
import styles from './style'
import { Datas } from '../../context';
import FilmCardPhone from '../../components/FilmCardPhone';
import { getSubscriptionList } from '../../Api';
import ModalToken from '../../components/ModalToken';

const {width} = Dimensions.get('window');
let numColoms = Math.trunc((width - 10) / (170+10));
numColoms = numColoms==1?2:numColoms

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
        let movieContent = await searchFilm(text,40);
        if (render) {
            setMovieContent(movieContent);
            setResult(true)
        }
        } else {
            let movieContent = await getFilms({
                order:'-average_customers_rating',
                limit:32,
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
  
    function renderItem({item,index}) {
      return (
        <View style={styles.content}>
          <FilmCardPhone
            isLogin={isLogin}
            onPress={()=>{navigation.navigate('CurrentMovie',item)}}
            providerIcons={providerIcons}
            subscriptions={subscriptions}
            item={item}
            navigation={navigation}
          />
  
        </View>
      );
    }
  

  return (
    <View style={styles.wrapper}>
      {alert?<ModalToken navigation={navigation}/>:<></>}
        <View style={styles.textAreContent}>
            <Image source={require('../../images/Search.png')} style={styles.searchIcon}/>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                blurOnSubmit={true}
                onSubmitEditing={(e)=>Keyboard.dismiss()}
                placeholderTextColor='#bcbcbc'
                placeholder="Фильм, сериал или шоу"
            />
        </View>
          <TextInput
              style={{height:0,fontSize:0}}
          />

          <View style={{marginTop:0,marginBottom:100}}>
            {providerIcons&&movieContent&&movieContent.length!=0?
            <FlatList
              data={movieContent}
              renderItem={renderItem}
              columnWrapperStyle={{width:width-10,marginLeft:5}}
              onEndReachedThreshold={0.1}
              numColumns={numColoms}
              ListHeaderComponent={<>
                <Text style={styles.title}>{result?'Все Результаты':'Рекомендуем к просмотру:'}</Text>
              </>}
              keyExtractor={(item,index) => {
                return`${index} ${isLogin} ${subscriptions&&subscriptions.length}`}}
            />
            :<></>}
            {text.length!==0&&movieContent&&movieContent.length==0?<>
              <Text allowFontScaling={false}style={styles.empty}>
                Ничего не нашлось
              </Text>
            </>:<></>}

          </View>
          
    </View> 
  )
}
