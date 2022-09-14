import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper:{
        width:width,
    },
    channelItem:{
        width:180,
        height: 135,
        marginRight:10,
        marginTop:5,
        marginBottom:20
    },
    img:{
        width:180,
        height: 100,
    },
    focusableWrapper:{
        width:'100%',
        height:'100%',
    },
    focusable:{
        width:'100%',
        height:'100%',
    },
    back:{
        position:'absolute',
        top:0,
    },
    icon: {
        width: '100%',
        height: '95%',
        resizeMode:'stretch',
        borderRadius:12,
        overflow:'hidden',
        marginTop:5,
    },
    imageWrapper: {
        height: 110,
        width: 180,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        overflow:'hidden'
    },
    imageWrapperEmpty:{
        backgroundColor:'#1c1c1c',
        borderRadius: 7,
        height: 110,
        width: 180,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        overflow:'hidden'
    },
    imageWrapper2: {
        height: 110,
        width: 180,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:7,
        backgroundColor:'#1c1c1c',
        overflow:'hidden'
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 5,
        fontSize:15,
        fontWeight:'bold'
    },
    
    lock: {
        width: 21,
        height: 21,
        resizeMode: 'contain',
    },
    lockWrapper: {
        position: 'absolute',
        top: 5,
        right: 10,
        backgroundColor: '#1c1c1c',
        borderRadius: 7,
        padding: 5,
    },
    border:{
        position:'absolute',
        
    },
    name:{
        fontSize: 22,
        color:'#fff',
        marginLeft:10,
        lineHeight:22,
        marginTop:22
    },
    footerWrapper:{
        borderRadius: 10,
        height: 110,
        width: 180,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        overflow:'hidden',
        backgroundColor:'#1c1c1c'
    },
    dotts:{
        width:'100%',
        height:30,
        resizeMode:'contain'
    },
    SmallIcon:{
        width:70,
        height:48,
        position:'absolute',
        zIndex:10,
        left:4,
        bottom:0,
        resizeMode:'contain',
        borderRadius:7,
        borderWidth:1,
        borderColor:'#fff'
    },
    dotts:{
        width:50,
        height:50,
        resizeMode:'contain'
    }
});

export default styles;
