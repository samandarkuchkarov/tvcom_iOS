import { StyleSheet, Dimensions } from "react-native";
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'#0000006b',
        justifyContent:'center',
        alignItems:'center'
    }, 
    container:{
        width:width-40,
        padding:10,
        backgroundColor:'#1c1c1c',
        borderRadius:7
    },
    text:{
        color:'#fff',
        fontSize:18,
       
    },
    backText: {
        color: '#fff',
        fontSize: 18,
    },
    back:{
        width:width-60,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#E41A4B',
        padding:10,
        marginTop:10,
        borderRadius:7
    },
});

export default styles
  