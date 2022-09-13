import { StyleSheet,Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    pl_place:{
        width:width,
        height:width/1.77,
        backgroundColor:'#1c1c1c',
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
    },
    startIcon:{
        width:40,
        height:40,
        resizeMode:'contain'
    },
    wrapperVideo:{
        zIndex:5,
        backgroundColor:'#010101'
    },
    channelInfo:{
        width:width,
        paddingHorizontal:20,
        zIndex:5,
        paddingTop:5,
        backgroundColor:'#010101'
    },
    icon:{
        height:60,
        width:60*1.675
    },
    nameBlock:{
        flexDirection:'row',
        alignItems:'center',
    },
    name:{
        color:'#fff',
        marginLeft:10,
        fontWeight:'bold',
        fontSize:18,
        width:(width-40)-70*1.675-10,
    },
    program_name:{
        color:'#fff',
        marginTop:10,
        fontSize:24
    },
    desc:{
        color:'#fff',
        marginTop:5,
        width:(width-40)-70*1.675-10,
        marginLeft:10,
    }
});

export default styles
  