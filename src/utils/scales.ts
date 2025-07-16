import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const horizontalScale = (size: number) =>
  PixelRatio.roundToNearestPixel((width / guidelineBaseWidth) * size);

export const verticalScale = (size: number) =>
  PixelRatio.roundToNearestPixel((height / guidelineBaseHeight) * size);

export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;
