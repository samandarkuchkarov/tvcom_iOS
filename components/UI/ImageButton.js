import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

const ImageButton = ({src, width = 25, height = 25, onPress, onLongPress}) => (
  <TouchableOpacity
    onPress={onPress}
    onLongPress={onLongPress}
    style={styles.btn}>
    <Image source={src} style={{...styles.img, width, height}} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  img: {
    resizeMode: 'contain',
  },
  btn: {
    alignItems: 'flex-end',
  },
});

export default ImageButton;
