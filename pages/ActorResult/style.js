import { StyleSheet, Dimensions } from "react-native";
const {width} = Dimensions.get('window');
const numColoms = Math.trunc((width - 20) / (170+10));
const styles = StyleSheet.create({
    content: {
        width:(width-10)/numColoms,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10
    },
    contentType:{
        width:width-20,
        marginLeft:10,
        marginBottom:20
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
    text:{
        fontSize:20,
        color:'#fff'
    },
    emptyBlock: {
        width: width - 20,
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 60,
      },
    emptyMassege:{
        color:'#fff',
        fontSize:28
    }

});

export default styles
  