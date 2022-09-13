import { StyleSheet, Dimensions } from "react-native";
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    screen: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000047',
    },
    modal: {
        width: width-40,
        backgroundColor: '#1c1c1c',
        borderRadius: 7,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        paddingBottom:15
    },
    title:{
        color: '#fff',
        fontSize: 24,
        fontWeight:'bold',
        marginBottom:5,
        marginTop:5
        
    },
    modalText: {
        color: '#fff',
        fontSize: 18,
        textAlign:'justify',
        width:'100%'
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

});

export default styles
  