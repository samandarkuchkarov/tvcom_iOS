import React,{ useEffect,useContext,useState } from 'react';
import {View, ActivityIndicator, Dimensions, FlatList } from 'react-native';
import {Datas} from '../../context'
import {globalStyles} from '../../utils/constants';
const {width} = Dimensions.get('window');
import { getSubscriptionList } from '../../Api';
import FilmCardPhone from '../../components/FilmCardPhone'
import styles from './style';

const numColoms = Math.trunc((width-10) / (170+10));

export default function Kids({navigation}) {
  const { isLogin, getFilms, getCinema, setToken,setLogin, apiKey, token } = useContext(Datas);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({
    value: 1,
    change: false,
  });
  const [providerIcons,setProviderIcons] = useState()
  const [subscriptions,setSubscriptions] = useState(false)


  useEffect(() => {
    let render = true
    const fetch = async () => {
      setLoading(true)
      let movies;
      movies = await getFilms({
        page: page.value,
        limit: numColoms * 8,
        genre: '10,105,99,161,104',
        device:'android'
      });
      if(movies.length==0){
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
  }, [page]);

  useEffect(() => {
    const fetch = async () => {
      const unsubscribe = navigation.addListener('focus', async () => {
        if(isLogin){
          let subscriptions = await getSubscriptionList(setToken,setLogin,apiKey,token,true)
          setSubscriptions(subscriptions) 
        }
      });
      return unsubscribe;
    };
    fetch();
  }, [navigation]);


  useEffect(() => {
    let render = true;

    const fetch = async () => {
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



  function renderItem({item,index}) {
    return (
      // item,providerIcons,isLogin,subscriptions,navigation
      <View style={styles.content}>
        <FilmCardPhone
          isLogin={isLogin}
          providerIcons={providerIcons}
          subscriptions={subscriptions}
          onPress={()=>{navigation.navigate('CurrentMovie',item)}}
          item={item}
        />

      </View>
    );
  }


  return (
    <View style={globalStyles.container}>
      {providerIcons && ( 
        <FlatList
          data={data}
          columnWrapperStyle={{width:width-10,marginLeft:5}}
          extraData={subscriptions}
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
            <View>
              {loading && <ActivityIndicator size="large" color="#fff" />}
            </View>
          )}
        />
      )}
    </View>
  );
}
