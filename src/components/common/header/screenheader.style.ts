import { DimensionValue, ImageStyle, StyleSheet } from 'react-native';

import { COLORS, SIZES } from '../../../constants';

export const getBtnImgStyle = (dimension: DimensionValue): ImageStyle => ({
  width: dimension,
  height: dimension,
  borderRadius: SIZES.small / 1.25,
});

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnImgStyle: getBtnImgStyle(20),
});

export default styles;
