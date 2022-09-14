import { StyleSheet, Dimensions } from "react-native";
const {width} = Dimensions.get('window');
const numColoms = Math.trunc((width-10) / (170+10));
const styles = StyleSheet.create({
    content: {
        width:(width-10)/numColoms,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:10
    },
});

export default styles
  