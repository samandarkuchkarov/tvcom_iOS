import { StyleSheet, Dimensions } from "react-native";
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    cardText:{
        color:'#fff',
        fontSize:12,
        marginTop:5,
        textAlign:'center',
    },
    wrapper:{
        marginBottom:20
    },
    card:{
        backgroundColor:'#1c1c1c',
        width:90,
        height:90,
        alignItems:'center',
        marginRight:10,
        borderRadius:7,
        paddingTop:10,
        paddingBottom:10,
        paddingHorizontal:3
    },
    image:{
        width:40,
        height:40
    }

    
});

export default styles
  