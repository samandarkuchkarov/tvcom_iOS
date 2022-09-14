import { StyleSheet, Dimensions } from "react-native";
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    text:{
        color:'#fff',
        fontSize:16,
        fontFamily:'Montserrat-Medium',
        textAlign:'center'
    },
    emptyBlock:{
        width:width-20,
        marginLeft:10,
        marginTop:30,
        padding:10,
    },
    emptyBtn:{
        width:width-20,
        marginLeft:10,
        marginVertical:10,
        padding:10,
        backgroundColor:'#E41A4B',
        borderRadius:7
    }
});

export default styles
  