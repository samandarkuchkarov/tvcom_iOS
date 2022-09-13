import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Constants from '../../../utils/constants';

export default function TextButton({title, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        width: '100%',
        height: 50,
        marginTop: 10,
        borderRadius: Constants.globalRadius,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text allowFontScaling={false}
        style={{
          color: Constants.primraryColor,
          textDecorationLine: 'underline',
          fontSize:18
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
