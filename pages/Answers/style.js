import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'#010101'
    },
    question:{
        width:width-20,
        marginLeft:10,
        borderRadius:7,
        marginTop:10,
        padding:10,
        backgroundColor:'#1c1c1c',
        zIndex:2,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    questionText:{
        color:'#fff',
        fontSize:18,
        fontFamily:'Montserrat-Medium',
        width:width-20,
        marginLeft:10
    },
    webView:{
        width:width-20,
        marginLeft:10,
        height:300,
        marginTop:10,
        backgroundColor:'#010101'
        
    },
    arrow:{
        width:20,
        height:20,
        marginTop:3,
        resizeMode:'contain',

    }
});

export default styles
  