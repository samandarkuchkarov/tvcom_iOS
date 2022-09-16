import React,{ useEffect,useContext,useState } from 'react';
import {View, ActivityIndicator, Dimensions, FlatList, Text, TouchableOpacity,Image } from 'react-native';
import {Datas} from '../../context'
import {globalStyles} from '../../utils/constants';
import FilmCardPhone from '../../components/FilmCardPhone'
import styles from './style';
import ModalToken from '../../components/ModalToken';
import { getData } from '../../Api';
import TariffModal from '../../components/TariffModal';



const {width} = Dimensions.get('window');
const numColoms = Math.trunc((width - 10) / (170+10));

export default function PodpiskaMovie({navigation,route}) {
  const {checkToken, isLogin, getFilms, setToken, setLogin,apiKey, getCinema, token, buyTariff, removeTariff, getPrice, getTariffs, getUserInfo, } = useContext(Datas);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState({
    value: 1,
    change: false,
  });
  const [alert,setAlert] = useState(false)
  const [providerIcons,setProviderIcons] = useState()
  const [subscriptions,
  ] = useState(false)
  const [visible,setVisible] = useState(true)

  const [message, setMessage] = useState('');
  const [reload,setReload] = useState(false)
  const [agree,setAgree] = useState()
  const [chosedTariff, setChosedTariff] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [tariff,setTariff] = useState()
  const [showUnsubModal,setShowUnsubModal] = useState(false)

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
      movies = await getFilms({
        page: page.value,
        limit: numColoms * 8,
        device:'android',
        video_provider_id:tariff.provider_id
        
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
    if(tariff){
        fetch();
    }
    return ()=>{
      render = false
    }
  }, [page,tariff]);


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
  }, [isLogin,reload]);


  const subscribe = async () => {
    const status = await buyTariff(chosedTariff.tariff_id,true);
    switch (status.error) {
      case 0:
        setMessage('Вы успешно приобрели услугу');
        setReload(i => !i);
        break;
      case 1:
        setMessage(
          'Один или несколько из переданных тарифов не доступны, не существуют, либо уже подключены.',
        );
        break;
      case 2:
        let abonement = await getData('abonement')
        setMessage(`Недостаточно средств. необходимо пополнить баланс введя номер абонемента: ${abonement.number} в любой из предоставленных ниже платежных систем `);
        break;
      case 3:
        setMessage('Тариф уже подключен.');
        break;
      case 4:
        setMessage('Неправильно настроен внутренний api.');
        break;
      case 5:
        setMessage('Невозможно подключить больше одного базового тарифа.');
        break;
      case 105:
        setMessage('Ошибка обработчика API.');
        break;
      case 120:
        setMessage('Не передан ни tariff_id, ни virtual_tariff_id.');
        break;
      default:
        setMessage(JSON.stringify(status));
    }
    
  };
  
  const unsubscribe = async () => {
    const status = await removeTariff(chosedTariff.tariff_id);
    switch (status.error) {
      case 0:
        setMessage('Вы успешно отключили услугу');
        setReload(i => !i);
        break;
      case 1:
        setMessage('Один или несколько из переданных тарифов не подключены.');
        break;
      case 2:
        setMessage(
          'Один из переданных тарифов является базовым, его отключение недоступно.',
        );
        break;
      case 4:
        setMessage('Неправильно настроен внутренний api.');
        break;
      case 105:
        setMessage('Ошибка обработчика API.');
        break;
      case 120:
        setMessage('Не передан ни tariff_id, ни virtual_tariff_id.');
        break;
      default:
        setMessage(status);
    }
  };
  
  const action = () => {
    if (chosedTariff.is_assigned == '1') {
      if(showUnsubModal){
        unsubscribe();
      }else{
        setAgree(`Напоминаем, что средства за ранее используемую подписку не подлежат возврату.`);
        setShowUnsubModal(true)
      }
    } else {
      subscribe();
    }
  };

  const openModal = async () => {
        if(isLogin){
          if(tariff){
              if(tariff.is_assigned){
                setAgree(`Вы точно хотите отменить подписку на ${tariff.name} ?`);
                setChosedTariff(tariff)
              }else{
                let price = await getPrice(tariff.tariff_id);
                let data = {...tariff}
                data.realPrice = price;
                setChosedTariff(data);
                setAgree(
                  `С вас будет списано ${Number(price)} сум. Подтвердить?`,
                );
              }
              setModalVisible(true);
          }
        }else{
          navigation.navigate('Login')
        }
  };

  useEffect(()=>{
    const fetch = async() => {
        let tariffs = await getTariffs();
        const userData = await getUserInfo();
        if(userData&&tariffs){
          let aviableTariffs = userData.tariffs.item;
          tariffs = tariffs.map(item => {
            let New = {...item}
            let currentTariff = aviableTariffs.filter(
              item2 => item2.id == item.tariff_id,
            );
            if(currentTariff[0]){
              New.is_assigned = currentTariff[0].is_assigned;
            }
            return New;
          });
          const tariff = tariffs.filter(i=>i.tariff_id==route.params.id)[0]
          if(tariff){
              setTariff(tariff)
          }
        }else if(tariffs){
          const tariff = tariffs.filter(i=>i.tariff_id==route.params.id)[0]
          setTariff(tariff)
        }
    }
    fetch()
  },[route.params,reload])
  
  useEffect(()=>{
    setPage({
      value: 1,
      change: false,
    });
    setLoading(true)

  },[reload])


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

  const exit = ()=>{
    if(reload==true){
      navigation.goBack()
    }
  }


  return (
    <View style={globalStyles.container}>
       {alert?<ModalToken navigation={navigation}/>:<></>}
       {!alert?<TariffModal  showUnsubModal={showUnsubModal} setShowUnsubModal={setShowUnsubModal} exit={exit} visible={modalVisible} setVisible={setModalVisible} agree={agree} message={message} setMessage={setMessage} action={action} />:<></>}
       {!visible&&data.length==0?<>
       </>:<>
        {providerIcons && ( 
          <FlatList
            data={data}
            columnWrapperStyle={{width:width-10,marginLeft:5}}
            extraData={subscriptions}
            ListHeaderComponent={
              <View style={styles.contentType}>
                <Text allowFontScaling={false}style={styles.title}>Оформите подписку</Text>
                {tariff?<Image  source={{uri: `http://play.tvcom.uz:8008/storage/` + tariff.imageinside}} style={styles.infoImage}/>:<></>}
                {tariff?
                <TouchableOpacity onPress={openModal}>
                    <View style={styles.btn}>
                        {isLogin?<Text allowFontScaling={false}style={{...styles.tariffBtnText}}>{tariff.is_assigned?'Отменить':'Купить'}</Text>:<></>}
                        {!isLogin?<Text allowFontScaling={false}style={{...styles.tariffBtnText}}>Авторизоваться</Text>:<></>}
                    </View>
                </TouchableOpacity>
                :<></>}
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
       
       </>}

    </View>
  );
}
