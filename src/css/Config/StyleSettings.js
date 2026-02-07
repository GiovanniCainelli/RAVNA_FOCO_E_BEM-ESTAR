import { StyleSheet } from 'react-native';

const useStyleSettings = (theme, width, height) => {
  const styleSettings = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',
    },
    viewPass: {
      borderTopColor: theme === 'light' ? '#333' : '#aaa',
      borderBottomColor: theme === 'light' ? '#333' : '#aaa',
      flexDirection: 'row',
      width,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderTopWidth: 1,
      height: height * 0.075,
    },
    btnConfig: {
      flexDirection: 'row',

      width,
      height: height * 0.075,
      alignItems: 'center',
      gap: 15,
      paddingLeft: 15,
    },
    feather: {
      borderBottomColor: theme === 'light' ? '#333' : '#aaa',
      backgroundColor: '',
      flexDirection: 'row',
      width: width * 0.75,
      gap: 15,
      paddingLeft: 15,
      alignItems: 'center',
      borderBottomWidth: 1,
      height: height * 0.075,
    },
    viewSwitch: {
      borderBottomColor: theme === 'light' ? '#333' : '#aaa',
      justifyContent: 'flex-end',
      borderBottomWidth: 1,
      height: height * 0.075,
      paddingBottom: 3,
    },

    logout: {
      borderBottomColor: theme === 'light' ? '#333' : '#aaa',
      flexDirection: 'row',
      width,
      alignItems: 'center',
      borderBottomWidth: 1,
      height: height * 0.075,
    },
    deleteAcc: {
      borderBottomColor: theme === 'light' ? '#333' : '#aaa',
      flexDirection: 'row',
      width,
      alignItems: 'center',
      borderBottomWidth: 1,

      height: height * 0.075,
    },
    textSettings: {
      fontSize: 15,
      paddingVertical: 15,
      color: theme === 'light' ? '#333' : '#fff',
    },
    modalView: {
      position: 'absolute',
      zIndex: 1,
      height: height * 0.4,
      paddingBottom: 15,
      margin: 10,
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      borderRadius: 20,
      paddingHorizontal: 30,
      paddingTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 150,
      shadowColor: theme === 'dark' ? '#4A90E2' : '#333',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 6.84,
      elevation: 15,
    },
    modalText: {
      marginVertical: 15,
      textAlign: 'center',
      gap: 5,
      letterSpacing: 1,
      fontSize: 14,
      color: theme === 'light' ? '#333' : '#fff',
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 1,
      marginBottom: 15,
      color: theme === 'light' ? '#333' : '#fff',
    },
    btnDelete: {
      color: theme === 'light' ? '#FF0000' : '#FF0000',
    },
    modalBtnView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: width * 0.8,
      height: height * 0.08,
    },
    modalButton: {
      backgroundColor: theme === 'light' ? '#B9D3EA' : '#4A90E2',
      width: width * 0.3,
      height: height * 0.038,
      borderRadius: 60,
      alignSelf: 'flex-end',
      marginBottom: 10,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewInput: {
      marginVertical: 15,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo com opacidade
      opacity: 0, // Inicialmente invisível
      zIndex: -1,
    },

    overlayVisible: {
      opacity: 1, // Quando o modal estiver visível, aplica a opacidade no fundo
    },
    arrowView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 20,
    },
    textPassword: {
      color: theme === 'light' ? '#333' : '#fff',
      borderBottomWidth: 0.8,
      borderBottomColor: theme === 'light' ? '#333' : '#fff',
      width: width * 0.4,
      marginVertical: 15,
    },
    textEmail: {
      color: theme === 'light' ? '#333' : '#fff',
      borderBottomWidth: 0.8,
      borderBottomColor: theme === 'light' ? '#333' : '#fff',
      width: width * 0.4,
    },
  });
  return styleSettings;
};
export default useStyleSettings;
