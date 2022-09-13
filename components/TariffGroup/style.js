import { StyleSheet,Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper:{
        width:width-20,
        marginLeft:10
    },
    name2:{
        color:'#fff',
        fontSize:24,
        fontWeight:'bold',
        marginBottom:20
    }
});

export default styles
  