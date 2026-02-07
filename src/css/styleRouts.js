import { StyleSheet } from 'react-native';

const useStyleRouts = (width, height, theme) => {
  const styleRouts = StyleSheet.create({
    container: {
      flex:1,

    },
    tab:{
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',
      borderTopColor: theme === 'dark' ? '#555' : '#ddd',
      borderTopWidth: 0.2,
      
    }
  });
  return styleRouts;
};

export default useStyleRouts;
