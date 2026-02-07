import { StyleSheet, useWindowDimensions } from 'react-native';
const imageSize = 130;
const WindowDimensionsImg = () => {
  const { width, height } = useWindowDimensions();
  const styleImg = StyleSheet.create({
    polvo1: {
      width,
      height,
      flex: 1,
    },
    accountProfile: {
      height: imageSize,
      width: imageSize,
      alignItems: 'center',
      borderRadius: 100,
    },
    accountHeader: {
      height: 38,
      width: 38,
      alignItems: 'center',
      borderRadius: 100,
    },
    contentCardImg: {
      width: width * 0.6,
      height: height * 0.2,
      borderRadius: 10,
    },
    contentCardImgHorizontal: {
      width: width * 0.94,
      height: height * 0.2,
      borderRadius: 30,
    },
  });
  return styleImg;
};

export default WindowDimensionsImg;
