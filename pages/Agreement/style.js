import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
  listWrapper: {
    width: width - 40,
    marginLeft: 20,
  },
  agreementTitle:{
    color:'#fff',
    width:width-40,
    marginLeft:20,
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20,
    marginVertical:20

  },
  agreement:{
    color:'#fff',
    width:width-40,
    marginLeft:20,
  }
});

export default styles;
