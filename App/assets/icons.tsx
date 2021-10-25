import React from 'react';
import {Icons, IconTypes} from './images';
export const getIcons = (type: IconTypes, size?: number) => {
  const iconSize = size ? size : 20;
  switch (type) {
    case 'PLUS_ICON':
      return <Icons.PLUS_ICON height={iconSize} width={iconSize} />;
  }
};
