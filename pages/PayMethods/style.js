import { StyleSheet, Dimensions } from "react-native";
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'#010101'
    },
    container:{
        width:width-20,
        marginLeft:10
    },
    title:{
        color:'#fff',
        fontSize:26,
        marginTop:15,
        marginBottom:0
    },
    way:{
        padding:15,
        backgroundColor:'#1c1c1c',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:7,
        marginTop:20,
    },
    wayOrder:{
        color:'#fff',
        fontSize:26
    },
    wayText:{
        color:'#fff',
        fontSize:18,
        marginLeft:15
    },
    content:{
        flexDirection:'row',
        width:width-20,
        flexWrap:'wrap',
        marginVertical:10
    },
    item:{
        justifyContent:'center',
        marginTop:10,
        alignItems:'center'
    },
    wrapperItem:{
        padding:10,
        backgroundColor:'#fff',
        borderRadius:7
    },
    image:{
        width:150,
        height:77.7,
        resizeMode:'contain',
    }
});

export default styles
  