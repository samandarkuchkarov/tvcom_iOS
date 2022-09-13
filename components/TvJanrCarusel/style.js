import { StyleSheet, Dimensions } from "react-native";
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    cardText:{
        color:'#fff',
        fontSize:16,
        marginTop:-3
    },
    cardblock:{
        marginLeft:10,
        backgroundColor:'#1c1c1c',
        borderRadius:100,
        paddingVertical:8,
        paddingHorizontal:20,
    },
    wrapper:{
        marginBottom:20,
        marginTop:10
    },

    
});

export default styles
  