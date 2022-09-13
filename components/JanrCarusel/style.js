import { StyleSheet, Dimensions } from "react-native";
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    cardText:{
        color:'#fff',
        fontSize:16
    },
    wrapper:{
        marginVertical:10
    },
    btn:{
        paddingVertical:8,
        paddingHorizontal:20,
        marginLeft:10,
        backgroundColor:'#1c1c1c',
        borderRadius:100,
    }

    
});

export default styles
  