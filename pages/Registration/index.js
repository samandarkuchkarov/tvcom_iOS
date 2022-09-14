import React, { useState,useContext,useEffect } from 'react'
import { View, Modal, Text, TouchableOpacity } from 'react-native'
import styles from './style'
import MaskInput from '../../components/UI/Input/Mask'
import PrimaryButton from '../../components/UI/Buttons/Primary'
import { Datas } from '../../context'
import { Checkbox } from 'react-native-paper';


export default function Registration({navigation}) {

    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [check,setCheck] = useState(true)
    const [modalVisible,setModalVisible] = useState(false)
    const { registration } = useContext(Datas);
    
    const getPhoneValue = input => {
        return input.replace(/\D/g, '');
    };

   

    const getErrorMessage = (num) => {
        switch (num) {
          case 0:
            return 'Нет ошибки'
          case 1:
            return 'Произошла неизвестная ошибка, регистрация не удалась'
          case 2:
            return 'Для этого Client ID регистрация запрещена'
          case 3:
            return 'Исчерпан лимит регистраций с одного IP адреса'
          case 4:
            return 'Некорректное значение auto_activation_period'
          case 5:
            return 'Некорректный номер телефона'
          case 6:
            return 'На этот номер телефона уже производилась регистрация ранее'
          case 7:
            return 'Для регистрации должен быть передан mobile_phone_number или device_uid'
          case 8:
            return 'Ошибка регистрации аккаунта во внешнем биллинге'
          case 9:
            return 'Было отправлено СМС с кодом верификации номера телефона'
          case 10:
            return 'Неверный код верификации'
          case 11:
            return 'Ошибка создания аккаунта через External API'
          case 12:
            return 'Была отправлена ссылка на капчу'
          case 13:
            return 'Введенный код с капчи некорректен или устарел'
          case 14:
            return 'Достигнут лимит на сгенерированные капчи'
          case 15:
            return 'Некорректное значение dealer_id'
          case 16:
            return 'Было отправлено подтверждение номера телефона с помощью звонка'
          case 17:
            return 'Ожидается подтверждение номера телефона с помощью звонка'
        }
    }

    const submit =  async () => {
        if(!check){
            setError( 'Подтвердите пользовательское соглашение')
            return
        }    
        const response = await registration(getPhoneValue(phone),true)
        if (response.data.hasOwnProperty('error')&&response.data.error!==0) {
            setError( getErrorMessage(response.data.error))
        } else {
            setModalVisible(true);
        }
    }

    useEffect(() => {
        setError('')
    }, [phone])
    

  return (
    <View style={styles.wrapper}>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(false);
            }}>
            <View style={styles.screen}>
              <View style={styles.modal}>
                  { }
                  <Text allowFontScaling={false}style={styles.modalText}>
                  Вы успешно зарегистрированы! Данные для авторизации поступят в
                  виде СМС.
                  </Text>
                  <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                      <View style={styles.back}>
                          <Text allowFontScaling={false}style={styles.backText}>Вернуться на главную страницу</Text>
                      </View>
                  </TouchableOpacity>
              </View>
            </View>
        </Modal>

        <View style={styles.contener}>
            <View style={styles.content}>
                <MaskInput
                    error={error}
                    onChangeText={phone => setPhone(phone)}
                    label="Номер телефона"
                    placeholder="+998 (99) 123-45-67"
                    keyboardType="numeric"
                />
            </View>
            <Text allowFontScaling={false}style={styles.error}>{error}</Text>
            <PrimaryButton onPress={submit} title="Регистрация" />
            
            <View style={styles.wrapperFocus2}>
                <View style={styles.focusCheck}>
                    <Checkbox
                    status={check ? 'checked' : 'unchecked'}
                    color="#fff"
                  
                    uncheckedColor="#fff"
                    onPress={() => {setCheck(i=>!i)}}
                    />
                </View>
                <View style={styles.focusagreement}>
                    <View style={styles.absolute}>
                        <Text allowFontScaling={false}style={styles.text}>Я принимаю условия пользовательского соглашения</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
  )
}
