import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableWithoutFeedback, View, TextInput, Dimensions, TouchableOpacity, ActivityIndicator, RefreshControl, Keyboard } from 'react-native';
import { globalStyles } from '../../utils/constants';
import PrimaryButton from '../../components/UI/Buttons/Primary';
import { Datas } from '../../context';
import styles from './style';
import { storeData, logoutApi, getData } from '../../Api';
import ModalToken from '../../components/ModalToken';
import TariffGroup from '../../components/TariffGroup';
import PromoModal from '../../components/PromoModal';
import TariffModal from '../../components/TariffModal';
import DebtModal from '../../components/DebtModal';
const {width} = Dimensions.get('window');


export default function Profile({navigation}) {

const { isLogin, setLogin, setToken, token, checkToken, getTariffs, getUserInfo, getPromo, getPrice, buyTariff, removeTariff,debtStatus } = useContext(Datas)
const [alert,setAlert] = useState(false)
const [showBtnList,setShowBtnList] = useState(false)
const [userData,setUserData] = useState()
const [tariffs, setTariffs] = useState({base: false, all: false,id:false});
const [monthly,setMonthly] = useState()
const [debtDel,setDebtDel] = useState(false)
const [loader,setLoader] = useState(true)
const [reload,setReload] = useState(false)
const [agree,setAgree] = useState()
const [chosedTariff, setChosedTariff] = useState();
const [modalVisible, setModalVisible] = useState(false);
const [promo,setPromo] = useState('')
const [PromoMessage, setPromoMessage] = useState('');
const [message, setMessage] = useState('');
const [phone,setPhone] = useState('')
const [refreshing, setRefreshing] = useState(false);
const [showUnsubModal,setShowUnsubModal] = useState(false)

const logout = async () => {
  await logoutApi(token,false)
  storeData('token', null);
  setLogin(0)
  setToken()
  
  navigation.navigate('Home')
};

useEffect(() => {
  const fetch = async () => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setReload(i=>!i)
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


React.useEffect(() => {
  let render = true;

  const fetch = async () => {
    setLoader(true)
    if (isLogin) {
      const userData = await getUserInfo();
      const abonement = await getData('abonement');
      let tariffs = await getTariffs();
      let base = tariffs.filter(item => item.tariff_id == 51)[0];
      tariffs = tariffs.filter(i => i.tariff_id !== 51);
      if (userData && render) {
        userData.abonement = abonement.number;
        setUserData(userData);
        setMonthly(userData.monthly_payment)
        let aviableTariffs = userData.tariffs.item;
        tariffs = tariffs.map(item => {
          let New = {...item}
          let currentTariff = aviableTariffs.filter(
            item2 => item2.id == item.tariff_id,
            );
         
          New.is_assigned = currentTariff[0].is_assigned;
          return New;
        });
        const sort = [32,35,7,23,24]
        let result = []
        sort.forEach(element => {
          result.push(tariffs.filter(item=>item.tariff_id==element)[0])
          tariffs = tariffs.filter(item=>item.tariff_id!=element)
        });
        result = [...result,...tariffs]
        setTariffs({
          base: base,
          all: result,
        });
        if(result.some(i=>i.is_assigned==1)){
          setDebtDel(true)
        }
      }
    } else {
      let tariffs = await getTariffs();
      let base = tariffs.filter(item => item.tariff_id == 51)[0];
      tariffs = tariffs.filter(i => i.tariff_id !== 51);
      const sort = [32,35,7,23,24]
      let result = []
      sort.forEach(element => {
        result.push(tariffs.filter(item=>item.tariff_id==element)[0])
        tariffs = tariffs.filter(item=>item.tariff_id!=element)
      });
      result = [...result,...tariffs]
      setTariffs({
        base: base,
        all: result,
      });
    }

    setLoader(false)
  };
  fetch();
  return () => {
    render = false;
  };
}, [isLogin, reload]);


const openModal = async tariff => {
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
};

const submitPromo = async () => {
  let status = await getPromo(promo);
  switch (status.error) {
    case 0:
      setPromoMessage(`Промокод успешно активирован`);
      setReload(i => !i);
      break;
    case 1:
      setPromoMessage(`Промокод не найден.`);
      break;
    case 2:
      setPromoMessage(`Ошибка валидации промо-кода.`);
      break;
    case 3:
      setPromoMessage(`Промо-код уже активирован.`);
      break;
    case 4:
      setPromoMessage(`Срок действия истёк или ещё не наступил.`);
      break;
    case 5:
      setPromoMessage(`Неизвестная ошибка.`);
      break;
    default:
      setPromoMessage(JSON.stringify(status));
  }
};

useEffect(()=>{
  if(userData&& typeof userData.mobile_phone_number == 'number'){
    let num = `${userData.mobile_phone_number}`.replace('998','')
    if(num.length==9){
      let arr = []
      for(let i =0;i<num.length;i++){
        arr.push(num[i])
        if(i==1){
          arr.push(' ')
        }
        if(i==4){
          arr.push('-')
        }
        if(i==6){
          arr.push('-')
        }
      }
      let phone = arr.join('')
      setPhone(phone)
    }
  }
},[userData])

const onRefresh = async()=>{
  setRefreshing(true)
  if (isLogin) {
    const userData = await getUserInfo();
    const abonement = await getData('abonement');
    let tariffs = await getTariffs();
    let base = tariffs.filter(item => item.tariff_id == 51)[0];
    tariffs = tariffs.filter(i => i.tariff_id !== 51);

    if (userData) {
      userData.abonement = abonement.number;
      setUserData(userData);
      setMonthly(userData.monthly_payment)
      let aviableTariffs = userData.tariffs.item;
      tariffs = tariffs.map(item => {
        let New = {...item}
        let currentTariff = aviableTariffs.filter(
          item2 => item2.id == item.tariff_id,
        );
        New.is_assigned = currentTariff[0].is_assigned;
        return New;
      });
      const sort = [32,35,7,23,24]
      let result = []
      sort.forEach(element => {
        result.push(tariffs.filter(item=>item.tariff_id==element)[0])
        tariffs = tariffs.filter(item=>item.tariff_id!=element)
      });
      result = [...result,...tariffs]
      setTariffs({
        base: base,
        all: result,
      });
      if(result.some(i=>i.is_assigned==1)){
        setDebtDel(true)
      }
    }
  } else {
    let tariffs = await getTariffs();
    let base = tariffs.filter(item => item.tariff_id == 51)[0];
    tariffs = tariffs.filter(i => i.tariff_id !== 51);
    const sort = [32,35,7,23,24]
    let result = []
    sort.forEach(element => {
      result.push(tariffs.filter(item=>item.tariff_id==element)[0])
      tariffs = tariffs.filter(item=>item.tariff_id!=element)
    });
    result = [...result,...tariffs]
    setTariffs({
      base: base,
      all: result,
    });
  }
  setRefreshing(false)
}
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} style={{...globalStyles.container,zIndex:2}}>

      {tariffs.all&&userData&&debtStatus&&isLogin&&debtDel&&!modalVisible&&!message?<DebtModal debtDel={debtDel} setDebtDel={setDebtDel} tariffs={tariffs.all} userData={userData} monthly={monthly}/>:<></>}
      {alert?<ModalToken  navigation={navigation}/>:<></>}
      {!alert&&PromoMessage&&!modalVisible?<PromoModal PromoMessage={PromoMessage} setPromoMessage={setPromoMessage}/>:<></>}
      {!alert&&!PromoMessage&&modalVisible?<TariffModal chosedTariff={chosedTariff} userData={userData} setShowUnsubModal={setShowUnsubModal} showUnsubModal={showUnsubModal} action={action} message={message} setMessage={setMessage} agree={agree} visible={modalVisible} setVisible={setModalVisible}/>:<></>}
      {!loader?<>
      
      {isLogin==1&&userData?<>
      <View style={styles.content}>
        <Image style={styles.user} source={require('../../images/user.png')}/>
        <Text allowFontScaling={false}style={styles.phone}>{phone}</Text>
        <TouchableOpacity onPress={logout}>
          <View style={styles.back}>
            <Image style={styles.logout} source={require('../../images/logout.png')}/>
            <Text allowFontScaling={false}style={styles.backText}>Выход</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.full}>
          <Text allowFontScaling={false}style={styles.balance}>На лицевом счете:</Text>
          <Text allowFontScaling={false}style={styles.balance1}>{userData.balance} сум</Text>
        </View>
        <View style={styles.full}>
          <Text allowFontScaling={false}style={styles.balance}>Абонемент</Text>
          <Text allowFontScaling={false}style={styles.balance}>{userData&&userData.abonement}</Text>
        </View>
        <View style={styles.full}>
          <Text allowFontScaling={false}style={styles.balance}>Ежемесячный платеж:</Text>
          <Text allowFontScaling={false}style={styles.balance}>{monthly} сум</Text>
        </View>
        <View style={{...styles.full,flexDirection:'column',alignItems:'flex-start'}}>
          <View style={{...styles.full,paddingVertical:0,marginTop:0,marginBottom:5,paddingHorizontal:0,width:'100%'}}>
          <Text allowFontScaling={false}style={styles.balanceDec}>Осталось активных дней:</Text>
          <Text allowFontScaling={false}style={styles.balance}>{userData&&userData.activation_days_left} дней </Text>
          </View>
          <Text allowFontScaling={false}style={styles.balance}>{`${tariffs.all&&tariffs.all.filter(i=>i.is_assigned==1).map(i=>i.name)}`}</Text>
        </View>
        
      </View>
      </>:<></>}
      <TariffGroup
          tariffs={tariffs}
          navigation={navigation}
          openModal={openModal}
          isLogin={isLogin}
        />

      {isLogin==1?<View style={styles.textAreaContent}>
        <Text allowFontScaling={false}style={styles.titleArea}>Активация промокода </Text>
        <View style={styles.greyContent2}>
        <TextInput
          style={styles.input}
          onChangeText={setPromo}
          value={promo}
          onSubmitEditing={(e)=>Keyboard.dismiss()}
        />
        <TouchableOpacity onPress={submitPromo}>
          <View style={styles.activePromo}>
              <Text allowFontScaling={false}style={styles.promoText}>Активировать </Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>:<></>}

      <View style={styles.btnList}>
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('Devices')}>
          <View style={styles.btnPage}>
            <Text allowFontScaling={false}style={styles.btnPageText}>TVCOM на других устройствах</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={()=>navigation.navigate('Answers')}>
          <View style={styles.btnPage}>
            <Text allowFontScaling={false}style={styles.btnPageText}>Вопросы и ответы</Text>
          </View>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('PayMethods')}>
          <View style={styles.btnPage}>
            <Text allowFontScaling={false}style={styles.btnPageText}>Способы оплаты</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* <View style={styles.bottom}></View> */}
      </>:<>
        <ActivityIndicator size={'large'} color='#fff'/>
      </>}
      <TextInput style={{fontSize:0}}/>
    </ScrollView>
  );
}


