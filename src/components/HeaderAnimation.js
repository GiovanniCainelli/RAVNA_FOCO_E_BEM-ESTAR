import { Animated } from 'react-native';
import { useRef } from 'react';

export const useHeaderAnimation = () => {
  const translateY = useRef(new Animated.Value(0)).current; // Posição Y do header
  const lastScrollY = useRef(0);

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const offset = currentScrollY - lastScrollY.current;

    if (offset < 0) {
      translateY.setValue(Math.max(translateY._value + offset, 0)); // Move o header para cima
    } else {
      translateY.setValue(Math.min(translateY._value + offset, 100)); // Permite que o header seja empurrado
    }

    lastScrollY.current = currentScrollY;
  };

  // Calcular opacidade com base na posição do scroll
  const opacity = translateY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0], // De totalmente opaco para totalmente transparente
    extrapolate: 'clamp',
  });

  return { translateY, opacity, handleScroll };
};
