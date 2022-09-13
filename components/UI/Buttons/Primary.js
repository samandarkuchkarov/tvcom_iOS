import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Constants from '../../../utils/constants';

export default function PrimaryButton({title, onPress, children, style}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: '100%',
        height: 50,
        marginTop: 10,
        borderRadius: Constants.globalRadius,
        backgroundColor: Constants.primraryColor,
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      }}>
      {children}
      {!children && <Text allowFontScaling={false}style={{color: 'white',fontSize:22}}>{title}</Text>}
    </TouchableOpacity>
  );
}
