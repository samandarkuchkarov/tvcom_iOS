import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,Text,SafeAreaView } from 'react-native';
import {ContextProvider} from './context';
import Main from './navigation/MainNavigation';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  });

  return (
  <>
   
   <SafeAreaView  style={styles.safe}/>
    <StatusBar hidden={false} style="light"/>
    <ContextProvider>
      <Main/>
    </ContextProvider>
    <SafeAreaView  style={styles.safe}/>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safe:{
    backgroundColor:'#010101'
  }
});
