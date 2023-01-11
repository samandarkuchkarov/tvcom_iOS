import React, {useContext, useState, useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import PrimaryButton from '../../components/UI/Buttons/Primary';
import SecondaryButton from '../../components/UI/Buttons/Secondary';
import SwitchButton from '../../components/UI/Buttons/Switch';
import TextButton from '../../components/UI/Buttons/Text';
import MaskInput from '../../components/UI/Input/Mask';
import Loader from '../../components/UI/Loader';
import Space from '../../components/UI/Space';
import TextBox from '../../components/UI/TextBox';
import Constants, {globalStyles} from '../../utils/constants';
import { login, storeData } from '../../Api';
import { Datas } from '../../context';

export default function Authentication({navigation}) {

  const { apiKey,setToken,setLogin,setDebtStatus } = useContext(Datas)
  const [mode, setMode] = useState(1);
  const [abonement, setAbonement] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');


  const getPhoneValue = input => {
    return input.replace(/\D/g, '');
  };

  const loginClick = async () => {
    if(loading){return}
    let respones
    setLoading(true)
    if(mode===1){
      respones = await login({abonement:abonement,password:password}, apiKey,true)
    }else{
      respones = await login({abonement: getPhoneValue(phone),password:password}, apiKey,true)
    }
    console.log(respones)
    if(respones.error==0){
      await setToken(respones.authkey);
      await setLogin(1)
      await storeData('abonement', { number: respones.abonement });
      await storeData('token', { token: respones.authkey });
      if(respones.status_reason == 'DEBT'){
       await setDebtStatus(true)
      }
      let routes =   navigation.getState().routes;
      setLoading(false)  
      if(routes[routes.length-2].name === 'Registration'){
        navigation.navigate('Home')
      }else{
        navigation.goBack()
      }
    
    }else{
      setLoading(false)
    }
    if(respones.error==1){
      setError('Вы ввели не правильные данные');
    }
    if(respones.error==3){
      setError('Ошибка создания авторизационного ключа сессии.');
    }
    if(respones.error==4){
      setError( 'Неверный API key или client_id.');
    }
    if(respones.error==5){
      setError('Превышено число сессий аккаунта на базовых устройствах.');
    }
    if(respones.error==6){
      setError('Ошибка при запросе к внешнему api.');
    }
    if(respones.error==7){
      setError('У абонента не подключен ни один тариф.');
    }
    if(respones.error==8){
      setError('Абонент пытается авторизоваться из подсети, из которой ему авторизация запрещена.');
    }
    if(respones.error==9){
      setError( 'Авторизация с базовых устройств запрещена в настройках тарифов.');
    }
    if(respones.error==10){
      setError('Авторизация с базовых устройств запрещена в настройках тарифов.' );
    }
    if(respones.error==11){
      setError('Авторизация с дополнительных устройств запрещена в настройках тарифов.');
    }
    if(respones.error==12){
      setError( 'Не удается точно определить аккаунт по IP-адресу, с которого осуществляется авторизация, т.к. существует несколько аккаунтов в включенной опцией "Авторизация по IP" и пересекающимися IP-подсетями.' );
    }
    if(respones.error==13){
      setError('Аккаунт по указанным параметрам не найден, но был отправлен запрос во внешний биллинг для создания аккаунта, поэтому он может быть уже создан при следующей попытке авторизации.');
    }
    if(respones.error==15){
      setError( 'Логин для устройства с данной группой не разрешён для данного аккаунта.');
    }
    if(respones.error==16){
      setError('Превышено число сессий аккаунта для данной группы устройств.' );
    }
    setLoading(false)

  };

  useEffect(() => {
    setError('')
  
  }, [abonement,password,phone])
  
  return (
    <ScrollView
      style={{
        ...globalStyles.container,
        padding: 20,
      }}>
      <Loader show={loading} />
      <View
        style={{
          width: '100%',
          height: '95%',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        {/* <Image
          style={{resizeMode: 'contain', width: '60%'}}
          source={require('../../assets/images/Logo.png')}
        /> */}
        <SwitchButton
          onValueChange={val => setMode(val)}
          switchBorderRadius={Constants.globalRadius}
          switchBackgroundColor={Constants.secondaryColor}
          switchWidth={Constants.width - 40}
          btnBackgroundColor={Constants.primraryColor}
          switchSpeedChange={300}
          text1="Войти по абонементу"
          text2="Войти по номеру телефона"
        />
        {mode === 1 ? (
          <TextBox
            error={error}
            onChangeText={text => setAbonement(text)}
            label="Абонемент"
            style={{marginTop: 0,fontSize:16}}
            keyboardType="numeric"
          />
        ) : (
          <MaskInput
            error={error}
            onChangeText={phone => setPhone(phone)}
            label="Номер телефона"
            placeholder="+998 (99) 123-45-67"
            keyboardType="numeric"
          />
        )}
        <TextBox
          error={error}
          password
          onChangeText={text => setPassword(text)}
          label="Пароль"
          style={{marginTop: 10}}
          secureTextEntry
          keyboardType="numeric"
        />
        <Space height={10} />
        <Text allowFontScaling={false}style={{color: '#E41A4B'}}>{error}</Text>
        <Space height={10} />

        <PrimaryButton onPress={loginClick} title="Войти" />
        <SecondaryButton onPress={()=>navigation.navigate('Registration')}  title="Регистрация" />
        <TextButton onPress={()=>navigation.navigate('RestoreAbon')} title="Восстановление абонемента" />
      </View>
    </ScrollView>
  );
}
