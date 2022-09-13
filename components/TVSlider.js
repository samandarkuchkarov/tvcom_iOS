import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {getFavChannels} from '../services/http/channels';
import useFetching from '../hooks/useFetching';
import translateText from '../services/localization/translateText';
import Slider from './UI/Slider';
import TVCard from './UI/TVCard';
import {globalStyles} from '../utils/constants';
import {useAuth} from '../services/authentication';
import {ActivityIndicator} from 'react-native';

export default function TVSlider() {
  const auth = useAuth();

  const [fetchChannels, channels, loading, error] = useFetching(async () => {
    const data = await getFavChannels(auth.token);
    return data;
  });
  useEffect(() => {
    fetchChannels();
  }, []);

  return (
    <View>
      <Text allowFontScaling={false}style={globalStyles.title}>{translateText('TV2')}</Text>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Slider
          data={channels}
          renderItem={({channel_id, name, img}) => {
            return <TVCard key={channel_id} name={name} img={img} />;
          }}
        />
      )}
    </View>
  );
}
