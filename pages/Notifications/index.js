import React, { useContext, useState, useEffect } from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from '../../utils/constants';
import { Datas } from '../../../context';
import ModalToken from '../../components/ModalToken';

export default function Notifications({navigation}) {

  const { isLogin, checkToken } = useContext(Datas)
  const [alert,setAlert] = useState(false)

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
  return (
    <View style={globalStyles.container}>
       {alert?<ModalToken navigation={navigation}/>:<></>}
      <Text allowFontScaling={false}style={{color: '#fff'}}>Notifications</Text>
    </View>
  );
}
