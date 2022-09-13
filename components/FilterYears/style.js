import { StyleSheet,Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    year:{
        color:'#fff',
        marginLeft:10,
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:'#1c1c1c',
        borderRadius:100,
        fontSize:16
    }
});

export default styles
  