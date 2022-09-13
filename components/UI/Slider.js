import React from 'react';
import {FlatList, View} from 'react-native';
import Space from './Space';

export default function Slider({data, vertical = false, renderItem, gap = 20}) {
  const _renderItem = ({item}) => {
    return (
      <React.Fragment>
        {renderItem(item)}
        <Space width={gap} />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Space height={15} />
      <FlatList
        renderItem={_renderItem}
        horizontal={!vertical}
        data={data}
        keyExtractor={item => item.id}
      />
    </React.Fragment>
  );
}
