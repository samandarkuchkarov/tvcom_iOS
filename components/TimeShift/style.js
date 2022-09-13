import { StyleSheet,Dimensions } from "react-native";

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper:{
        zIndex:10,
        flex:1,
        backgroundColor:'#010101'
    },
    slider:{
        width:width-20,
        marginLeft:20,
        zIndex:5,
        height:54,
        marginTop:10,
        marginBottom:10,
    },
    day:{
        backgroundColor:'#1c1c1c',
        borderRadius:7,
        marginRight:10,
        height:42,
        width:100,
        justifyContent:'center',
        alignItems:'center'
        
    },
    dayText:{
        color:'#fff',
        fontSize:18,
    },
    item:{
        width:width-40,
        marginLeft:20,
        flexDirection:'row',
    },
    full:{
        width:width,
        paddingVertical:5
    },
    preview:{
        width:60*1.71,
        height:60,
        zIndex:1,
        position:'absolute',
        borderRadius:7,
        overflow:'hidden'
    },
    previewWrapper:{
        zIndex:2,
        width:60*1.71,
        height:60,
        borderRadius:7,
        overflow:'hidden',
        marginRight:10,
        alignItems:'flex-end'
    },
    name:{
        color:'#fff',
        fontSize:17,
        width:(width-40) - 60*1.71 - 10
    },
    time:{
        color:'#BCBCBC',
    },
    textBlock:{
        justifyContent:'space-around',
        height:60,
    },
    processWrapper:{
        width:(width-40)-60*1.71-10,
        height:2,
        backgroundColor:'#bcbcbc',
        borderRadius:100
    },
    process:{
        height:2,
        borderRadius:100,
        backgroundColor:'#E41A4B'
    },
    shine:{
        zIndex:2,
        width:30,
        height:30,
        resizeMode:'contain'
    },
    watched:{
        zIndex:2,
        width:40,
        height:30,
        resizeMode:'contain'
    }
});

export default styles
  