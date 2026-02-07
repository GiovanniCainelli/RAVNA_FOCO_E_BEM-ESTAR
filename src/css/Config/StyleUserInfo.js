import { StyleSheet, useWindowDimensions } from 'react-native';

const WindowDimensions = (theme) => {
  const { width, height } = useWindowDimensions();

  const styleUserInfo = StyleSheet.create({
    containerUserInfo: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',
    },

    containerimgForm: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'start',
      paddingTop: 25,
      height: height,
      width: width,
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',
    },
    btnEditar: {
      backgroundColor: '#4A90E2',
      width: width * 0.3,
      height: height * 0.035,
      borderRadius: 60,
      alignSelf: 'flex-end',
      marginBottom: 10,
      padding: 5,
      marginHorizontal: width * 0.1,
      marginVertical: 5,
      alignItems: 'center',
      zIndex: 1,
      marginTop: 30,
    },
    fieldInfo: {
      borderBottomWidth: 1,
      borderBottomColor: theme === 'light' ? '#333' : '#fff',
      borderTopColor: theme === 'light' ? '#333' : '#fff',
      width: width * 0.8,
      height: height * 0.05,
      justifyContent: 'center',
      paddingLeft: 10,
    },
    fieldName: {
      width: width * 0.8,
      marginTop: 15,
      height: height * 0.03,
      justifyContent: 'center',
      paddingLeft: 10,
    },
    modalView: {
      height: height * 0.25,
      paddingBottom: 30,
      margin: 20,
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme === 'dark' ? '#4A90E2' : '#333',
      marginTop: 150,
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
      fontSize: 17,
      color: theme === 'light' ? '#333' : '#fff',
    },
    modalBtnView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: width * 0.8,
      height: height * 0.08,
    },
    modalButton: {
      backgroundColor: '#B9D3EA',
      width: width * 0.3,
      height: height * 0.038,
      borderRadius: 60,
      alignSelf: 'flex-end',
      marginBottom: 10,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },

    overlay: {
      opacity: 0,
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,

      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    overlayVisible: {
      opacity: 2,
      position: 'absolute',
    },
    userImg: {
      width: width * 0.3,
      height: width * 0.3,
      borderRadius: 120,
      marginTop: 10,
    },
    buttonContainer: {
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuTrigger: {
      backgroundColor: '#f5f5f5',
      padding: 10,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: '#4CAF50',
    },
    menuOptions: {
      backgroundColor: '#fff',
      padding: 10,
    },
    option: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    backdrop: {
      opacity: 0,
      position: 'relative',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flex: 1,
    },

    backdropVisible: {
      opacity: 1,
      position: 'absolute',
    },

    container: {
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',

      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      paddingTop: 10,
      position: 'absolute',
      left: 10,
      right: 10,
      bottom: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 10,
    },
    options: {
      paddingVertical: 18,
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
    },
    optionCancel: {
      paddingVertical: 18,
      marginTop: 6,
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      color: '#007AFF',
      fontWeight: '600',
    },
    textCancel: {
      fontSize: 18,
      textAlign: 'center',
      fontWeight: '600',
      color: theme === 'dark' ? '#fff' : '#444',
    },
    textPassword: {
      color: theme === 'light' ? '#333' : '#fff',
      borderBottomWidth: 0.8,
      borderBottomColor: theme === 'light' ? '#000' : '#fff',
      width: width * 0.4,
    },
  });
  return styleUserInfo;
};
export default WindowDimensions;
