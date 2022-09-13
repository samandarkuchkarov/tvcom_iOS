import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper:{
        width:width-10,
        marginBottom:10,
    },
    wrapperItem:{
        width:90,
        height:130,
        marginRight:20,
    },
    wrapperFocusable:{
        width:'100%',
        height:'100%',
    },
    actorItem:{
        width:'98%',
        height:'100%',
        alignSelf:'center',
        top:0,
        position:'absolute'
    },
    icon:{
        width:60,
        height:80
    },
    iconWrapper:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:9,
        overflow:'hidden'
    },
    name:{
        width:'100%',
        textAlign:'center',
        color:'#fff',
        marginTop:5,
        fontSize: width>1000?18 : 14,
    },
    focusable:{
        width:'100%',
        height:'100%'
    },
    actorText:{
        color:'#fff',
        fontSize: width>1000?28 : 22,
        marginBottom:10,
        marginLeft:10
    }

});

export default styles;
