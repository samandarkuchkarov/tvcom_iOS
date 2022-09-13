import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../TabBar/style';


export default class SwitchButton extends Component {
  static propTypes = {
    onValueChange: PropTypes.func,
  };

  static defaultProps = {
    onValueChange: () => null,
  };

  constructor() {
    super();

    this.state = {
      activeSwitch: 1,
      sbWidth: 100,
      sbHeight: 60,
      direction: 'ltr',
      offsetX: new Animated.Value(0),
    };

    this._switchDirection = this._switchDirection.bind(this);
  }

  _switchDirection(direction) {
    let dir = 'row';

    if (direction === 'rtl') {
      dir = 'row-reverse';
    } else {
      dir = 'row';
    }
    return dir;
  }

  _switchThump(direction) {
    const {onValueChange, disabled} = this.props;
    let dirsign = 1;
    if (direction === 'rtl') {
      dirsign = -1;
    } else {
      dirsign = 1;
    }

    if (this.state.activeSwitch === 1) {
      this.setState({activeSwitch: 2}, () =>
        onValueChange(this.state.activeSwitch),
      );

      Animated.timing(this.state.offsetX, {
        useNativeDriver: true,
        toValue:
          ((this.props.switchWidth || this.state.sbWidth) / 2 - 6) * dirsign,
        duration: this.props.switchSpeedChange || 100,
      }).start();
    } else {
      this.setState({activeSwitch: 1}, () =>
        onValueChange(this.state.activeSwitch),
      );
      Animated.timing(this.state.offsetX, {
        useNativeDriver: true,
        toValue: 0,
        duration: this.props.switchSpeedChange || 100,
      }).start();
    }
  }

  render() {
    return (
      <View style={switchStyles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this._switchThump(
              this.props.switchdirection || this.state.direction,
            );
          }}>
          <View
            style={[
              {
                width: this.props.switchWidth || this.state.sbWidth,
                height: this.props.switchHeight || this.state.sbHeight,
                borderRadius:
                  this.props.switchBorderRadius !== undefined
                    ? this.props.switchBorderRadius
                    : this.state.sbHeight / 2,
                // borderWidth: 1,
                borderColor: this.props.switchBorderColor || 'transparent',
                backgroundColor: this.props.switchBackgroundColor || '#fff',
              },
            ]}>
            <View
              style={[
                {
                  flexDirection: this._switchDirection(
                    this.props.switchdirection || this.state.direction,
                  ),
                },
              ]}>
              <Animated.View
                style={{transform: [{translateX: this.state.offsetX}]}}>
                <View
                  style={[
                    switchStyles.wayBtnActive,
                    {
                      width:
                        this.props.switchWidth / 2 || this.state.sbWidth / 2,
                      height:
                        this.props.switchHeight|| this.state.sbHeight,
                      borderRadius:
                        this.props.switchBorderRadius !== undefined
                          ? this.props.switchBorderRadius
                          : this.state.sbHeight / 2,
                      borderColor: this.props.btnBorderColor || 'transparent',
                      backgroundColor:
                        this.props.btnBackgroundColor || '#00bcd4',
                    },
                  ]}
                />
              </Animated.View>

              <View
                style={[
                  switchStyles.textPos,
                  {
                    width: this.props.switchWidth / 2 || this.state.sbWidth / 2,
                    height:
                      this.props.switchHeight - 6 || this.state.sbHeight - 6,
                    left: 0,
                  },
                ]}>
                <Text allowFontScaling={false}
                  style={[
                    this.state.activeSwitch === 1
                      ? {color: this.props.activeFontColor || '#fff',...switchStyles.text}
                      : {color: this.props.fontColor || '#b1b1b1', ...switchStyles.text},
                      
                      
                  ]}>
                  {this.props.text1 || 'ON'}
                </Text>
              </View>

              <View
                style={[
                  switchStyles.textPos,
                  {
                    width: this.props.switchWidth / 2 || this.state.sbWidth / 2,
                    height:
                      this.props.switchHeight - 6 || this.state.sbHeight - 6,
                    right: 0,
                  },
                ]}>
                <Text allowFontScaling={false}
                  style={{
                    ...{
                      color:
                        this.state.activeSwitch === 2
                          ? this.props.activeFontColor || '#fff'
                          : this.props.fontColor || '#b1b1b1',
                      ...switchStyles.text
                    },
                    paddingHorizontal: 10,
                  }}>
                  {this.props.text2 || 'OFF'}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {this.props.children}
      </View>
    );
  }
}

const switchStyles = StyleSheet.create({
  container:{
    marginBottom:20
  },
  textPos: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rtl: {
    flexDirection: 'row-reverse',
  },
  ltr: {
    flexDirection: 'row',
  },
  text:{
    textAlign:'center',
    fontSize:18,
    marginTop:5,
    width:'95%',
  }
});
