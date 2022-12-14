import { StyleSheet, Dimensions } from "react-native";
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    loginBtn:{
        marginVertical:20,
        width:width-20,
        marginLeft:10
    },
    btnList:{
        marginLeft:5,
        width:width-10,
        overflow:'hidden',
        backgroundColor:'#1c1c1c',
        borderRadius:7,
        marginBottom:10
    },
    btnPage:{
        width:'100%',
        height:40,
        backgroundColor:'#1c1c1c',
        justifyContent:'space-between',
        alignContent:'center',
        padding:10,
        borderRadius:7,
        flexDirection:'row'
    },
    btnPageText:{
        color:'#fff',
        fontSize:17
    },
    arrow:{
        width:20,
        height:20,
        marginTop:3,
        resizeMode:'contain',
    },
    bottom:{
        marginBottom:80 
    },
    content:{
        width:width-20,
        marginLeft:10,
        marginBottom:15,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    greyContent:{
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:'#1c1c1c',
        width:width-10,
        marginLeft:5,
        borderRadius:7,
        marginBottom:15
    },
    phone:{
        color:'#fff',
        fontSize:22,
        marginTop:10,
        fontFamily:'Montserrat-Bold'
    },
    abon:{
        color:'#fff',
        fontSize:22,
        fontFamily:'Montserrat-Medium'
    },
    balance:{
        fontSize:17,
        color:'#fff',
        fontFamily:'Montserrat-Bold'
    },
    balanceDec:{
        fontSize:17,
        color:'#fff',
    },
    balance1:{
        color:'#E41A4B',
        fontSize:22,
        fontFamily:'Montserrat-Bold'
    },
    textAreaContent:{
        width:width-10,
        marginLeft:5
    },
    titleArea:{
        color:'#fff',
        marginBottom:10,
        fontSize:18
    },
    greyContent2:{
        backgroundColor:'#1c1c1c',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:7,
        marginBottom:15,
        padding:7,
    },
    input:{
        height:50,
        width:(width-40)-(width-40)*0.37,
        backgroundColor:'#fff',
        borderRadius:5,
        fontSize:20
    },
    activePromo:{
        height:50,
        width:(width-40)*0.37,
        backgroundColor:'#E41A4B',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7
    },
    promoText:{
        color:'#fff',
        fontSize:16
    },
    full:{
        flexDirection:'row',
        width:width-20,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#1c1c1c',
        paddingVertical:20,
        paddingHorizontal:20,
        marginTop:17,
        borderRadius:7
    },
    back:{
        paddingRight:20,
        paddingLeft:5,
        backgroundColor:'#373737',
        borderRadius:7,
        flexDirection:'row',
        marginTop:20,
        fontFamily:'Montserrat-Medium',
        alignItems:'center',
        paddingVertical:2
    },
    backText:{
        fontFamily:'Montserrat-Medium',
        color:'#fff',
        fontSize:20
    },
    logout:{
        width:50,
        height:50,
        marginRight:7
    },
    user:{
        width:56,
        height:56,
        resizeMode:'contain',
        marginBottom:10
    }

});

export default styles
  