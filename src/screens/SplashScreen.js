import {
  StyleSheet,
  Platform,
  StatusBar,
  View,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useContext } from 'react';
import { Video } from 'expo-av';
import { ThemeContext } from '../components/DarkMode/DmContext';
import styleImg from '../css/StyleImg';
import useStyles from '../css/style';
import WindowDimensionsImg from '../css/StyleImg';

const SplashScreen = ({ navigation }) => {
  const styleImg = WindowDimensionsImg();
  const style = useStyles(width, height);
  const { theme } = useContext(ThemeContext);
  const { width, height } = useWindowDimensions();

  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('black');
        StatusBar.setBarStyle('light-content');
      }

      return () => {
        if (Platform.OS === 'android') {
          StatusBar.setBackgroundColor(theme === 'light' ? '#EBF3FC' : '#333');
          StatusBar.setBarStyle(
            theme === 'light' ? 'dark-content' : 'light-content'
          );
        }
      };
    }, [theme])
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Register');
    }, 6000);

    return () => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(theme === 'light' ? '#EBF3FC' : '#333');
        StatusBar.setBarStyle(
          theme === 'light' ? 'dark-content' : 'light-content'
        );
      }
      clearTimeout(timer);
    };
  }, [navigation, theme]);

  return (
    <View style={style.containerSplash}>
      <StatusBar backgroundColor="#0b2849" barStyle="light-content" />
      <Video
        source={require('../img/HeaderImg/splashRavna.mp4')}
        style={styleImg.polvo1}
        resizeMode="cover"
        shouldPlay
        isLooping={false}
      />
    </View>
  );
};

export default SplashScreen;
