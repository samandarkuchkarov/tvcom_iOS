import React from 'react';
import { View, StyleSheet, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native';
import {Datas} from '../../context';





export default function Cinema({setCinema, cinema, selectedCinema, setSelectedCinema }) {
  const {isLogin, getCinema} = React.useContext(Datas);


  React.useEffect(() => {
    let render = true;
    const fetch = async () => {
      let cinema = await getCinema();
      if (render&&cinema) {
        cinema = cinema.map(i=>{
            i.name = i.provider_name
            return i
        })
        setCinema(cinema);
      }
    };
    fetch();
    return () => {
      render = false;
    };
  }, [isLogin]);

  const press = item => {
    if(item.id!=selectedCinema.id){
        setSelectedCinema(item)
    }else{
        setSelectedCinema({id:-1})
    }
  };

  return (
    <View style={styles.container}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
        {cinema ? (
            <>
                {cinema.map((item,index) => (
                    <TouchableOpacity onPress={()=>press(item)} key={item.cinema_img}>
                        <ImageBackground  source={{uri:'http://play.tvcom.uz:8008/storage/'+item.cinema_img2}} style={{...styles.block,borderColor:selectedCinema.id == item.id ? '#E41A4B' : 'transparent',marginLeft:index==0?20:10}}>
                            <View style={styles.dott}>
                                {selectedCinema.id == item.id?<Image style={styles.check} source={require('../../images/cycleCheck1.png')}/>:
                                <Image style={styles.check} source={require('../../images/cycleCheck0.png')}/>}
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                ))}
            </>
        ) : (
            <></>
        )}
        </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: -10,
    width:'100%',
    justifyContent:'center',
    flexDirection:'row',
  },
  name: {
    color: '#fff',
  },
  focus: {
    marginHorizontal: 0,
  },
  block: {
    width:100*2.06,
    height:100,
    resizeMode:'cover',
    borderRadius:7,
    overflow:'hidden',
    borderWidth:2,
    alignItems:'flex-end',
    marginLeft:30
  },
  wrapper: {
    width: 170,
  },
  check:{
    width:16,
    height:16,
    resizeMode:'contain',
    marginTop:5,
    marginRight:5,
  },
  dott:{
    marginTop:3
  }
});
