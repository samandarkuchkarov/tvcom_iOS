import React,{ useEffect,useContext,useState } from 'react';
import {View, ActivityIndicator, Dimensions, FlatList } from 'react-native';
import {Datas} from '../../context'
import {globalStyles} from '../../utils/constants';
import FilmCardPhone from '../../components/FilmCardPhone'
import styles from './style';
import JanrCarusel from '../../components/JanrCarusel';
import { getSubscriptionList } from '../../Api';

const {width} = Dimensions.get('window');
const numColoms = Math.trunc((width - 10) / (170+10));

export default function Serial({navigation}) {
  const { isLogin, getFilms, getJanr, getCinema, janrTv, setJanrTv, setToken, setLogin, apiKey, token } = useContext(Datas);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({
    value: 1,
    change: false,
  });
  const [janres, setJanres] = useState([]);
  const [selectedJanrId, setSelectedJanrId] = useState('');
  const [providerIcons,setProviderIcons] = useState()
  const [subscriptions,setSubscriptions] = useState(false)

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
    let render = true
    const fetch = async () => {
      setLoading(true)
      let movies;
      movies = await getFilms({
        page: page.value,
        season: 1,
        limit: numColoms * 8,
        genre: selectedJanrId==false?'':selectedJanrId,
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
    let render = true;

    const fetch = async () => {
  
        let defaultJanr = janrTv
        if(defaultJanr.length==0){
          let janres = await getJanr();
          defaultJanr = janres.filter(i=>i.season!=1)
          setJanrTv(janres)
        }
        if (render) {
          defaultJanr = defaultJanr.filter(i=>i.season!=1)
          defaultJanr = defaultJanr.sort((a,b)=>{
            let aa = a.sort
            let bb = b.sort
            if(!aa){
              aa=10
            }
            if(!bb){
              bb=10
            }
            return Number(aa)-Number(bb)
          })
          setJanres(defaultJanr);
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


  useEffect(() => {
    if (selectedJanrId||selectedJanrId==false) {
      setData([]);
      setLoading(true);
      setPage(old => {
        let New = {...old};
        New.value = 1
        New.change = !old.change;
        return New;
      });
    }
  }, [selectedJanrId]);

  function renderItem({item,index}) {
    return (
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
      <JanrCarusel
        selectedJanrId={selectedJanrId}
        setSelectedJanrId={setSelectedJanrId}
        data={janres}
      />
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
