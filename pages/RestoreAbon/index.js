import React, { useContext, useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import styles from './style'
import MaskInput from '../../components/UI/Input/Mask'
import PrimaryButton from '../../components/UI/Buttons/Primary'
import { Datas } from '../../context'
import { resetPassword } from '../../Api'
import TextBox from '../../components/UI/TextBox'

export default function RestoreAbon({navigation}) {
    const {apiKey} = useContext(Datas)
    const [secondInput,setSecondInput] = useState(false)
    const [phone,setPhone] = useState('')
    const [code,setCode] = useState('')
    const [error,setError] = useState('')
    const [modalVisible,setModalVisible] = useState(false)

    const getInputsValue = (input) => {
        return input.replace(/\D/g, '')
    }

    const submit = async() => {
        if(!secondInput){
            const result = await resetPassword(getInputsValue(phone),false,apiKey)
            if(result.error_message == 'Customer not found'){
              setError('Вы ввели не правильные данные')
              return
            }
            if(result.error==3){
              setSecondInput(true);
              setError('')
            }else{
              if(result.error==7){
                setSecondInput(true);
                //setError( 'Данные для авторизации были высланы в виде СМС. Попробуйте позже.')
                return
              }
              setError(result.error_message)
            }
           }else{
        
            const result = await resetPassword(getInputsValue(phone),code,apiKey)
            if(result.error === 0){
              setModalVisible(true)
            }else{
              setError( result.error_message)
            }
           }
    }
    useEffect(() => {
        setError('')
    }, [phone,code])
  return (
    <View style={styles.wrapper}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {setModalVisible(false)}}>
            <View style={styles.screen}>
              <View style={styles.modal}>
                  { }
                  <Text allowFontScaling={false}style={styles.modalText}>
                    Вы успешно сменили пароль! Данные для авторизации поступят в
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
        <View style={styles.container}>
                <MaskInput
                    error={error}
                    onChangeText={phone => setPhone(phone)}
                    label="Номер телефона"
                    placeholder="+998 (99) 123-45-67"
                    keyboardType="numeric"
                />
                {secondInput?
                    <TextBox
                        error={error}
                        onChangeText={code => setCode(code)}
                        label="Проверочный код"
                        placeholder=""
                        keyboardType="numeric"
                    />:<></>}
                <Text allowFontScaling={false}style={styles.error}>{error}</Text>
                <PrimaryButton onPress={submit} title={secondInput?"Подтвердить проверочный код":"Восстановить"} />
        </View>
    </View>
  )
}
