import { StyleSheet, Dimensions } from "react-native";
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:'#010101',
        width
    },
    container:{
        width:width-40,
        marginLeft:20,
        marginTop:20,
        backgroundColor:'#010101',
    },
    list:{
        flexDirection:'row'
    },
    item:{
        marginRight:20,
        color:'#fff',
        fontSize:20
    },
    active:{
        color:'transparent',
        borderBottomWidth:4,
        fontSize:20,
        borderRadius:100,
        height:0,
        marginTop:5,
        marginRight:20
    }
});

export default styles
  