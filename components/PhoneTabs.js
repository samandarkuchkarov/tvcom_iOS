import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Space from './UI/Space';
import translateText from '../services/localization/translateText';
import {getStorage} from '../utils/storage';

const Tab = createBottomTabNavigator();

export default function PhoneTabs({Components, navigation}) {
  const options = (src, name) => {
    return {
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#E41A4B',
      tabBarIcon: ({focused, color, size}) => (
        <LinearGradient
          colors={
            focused
              ? ['rgba(228, 26, 75, 0.25)', 'rgba(10, 10, 10, 0)']
              : ['#000', '#000']
          }
          style={{
            flex: 1,
            height: 65,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{
                width: size,
                height: size,
                resizeMode: 'contain',
                tintColor: color,
              }}
              source={src}
            />
            <Space height={5} />
            <Text allowFontScaling={false}
              style={{
                fontSize: 12,
                color,
              }}>
              {name}
            </Text>
          </View>
        </LinearGradient>
      ),
    };
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 65,
          backgroundColor: '#000',
          borderTopColor: 'transparent',
        },
      }}>
      <Tab.Screen
        options={options(
          require('../assets/images/Tab/TV.png'),
          translateText('TV'),
        )}
        name="TV"
        component={Components[0]}
      />
      <Tab.Screen
        options={options(
          require('../assets/images/Tab/Cinema.png'),
          translateText('Cinema'),
        )}
        name="Cinema"
        component={Components[1]}
      />
      <Tab.Screen
        options={options(
          require('../assets/images/Tab/Interesting.png'),
          translateText('Interesting'),
        )}
        name="Interesting"
        component={Components[2]}
      />
      <Tab.Screen
        options={options(
          require('../assets/images/Tab/profile.png'),
          translateText('Profile'),
        )}
        name="Profile"
        component={Components[3]}
        listeners={({navigation: tabNavigation}) => ({
          tabPress: async () => {},
        })}
      />
    </Tab.Navigator>
  );
}
