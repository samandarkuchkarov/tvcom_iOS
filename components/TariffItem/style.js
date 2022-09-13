import { StyleSheet,Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper:{
        marginBottom:10,
        zIndex:2,
        width:width-20,
        height:(width-20)/1.289,
    },
    back:{
        width:width-20,
        height:(width-20)/1.289,
        zIndex:1,
        position:'absolute',
    },
    info:{
        zIndex:2, 
        padding:20       
    },
    desc:{
        color:'#fff',
        marginTop:((width-20)/1.289)*0.23,
        width:'50%'
    },
    price:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
    },
    priceContent:{
        width:width-20,
        paddingHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    con:{
        position:'absolute',
        width:width-20,
        height:(width-20)/1.289,
        justifyContent:'flex-end',
        zIndex:2,
        paddingHorizontal:20,
        alignItems:'center',
        // backgroundColor:'red'
    },
    btn:{
        width:width-60,
        height:40,
        backgroundColor:'#E41A4B',
        marginTop:7,
        marginBottom:7,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center'
    },
    tariffBtnText:{
        color:'#fff',
        fontSize:18
    },
    more:{
        flexDirection:'row',
        alignItems:'center',
        padding:5,
        paddingHorizontal:10,
        backgroundColor:'#E41A4B',
        borderRadius:7
    },
    moreText:{
        color:'#fff',
        fontSize:18,
        marginTop:-3
    }
});

export default styles
  