import React from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import ImageButton from './UI/ImageButton';
import Space from './UI/Space';

export default function Navbar({ref2}) {
  return (
    <View style={styles.navbar}>
      {/* <StatusBar backgroundColor="#1C1C1C" barStyle={'light-color'} /> */}
      <TouchableWithoutFeedback onPress={()=>{console.log(ref2)}}>
      <Image
        style={styles.logo}
        source={require('../assets/images/Logo.png')}
      />

      </TouchableWithoutFeedback>
      <View style={styles.right}>
        <ImageButton
          onPress={()=>ref2.current.navigate('Search')}
          height={23}
          src={require('../assets/images/search.png')}
        />
        <Space width={20} />
        <ImageButton
          onPress={()=>ref2.current.navigate('Filter')}
          height={23}
          src={require('../images/filterMovies.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#1C1C1C',
    paddingHorizontal: 20,
    paddingRight: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: '32%',
    height: 40,
    resizeMode: 'contain',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
