import { StyleSheet,Dimensions } from "react-native";

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        marginBottom:10
    },
    season:{
        color:'#fff',
        fontSize:20,
        fontWeight:'bold',
        marginBottom:10,
        marginLeft:10
    },
    item:{
        width:130,
        height:130/1.66+50,
        marginRight:10,
    },
    serialFace:{
        width:130,
        height:130/1.66,
    },
    seriaText:{
        color:'#fff',
        marginTop:5,
        width:130,
        textAlign:'center',
        fontSize:16
    }
});

export default styles
  