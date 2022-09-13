import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Constants from '../../utils/constants';

export default function Loader({show}) {
  if (!show) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.loader}>
        <ActivityIndicator color={Constants.primraryColor} size="large" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    zIndex: 10,
  },
  loader: {
    backgroundColor: '#ffffff42',
    borderRadius: Constants.globalRadius,
    padding: 20,
  },
});
