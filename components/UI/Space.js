import React from 'react';
import {View} from 'react-native';

export default function Space({width = 0, height = 0}) {
  return <View style={{width, height}}></View>;
}
