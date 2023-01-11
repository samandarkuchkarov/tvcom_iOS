import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width:170,
        height:252.5+45,
    },
    imageWrapper:{
        width:170,
        height:252.5,
        borderRadius:8,
        borderWidth:1,
        overflow:'hidden',
        zIndex:2
    },
    image:{
        width:170,
        height:252.5,
        overflow:'hidden',
        borderRadius:7,
        backgroundColor:'#1c1c1c'
    },
    textContent:{
        height:40,
        width:170,
        marginTop:5,
        justifyContent:'space-around'
    },
    name:{
        color:'#fff',
        width:170,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:15,
    },
    textAviable:{
        color: '#00a5ff',
        width:'100%',
        textAlign:'center'
    },
    textAviable2:{
        color:'#E41A4B',
        width:'100%',
        textAlign:'center'
    },
    cinema_icon:{
        width:30,
        height:30,
        position:'absolute',
        zIndex:2,
        right:5,
        top:5,
        resizeMode:'contain'
    },
    black:{
        backgroundColor: 'rgba(7,5,14,.8)',
        width:170,
        zIndex:5,
        position:'absolute',
        bottom:0,
        justifyContent:'center',
        flexDirection:'row'
    },
    info:{
        flexDirection:'row',
        alignItems:'center',
        marginRight:3
    },
    imdb: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginLeft:2
    },
    infoText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: 5,
      },
});

export default styles
  