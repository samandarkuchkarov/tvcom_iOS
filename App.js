import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,Text,SafeAreaView } from 'react-native';
import {ContextProvider} from './context';
import Main from './navigation/MainNavigation';

export default function App() {
  return (
  <>
   
   <SafeAreaView  style={styles.safe}/>

    <ContextProvider>
      <Main/>
    </ContextProvider>
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
