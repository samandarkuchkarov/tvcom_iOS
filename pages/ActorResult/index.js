import React,{ useEffect,useContext,useState } from 'react';
import {View, ActivityIndicator, Dimensions, FlatList, Text } from 'react-native';
import {Datas} from '../../context'
import {globalStyles} from '../../utils/constants';
import { getSubscriptionList } from '../../Api';
import FilmCardPhone from '../../components/FilmCardPhone'
import styles from './style';
import ModalToken from '../../components/ModalToken';


const {width} = Dimensions.get('window');
const numColoms = Math.trunc((width - 20) / (170+10));

export default function ActorResult({navigation,route}) {
  const {checkToken, isLogin, getFilms, setToken,setLogin,apiKey, getCinema, token, } = useContext(Datas);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({
    value: 1,
    change: false,
  });
  const [alert,setAlert] = useState(false)
  const [providerIcons,setProviderIcons] = useState()
  const [subscriptions,setSubscriptions] = useState(false)
  const [visible,setVisible] = useState(true)


  useEffect(() => {
    const fetch = async () => {
      const unsubscribe = navigation.addListener('focus', async () => {
        setLoading(true)
        setPage({
          value: 1,
          change: false,
        })
        setData([])

        if(isLogin){
          let status = await checkToken(true);
          if (status == 0) {
            setAlert(true);
          }
          let subscriptions = await getSubscriptionList(setToken,setLogin,apiKey,token,true)
          setSubscriptions(subscriptions) 
          
        }
      });
      return unsubscribe;
    };
    fetch();
  }, [navigation,isLogin]);


  useEffect(() => {
    let render = true
    const fetch = async () => {
      setLoading(true)
      let movies;
      movies = await getFilms({
        page: page.value,
        limit: numColoms * 8,
        device:'android',
        aid:route.params.aid
      });
      if(movies&&movies.length==0){
        setVisible(false)
        return
      }
      if(!movies){
        setVisible(false)
        return
      }
      if(movies&&movies.length<9){
        setVisible(false)
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
      {providerIcons && ( 
        <FlatList
          data={data}
          columnWrapperStyle={{width:width-20,marginLeft:10}}
          extraData={subscriptions}
          ListHeaderComponent={
            <View style={styles.contentType}>
                <Text allowFontScaling={false}style={styles.text}>Видео с {route.params.actor.name}</Text>
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
      )}
    </View>
  );
}
