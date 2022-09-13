import { StyleSheet,Dimensions } from "react-native";

const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    content:{
        width:height>width?width:height,
        flexDirection:'row'
    }
});

export default styles
  