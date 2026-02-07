import { StyleSheet } from 'react-native';

const useStyleMethodologies = (width, height, theme) => {
  const styleMetodologies = StyleSheet.create({
    containerMetodologies: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#333' : '#EBF3FC',
    },
    containerFlat: {
      margin: 12,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    search: {
      marginLeft: 20,
      width: width * 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    containerFlatCard: {
      width: width * 0.44,
      height: height * 0.2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4.84,
      elevation: 5,
      borderRadius: 10,
    },
    textOptionsMethodologies: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 12,
      padding: 5,
      gap: 10,
    },
    imageContainerFlat: {
      width: width * 0.44,
      height: height * 0.2,
      borderRadius: 10,
      objectFit: 'contain',
    },
    imageModal: {
      borderRadius: 10,
      height: height * 0.3,
      width: width * 0.8,
    },
    modal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height,
      position: 'relative', // necessário para o overlay absoluto funcionar corretamente dentro dele
      zIndex: 2,
    },
    modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',
      width,
      height: height * 0.96,
    },
    modalView: {
      width: width * 0.9,
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',
      padding: 20,
    },
    buttonClose: {
      position: 'absolute',
      top: 5,
      left: 0,
      marginLeft: 30,

      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
      zIndex: 2,
    },
    modalText: {
      textAlign: 'center',
      fontSize: 30,
      color: theme === 'dark' ? '#fff' : '#EBF3FC',
      letterSpacing: 1,
      marginBottom: 10,
    },
    modalDescription: {
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',
      height: height * 0.18,
      marginTop: 10,
      marginBottom: 5,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    modalTextDesc: {
      textAlign: 'justify',
      lineHeight: 20,
      color: theme === 'dark' ? '#fff' : '#333',
      fontSize: 17,
      letterSpacing: 1,
    },
    viewExample: {
      height: height * 0.2,
      marginBottom: 5,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    example: {
      textAlign: 'justify',
      lineHeight: 20,
      color: theme === 'dark' ? '#fff' : '#333',
      fontSize: 17,
      letterSpacing: 1,
    },
    viewTop: {
      flexDirection: 'row',
      width: width,
      height: height * 0.06,
      justifyContent: 'center',
      zIndex: 10,
      elevation: 10,
      marginTop: 10,
    },
    viewHeart: {
      backgroundColor: '',
      zIndex: 1,
      width: width * 0.2,
      marginLeft: 250,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heart: {
      flexDirection: 'row-reverse',
      backgroundColor: '',
      width: width * 0.2,
      alignItems: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0, // começa invisível
      backgroundColor: theme === 'dark' ? '#333' : '#EBF3FC',
      zIndex: 2,
    },
    overlayVisible: {
      opacity: 1, // ou o quanto quiser que apareça
    },
  });
  return styleMetodologies;
};

export default useStyleMethodologies;
