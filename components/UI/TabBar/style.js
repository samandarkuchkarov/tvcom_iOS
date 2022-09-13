import { StyleSheet,Dimensions } from "react-native";
const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        width: width/5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#010101'
    },
    item:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default styles
  