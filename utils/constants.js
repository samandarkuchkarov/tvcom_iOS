import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const Constants = {
  primraryColor: '#E41A4B',
  secondaryColor: '#242424',
  blockColor: '#1C1C1C',
  globalRadius: 7,
  width,
  height,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
    paddingTop:10
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  smallTitle: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  primaryText: {
    color: Constants.primraryColor,
    fontSize: 24,
  },
  infoText: {
    fontSize: 12,
    color: 'white',
  },
  h1: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  
});

export default Constants;
