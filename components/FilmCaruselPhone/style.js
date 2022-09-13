import { StyleSheet,Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        width:width,
        marginBottom:20
    },
    title:{
        fontSize:22,
        color:'#fff',
        marginBottom:10,
        marginLeft:10
    },
    block:{
        width:170,
        height:252+45, 
    },
    block3:{
        height:252,
        width:170,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#1c1c1c',
        overflow:'hidden'
    },
    dotts:{
        width:70,
        height:50,
        resizeMode:'contain'
    },
    block2:{
        height:45,
        width:170,
        justifyContent:'center',
        alignItems:'center'
    },
    name2:{
        color:'#fff',
        fontSize:15,
        fontWeight:'bold',
        marginTop:10
    }
});

export default styles
  