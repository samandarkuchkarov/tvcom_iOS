import React from 'react';
import {View, Text, Image,Dimensions, TouchableWithoutFeedback} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';

const {width, height} = Dimensions.get('window');


const TabBarComp = ({name, focused, color, src, ref2, nav}) => {

  const onPress = () => {
    ref2.current.navigate(nav)
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <LinearGradient
        colors={
          focused
            ? ['rgba(228, 26, 75, 0.25)', 'rgba(10, 10, 10, 0)']
            : ['#000', '#000']
        }
        style={styles.container}>
        <View style={styles.item}>
          <Image
            style={{
              width: width/10,
              height: 25,
              resizeMode: 'contain',
              tintColor:focused?'#E41A4B':color,
            }}
            source={src}
          />
          <Text allowFontScaling={false} style={{fontSize: 10, color:focused?'#E41A4B':color, marginTop: 5}}>{name}</Text>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};
export default TabBarComp;
