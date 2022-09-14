import { StyleSheet, Dimensions } from "react-native";
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'#010101',
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        width:width-40,
        marginLeft:20
    },
    screen: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000047',
    },
    modal: {
        width: width-40,
        height: 120,
        backgroundColor: '#1c1c1c',
        borderRadius: 7,
        justifyContent:'center',
        alignItems:'center'
    },
    modalText: {
        color: '#fff',
        fontSize: 18,
        paddingHorizontal:10
    },
    backText: {
        color: '#fff',
        fontSize: 18,
    },
    back:{
        width:width-60,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#E41A4B',
        padding:10,
        marginTop:10,
        borderRadius:7
    },
    error:{
        color:'#ff4545',
        fontSize:16,
        marginBottom:10
    }
});

export default styles
  