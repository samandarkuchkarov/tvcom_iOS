import { StyleSheet, Dimensions } from "react-native";
const {width,height} = Dimensions.get('window');
const numColoms = Math.trunc((width - 10) / (170+10));
const styles = StyleSheet.create({
    content: {
        width:(width-10)/numColoms,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:5
    },
    contentType:{
        width:width-40,
        marginLeft:20
    },
    typeText:{
        color:'#fff',
        marginBottom:20,
        fontSize:18
    },
    name:{
        color:'#E41A4B',
        fontWeight:'bold'
    },
    empty:{
        width,
        height:height-160,
        justifyContent:'center',
        alignItems:'center',
    },
    emptyBlock:{
        backgroundColor:'#1c1c1c',
        borderRadius:7,
        padding:10
    },
    emtypText:{
        color:'#fff',
        fontSize:18,
        width:width-40,
        textAlign:'center'
    }

});

export default styles
  