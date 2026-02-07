import { StyleSheet } from 'react-native';

const useStyleChangePassword = (theme, width, height) => {
  const styleChangePassword = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',
    },
    card: {
      width: width * 0.85,
      height: height * 0.41,
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? '#555' : '#B9D3EA',
      borderRadius: 30,
      marginHorizontal: width * 0.075,
      marginVertical: width * 0.1,
      paddingVertical: 15,
      shadowColor: theme === 'dark' ? '#4A90E2' : '#333',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4.84,
      elevation: 15,
    },
    titleInput: {
      width: width * 0.6,
      marginVertical: 8,
    },
    titleText: {
      color: theme === 'light' ? '#333' : '#fff',
      padding: 5,
    },
    inputPassword: {
      width: width * 0.6,
      borderBottomWidth: 1,

      borderColor: theme === 'light' ? '#333' : '#fff',
      color: theme === 'light' ? '#333' : '#fff',
      paddingHorizontal: 10,
      height: height * 0.045,
      gap: 5,
    },
    btnSalvar: {
      backgroundColor: '#4A90E2',
      width: width * 0.3,
      height: height * 0.035,
      borderRadius: 60,
      alignSelf: 'flex-end',
      padding: 5,
      marginHorizontal: width * 0.1,
      marginBottom: 20,
      alignItems: 'center',
      zIndex: 1,
      marginTop: 30,
    },
    eye: {
      position: 'absolute',
      right: 10,
      marginRight: 55,
      width: 22,
      justifyContent: 'flex-end',
      color: theme === 'light' ? '#333' : '#fff',
    },
    arrowView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 20,
    },
    newPassword: {
      flexDirection: 'row',
      backgroundColor: '',
      width: width * 0.85,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return styleChangePassword;
};
export default useStyleChangePassword;
