import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, Image, TouchableWithoutFeedback, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
//import useFetching from '../../hooks/useFetching';
//import {getBanners} from '../../services/http/banner';
import { Datas } from '../../context';
let {width,height} = Dimensions.get('window')
const SLIDER_WIDTH = height>width?width:height;
width = height>width?width:height

const ITEM_WIDTH = 302;
const ITEM_HEIGHT = 260;


export default function BannerCarousel({navigation}) {

const {getBanner,getCurrentMovie} = useContext(Datas)

const [banners,setBanners] = useState([])



  useEffect(() => {
    const fetch = async() =>{
       const banners = await getBanner();
       setBanners(banners)

    }
    fetch()
  }, []);

  const submit = async(item) =>{
    
    if (!item.is_promotion) {
      if(item.movie_id == 123){
        return
      }
      
      let detail = await getCurrentMovie(item.movie_id);
      if (detail && !detail.error) {
        navigation.navigate('CurrentMovie', detail);
      }
      
    } 
  }

  const _renderItem = ({item, index}, parallaxProps) => {
    return (
      <TouchableWithoutFeedback onPress={()=>submit(item)}>
        <View
          style={{
            backgroundColor: '#1c1c1c',
            borderRadius: 7,
            height: ITEM_HEIGHT,
          }}>
          <Image
           source={{uri:'http://play.tvcom.uz:8009/storage/'+ item.img_mini}}
           style={{width:ITEM_WIDTH,height:ITEM_HEIGHT,resizeMode:'cover'}}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const _renderItem2 = ({item, index}, parallaxProps) => {
    return (
      <TouchableWithoutFeedback onPress={()=>submit(item)}>
        <View
          style={{
            backgroundColor: '#1c1c1c',
            borderRadius: 7,
            height: ITEM_HEIGHT,
          }}>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{width: width,overflow: 'hidden'}}>
      {banners&&banners.length?<Carousel
        layout={'default'}
        data={banners}
        useScrollView={true}
        firstItem={banners.length}
        initialScrollIndex={banners.length}
        getItemLayout={(data, index) => (
          {length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index}
        )}
        decelerationRate={0.25}
        loopClonesPerSide={banners.length}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        renderItem={_renderItem}
        hasParallaxImages
        loop={true}
        shouldComponentUpdate ={false}
        autoplay
        autoplayInterval={3000}
      />:<>
        <Carousel
        layout={'default'}
        data={['11','111','1111',"1111"]}
        useScrollView={true}
        firstItem={3}
        initialScrollIndex={3}
        getItemLayout={(data, index) => (
          {length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index}
        )}
        decelerationRate={0.2}
        loopClonesPerSide={4}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        renderItem={_renderItem2}
        loop={true}
        shouldComponentUpdate ={false}
      />
      </>}
    </View>
  );
}
