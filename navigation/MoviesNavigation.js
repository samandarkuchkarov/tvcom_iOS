
import React,{ useState, useEffect, useContext } from 'react';
import Movie from '../pages/Movie';
import Serial from '../pages/Serial';
import Kids from '../pages/Kids';
import Shows from '../pages/Shows';
import {Dimensions } from 'react-native';
import Choser from '../components/Choser';
import ModalToken from '../components/ModalToken';
import { Datas } from '../context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const {width,height} = Dimensions.get('window');


const Stack = createNativeStackNavigator();

export default function MovieNavigation({navigation}) {
  const [alert,setAlert] = useState(false)
  const { isLogin, checkToken } = useContext(Datas)

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
      <>
        {alert?<ModalToken navigation={navigation}/>:<></>}
        <Stack.Navigator  screenOptions={{header:(props)=><Choser {...props}/>,animationEnabled:false}}>
            <Stack.Screen options={{stackAnimation:'none'}} name="MovieList" component={Movie} />
            <Stack.Screen options={{stackAnimation:'none'}} name="Serial" component={Serial} />
            <Stack.Screen options={{stackAnimation:'none'}} name="Kids" component={Kids} />
            <Stack.Screen options={{stackAnimation:'none'}} name="Shows" component={Shows} />
        </Stack.Navigator>
      </>
  );
}


