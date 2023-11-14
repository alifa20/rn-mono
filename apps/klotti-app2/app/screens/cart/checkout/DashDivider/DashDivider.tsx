import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { G, Rect } from 'react-native-svg';

export const DashDivder = () => {
  const { width } = Dimensions.get('screen');
  const spacing = 16;

  const dashes = new Array(Math.floor(width / spacing)).fill(null);
  return (
    <Svg height="11" width="100%">
      <G>
        {dashes.map((_data, index) => (
          <Rect
            key={index}
            x="1"
            y="10"
            width="6"
            height="1"
            fill="#C4C4C4"
            translateX={spacing * index}
          />
        ))}
      </G>
    </Svg>
  );
};
