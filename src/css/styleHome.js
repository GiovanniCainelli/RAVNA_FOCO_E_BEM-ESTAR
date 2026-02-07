import { StyleSheet } from 'react-native';

const useStyleHome = (theme, width, height) => {
  return StyleSheet.create({
    animatedHeader: {
      backgroundColor: theme === 'dark' ? '#222' : '#EBF3FC', // Cor do cabeçalho
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    background: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#333' : '#EBF3FC', // Cor de fundo dinâmica
    },
    containerCarrossel: {
      backgroundColor: theme === 'dark' ? '#555' : '#4A90e2', // Cor do carrossel
      marginTop: 5,
      height: height * 0.2,
      marginVertical: 7,
      marginHorizontal: 15,
      zIndex: 2,
      flexDirection: 'column',
      justifyContent: 'center',
    },

    contentPager: {
      flexDirection: 'row',
      gap: 5,
      marginTop: 18,
      alignItems: 'center',
      height: height * 0.08,
    },
    logoPager: {
      height: height * 0.05,
      width: height * 0.05,
    },
    cardRender: {
      margin: 12,
      backgroundColor: theme === 'dark' ? '#555' : '#B9D3EA',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemCard: {
      width: width * 0.6,
      height: height * 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentCard: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.00)',
      borderRadius: 30,
      zIndex: 2,
    },
    textCard: {
      position: 'absolute',
      zIndex: 3,
      width: '100%',
      height: 50,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.400)',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    contentCardHorizontal: {
      position: 'absolute',
      width,
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.00)',
      borderRadius: 30,
      zIndex: 2,
    },
    textCardHorizontal: {
      position: 'absolute',
      zIndex: 3,
      width: width * 0.94,
      height: 50,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.500)',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    styleText: {
      color: '#fff',
      fontWeight: '900',
      letterSpacing: 1,
    },
    carrContent: {
      flexDirection: 'row',
      gap: 5,
      height: height * 0.08,
      marginTop: 18,
      alignItems: 'center',
    },
  });
};

export default useStyleHome;
