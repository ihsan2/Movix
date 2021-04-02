import React from 'react';
import FastImage from 'react-native-fast-image';
import {image_url} from '../constants';

const MyImage = ({width, height, img, style}) => {
  return (
    <FastImage
      style={[{width: width, height: height}, style ? style : {}]}
      source={{
        uri: `${image_url}${img}`,
        priority: FastImage.priority.contain,
      }}
      resizeMode={FastImage.resizeMode.normal}
    />
  );
};

export default MyImage;
