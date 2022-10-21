import { StyleSheet, Dimensions } from "react-native";
const {width} = Dimensions.get('window');
let numColoms = Math.trunc((width - 10) / (170+10));
numColoms = numColoms==1?2:numColoms

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'#010101'
    },
    textAreContent:{
        backgroundColor:'#1c1c1c',
        height:40,
        width:width-20,
        marginLeft:10,
        marginTop:20,
        borderRadius:3,
        flexDirection:'row',
        padding:10,
        alignItems:'center',
        marginBottom:15
    },
    searchIcon:{
        height:22,
        width:22,
        resizeMode:'contain'
    },
    input:{
        marginLeft:10,
        width:(width-20-10-22),
        height:40,
        color:'#fff'
    },
    grey:{
        backgroundColor:'#1c1c1c',
        paddingVertical:30,
        paddingHorizontal:20,
        width:width-20,
        marginLeft:10,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center'
    },
    empty:{
        color:'#fff',
        fontSize:26,
        fontFamily:'Montserrat-Bold',
        width:width,
        textAlign:'center',
    },
    content: {
        width:(width-10)/numColoms,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:5
    },
    title:{
        color:'#fff',
        marginLeft:10,
        marginBottom:10,
        marginTop:10,
        fontSize:18
    }
});

export default styles
  