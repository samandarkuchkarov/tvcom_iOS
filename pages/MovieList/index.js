import React,{ useEffect,useContext,useState } from 'react';
import {View, ActivityIndicator, Dimensions, FlatList, Text } from 'react-native';
import {Datas} from '../../context'
import {globalStyles} from '../../utils/constants';
import { getSubscriptionList } from '../../Api';
import FilmCardPhone from '../../components/FilmCardPhone'
import styles from './style';
import ModalToken from '../../components/ModalToken';

const {width} = Dimensions.get('window');
const numColoms = Math.trunc((width - 10) / (170+10));

export default function MovieList({navigation,route}) {
  const {checkToken, isLogin, getFilms, setToken, setLogin,apiKey, getCinema, token, } = useContext(Datas);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({
    value: 1,
    change: false,
  });
  const [alert,setAlert] = useState(false)
  const [providerIcons,setProviderIcons] = useState()
  const [subscriptions,setSubscriptions] = useState(false)
  const [actives,setActives] = useState([])
  const [types,setTypes] = useState()
  const [visible,setVisible] = useState(true)

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
    const fetch = async () => {
      setLoading(true)
      let movies;
      const params = route.params.mainProps
      movies = await getFilms({
        page: page.value,
        limit: numColoms * 8,
        ...params,
        device:'android'
        
      });
      if(movies&&movies.length==0){
        setVisible(false)
        return
      }
      if(!movies){
        setVisible(false)
        return
      }

      if(render){
        setData(old => {     
          return [...old, ...movies]
        });
        if(movies.length<numColoms){
          setLoading(true)
        }else{
          setLoading(false)
        }
      }
    };
    fetch();
    return ()=>{
      render = false
    }
  }, [page,route.params]);


  useEffect(() => {
    let render = true;

    const fetch = async () => {
        let subscriptions = await getSubscriptionList(setToken,setLogin,apiKey,token,true)
        if(render){
          setSubscriptions(subscriptions) 
        }
      const providers = await getCinema()
      if (render) {
        setProviderIcons(providers)
      }
    };
    fetch()
    return () => {
      render = false;
    };
  }, [isLogin]);

  useEffect(()=>{
    const visibleData = route.params.visibleData
    if(visibleData){
      const types = Object.keys(visibleData)
      setTypes(types)
      setActives(visibleData)
    }
  },[route.params])



  function renderItem({item,index}) {
    return (
      <View style={styles.content}>
        <FilmCardPhone
          isLogin={isLogin}
          onPress={()=>{navigation.navigate('CurrentMovie',item)}}
          providerIcons={providerIcons}
          subscriptions={subscriptions}
          item={item}
        />

      </View>
    );
  }



  return (
    <View style={globalStyles.container}>
       {alert?<ModalToken navigation={navigation}/>:<></>}
       
       {!visible&&data.length==0?<>
        <View style={styles.empty}>
            <View style={styles.emptyBlock}>
                <Text allowFontScaling={false}style={styles.emtypText}>Ничего не нашлось</Text>
            </View>
        </View>
       </>:<>
          <FlatList
            data={data}
            columnWrapperStyle={{width:width-10,marginLeft:5}}
            extraData={subscriptions}
            ListHeaderComponent={
              <View style={styles.contentType}>
                  <Text allowFontScaling={false}style={styles.typeText}>
                      {types&&types.length?types.map(i=>{
                          if(actives[i]=='-average_customers_rating'){
                              return <React.Fragment key={i}>
                                          <Text allowFontScaling={false}style={styles.name}>Сортировка: </Text>Рейтинг TVCOM PLAY{' '}
                                      </React.Fragment>
                          }
                          if(actives[i]=='-premiere_date'){
                              return <React.Fragment key={i}>
                                          <Text allowFontScaling={false}style={styles.name}>Сортировка: </Text>по дате премьеры{' '}
                                      </React.Fragment>
                          }
                          if(actives[i]=='-kinopoisk_rating'){
                              return <React.Fragment key={i}>
                                          <Text allowFontScaling={false}style={styles.name}>Сортировка: </Text>по рейтингу Кинопоиска{' '}
                                      </React.Fragment>
                          }
                          if(actives[i]=='-imdb_rating'){
                              return <React.Fragment key={i}>
                                          <Text allowFontScaling={false}style={styles.name}>Сортировка: </Text>по рейтингу IMDB{' '}
                                      </React.Fragment>
                          }
                          
                          if(actives[i]&&actives[i].length){
                              let name = ''
                              if(i=='selectedJanrId'){
                                  name = 'Жанры:'
                              }
                              if(i=='selectedYears'){
                                  name = 'Годы:'
                              }
                              if(i=='selectedCountries'){
                                  name = 'Страны::'
                              }
                              if(i=='type'){
                                  name = 'Сортировка:'
                              }
                              if(i=='cinema'){
                                name = 'Кинотеатр:'
                              }
                              return <React.Fragment key={i}>
                                  <Text allowFontScaling={false}style={styles.name}>{name} </Text>{actives[i].map(item=>item.name)+'  '}
                              </React.Fragment>
                          }else{
                              return <React.Fragment key={i}></React.Fragment>
                          }
                      }):<></>}
                  </Text>
              </View>
      
            }
            renderItem={renderItem}
            onEndReached={() => {
              if (!loading) {
                setLoading(true);
                setPage(old => {
                  let New = {...old};
                  New.value = old.value + 1;
                  return New;
                });
              }
            }}
            onEndReachedThreshold={0.1}
            numColumns={numColoms}
            keyExtractor={(item,index) => {
              return`${index} ${isLogin} ${subscriptions&&subscriptions.length}`}}
            ListFooterComponent={() => (
              visible?<View>
                {loading && <ActivityIndicator size="large" color="#fff" />}
              </View>:<></>
            )}
          />
       
       </>}

    </View>
  );
}
