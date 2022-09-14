import { StyleSheet, Dimensions } from "react-native";
const {width,height} = Dimensions.get('window');
const numColoms = Math.trunc((width - 10) / (170+10));
const isTab = width>height
const styles = StyleSheet.create({
    content: {
        width:(width-10)/numColoms,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:5
    },
    contentType:{
        width:width-20,
        marginLeft:10,
        alignItems:'center'
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
    },
    title:{
        width:width-20,
        textAlign:'center',
        fontSize:22,
        color:'#fff',
        marginBottom:5,
        marginTop:5,
        fontWeight:'bold'
    },
    btn:{
        width:'100%',
        height:45,
        backgroundColor:'#E41A4B',
        borderRadius:7,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center'
    },
    tariffBtnText:{
        color:'#fff',
        fontSize:18,
        paddingHorizontal:10
    },
    infoImage:{
        width:isTab? (width-20)/3:(width-20),
        height: isTab?((width-20)/0.8657)/3:(width-20)/0.8657,
        marginBottom:10
    }

});

export default styles
  