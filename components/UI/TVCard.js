import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Constants from '../../utils/constants';

export default function TVCard({name, img}) {
  return (
    <View style={styles.card}>
      <Image style={styles.img} source={{uri: img}} />
      <Text allowFontScaling={false}style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {},
  img: {
    borderRadius: Constants.globalRadius,
    height: 104,
    width: 182
  },
  text: {
    color: 'white',
  },
});
