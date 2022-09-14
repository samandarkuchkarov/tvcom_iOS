import React, { useContext,useState,useEffect,useRef } from 'react'
import { View, Text, Dimensions, Animated, Image, ActivityIndicator, TouchableOpacity,FlatList } from 'react-native'
import { globalStyles } from '../../utils/constants'
import { Datas } from '../../context';
import { getData, getFullChannels, getTime } from '../../Api';
import styles from './style';
import { converter } from '../../helper';
import ModalToken from '../../components/ModalToken';
import TariffModal from '../../components/TariffModal';

const {width} = Dimensions.get('window');

export default function PodpiskaTv({navigation}) {

    const { isLogin, checkToken, getUserInfo, removeTariff, getPrice, getTariffs, buyTariff } = useContext(Datas)

    const [tvlist,setTvlist] = useState({all:[],filtered:[]})
    const [mounted,setMounted] = useState(false)
    const [time,setTime] = useState(0)
    const [alert,setAlert] = useState(false)
    const scrollY = useRef(new Animated.Value(0)).current
    const [tariff,setTariff] = useState()
    const [message, setMessage] = useState('');
    const [reload,setReload] = useState(-1)
    const [agree,setAgree] = useState()
    const [chosedTariff, setChosedTariff] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [showUnsubModal,setShowUnsubModal] = useState(false)

    const subscribe = async () => {
        const status = await buyTariff(7,true);
        switch (status.error) {
          case 0:
            setMessage('Вы успешно приобрели услугу');
            if(reload==-1){
                setReload(false);
            }else{
                setReload(i => !i);
            }
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
    const status = await removeTariff(7);
    switch (status.error) {
        case 0:
        setMessage('Вы успешно отключили услугу');
        if(reload==-1){
            setReload(false);
        }else{
            setReload(i => !i);
        }
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
        setAgree(`Напоминаем, что средства за ранее используемую подписку не подлежат возврату. Действие подписки будет активна в течении оплаченного периода`);
        setShowUnsubModal(true)
      }
    } else {
        subscribe();
    }
    };
    
    useEffect(() => {
      let render = true;
      const fetch = async () => {
        
        let data = await getFullChannels();
        let freeChannels = [4,1,137,42,67,51,50,49,53,60,56,58,54,62,84,52,15,55]
        for(let i = 0;i<freeChannels.length;i++){
            data = data.filter(item=>item.id!=freeChannels[i])
        }
        setTvlist({
            all:data,
            filtered:data
        })
        
        if (render) {
          setMounted(true)
        }
      };
  
      if (isLogin == 1 || isLogin == 0) {
        fetch();
      }
      return () => {
        render = false;
      };
    }, [isLogin]);

    useEffect(() => {

      const unsubscribe = navigation.addListener('focus', async () => {
          const time = await getTime()
          if(isLogin){
            let status = await checkToken(true);
            if (status == 0) {
              setAlert(true);
            }
            const userData = await getUserInfo();
            if(userData){
              const tariffImage = await getTariffs()
              const imageinside = tariffImage.filter(i=>i.tariff_id==7)[0].imageinside
              const tariff = userData&&userData.tariffs.item.filter(i=>i.id==7)[0];
              tariff.imageinside = imageinside
              setTariff(tariff)
            }else{
              const imageinside = tariffImage.filter(i=>i.tariff_id==7)[0]
              setTariff(imageinside)
            }
          }
          if(time){
            setTime(time)
          }    
      });
  
      return unsubscribe;
      
    }, [navigation]);
  
    useEffect(()=>{
        const fetch = async () =>{
            const userData = await getUserInfo();
            const tariffImage = await getTariffs()
            if(userData){
              const imageinside = tariffImage.filter(i=>i.tariff_id==7)[0].imageinside
              const tariff = userData&&userData.tariffs.item.filter(i=>i.id==7)[0];
              tariff.imageinside = imageinside
              setTariff(tariff)
            }else{
              const imageinside = tariffImage.filter(i=>i.tariff_id==7)[0]
              setTariff(imageinside)
            }
        }
        fetch()
    },[reload])

    const renderItem = ({item,index}) => {
      const length = width-142-50
      const begin = Number(item.program_begin_time)
      const end = Number(item.program_end_time)
      const sum = end - begin
      const current = (end - time)
      let X =  width-142-50

      if(begin!=0&&end!=0){
        X = (current*length)/sum
      }
      
      return  <View style={{...styles.item}}>
                      <View style={{...styles.imageWrapper}}>
                         {item.has_subscription==0?
                          <View style={styles.lockWrapper}>
                             <Image style={styles.lock} source={require('../../images/lock.png')}/>
                          </View>
                            :<></>}
                          <Image 
                            style={styles.icon}
                            source={{ 
                              uri:item.icon
                            }}/>
                      </View>
                      <View style={styles.textBlock}>
                          <Text allowFontScaling={false}numberOfLines={2} style={styles.program_name}>{item.program_name?item.program_name:item.name}</Text>
                          <View style={styles.loveBlock}>
                            <Text allowFontScaling={false}style={styles.time}>{converter(item.program_begin_time)}-{converter(item.program_end_time)}</Text>
                          </View>
                          <View style={styles.processBlock}>
                            <View style={{...styles.redLine,width:X}}></View>
                          </View>
                      </View>
                </View>

    }

    const openModal = async () => {
      if(isLogin){
        if(tariff){
            if(tariff.is_assigned){
              setAgree(`Вы точно хотите отменить подписку на ${tariff.name} ?`);
              setChosedTariff(tariff)
            }else{
              let price = await getPrice(7);
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

    const exit = ()=>{
      if(reload==false){
        navigation.goBack()
      }
    }
  
    return (
        <View style={globalStyles.container}>
            {!alert?<TariffModal setShowUnsubModal={setShowUnsubModal} showUnsubModal={showUnsubModal} exit={exit} visible={modalVisible} setVisible={setModalVisible} agree={agree} message={message} setMessage={setMessage} action={action} />:<></>}
            {alert?<ModalToken navigation={navigation}/>:<></>}
            {tvlist.filtered?
                <FlatList
                    // onScroll={Animated.event([{nativeEvent:{contentOffset:{y:scrollY}}}],{useNativeDriver:true})}
                    renderItem={renderItem}
                    ListHeaderComponent={
                    <View style={styles.header}>
                      <Text allowFontScaling={false}style={styles.title}>Оформите подписку</Text>
                      {tariff?<Image source={{uri:`http://play.tvcom.uz:8008/storage/` + tariff.imageinside}} style={styles.infoImage}/>:<></>}
                      {tariff?<TouchableOpacity onPress={openModal}>
                          <View style={styles.btn}>
                              {isLogin?<Text allowFontScaling={false} style={{...styles.tariffBtnText}}>{tariff.is_assigned?'Отменить':'Купить'}</Text>:<></>}
                              {!isLogin?<Text allowFontScaling={false} style={{...styles.tariffBtnText}}>Авторизоваться</Text>:<></>}
                          </View>
                      </TouchableOpacity>:<></>}
                    </View>}
                    data={tvlist.filtered}
                    keyExtractor={item => item.id + ' ' + item.is_favorited + ' ' + item.has_subscription}
                />:
                <View style={styles.center}>
                    <ActivityIndicator size='large' color='#fff' />
                </View>}

        </View>
    )
}
