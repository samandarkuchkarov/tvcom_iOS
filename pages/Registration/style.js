import { StyleSheet, Dimensions } from "react-native";
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor:'#010101',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
     
    },
    contener:{
        width:width-40,
        marginLeft:20
    },
    content:{
        marginBottom:15
    },
    wrapperFocus2:{
        width: width-40,
        justifyContent:'center',
        alignItems:'center',
        height:55,
        marginVertical:10,
        flexDirection:'row'
      },
      focusCheck:{
        width:30,
        height:30,
        justifyContent:'center',
        alignItems:'center'
      },
      text:{
        color:'#fff',
        marginLeft:8,
        marginTop:3,
        width: width-40-40,
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
        height: 150,
        backgroundColor: '#1c1c1c',
        borderRadius: 7,
        justifyContent:'center',
        alignItems:'center'
      },
      modalText: {
        color: '#fff',
        fontSize: 18,
        paddingHorizontal:5,
        paddingTop:10,
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
  