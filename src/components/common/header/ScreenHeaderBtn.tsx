import React from 'react';
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  DimensionValue,
} from 'react-native';

import styles, { getBtnImgStyle } from './screenheader.style';

type ScreenHeaderBtnTypes = {
  iconUrl: ImageSourcePropType;
  dimension: DimensionValue;
  handlePress: () => void;
};

const ScreenHeaderBtn = ({
  iconUrl,
  dimension,
  handlePress,
}: ScreenHeaderBtnTypes) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={getBtnImgStyle(dimension)}
      />
    </TouchableOpacity>
  );
};

export default ScreenHeaderBtn;
