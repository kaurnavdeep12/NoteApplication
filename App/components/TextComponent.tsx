import * as React from 'react';
import {Text} from 'react-native';
import {fontScale} from '../utils/Config';

export const TextComponent = (props: any) => {
  return (
    <Text
      {...props}
      style={[
        {
          color: '#102624',
          fontSize: fontScale(14),
          fontFamily: 'NotoSerif-Bold',
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};
