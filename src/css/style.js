import { StyleSheet } from 'react-native';
const usestyles = (width, height) => {
  const styles = StyleSheet.create({
    containerRegister: {
      flex: 1,
      backgroundColor: '#EBF3FC',
    },
    formRegister: {
      backgroundColor: '#EBF3FC',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
      height: '70%',
      width: '100%',
      borderRadius: 20,
      marginTop: 90,
    },
    textSignUp: {
      color: '#035378',
      fontWeight: 'bold',
      fontSize: 25,
      padding: 5,
      marginBottom: 10,
      backgroundColor: '',
      textAlign: 'center',
      width: width * 0.4,
    },
    inputSignUp: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#ccc',
      padding: 10,
      paddingLeft: 60,
      position: 'relative',
      width: width * 0.76,
    },
    formRegisterInput: {},
    buttonRegister: {
      backgroundColor: '#035378',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 30,
    },
    buttonLogin: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#035378',
      backgroundColor: '#fff',
    },
    textButtonRegister: {
      color: '#fff',
      textAlign: 'center',
      padding: 10,
    },
    textButtonLogin: {
      color: '#000',
      textAlign: 'center',
      padding: 10,
    },
    absoluteContainer: {
      width: '100%',
      padding: 10,

      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '',
      height: height * 0.095,
    },
    absoluteContainerLogin: {
      width: '100%',
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '',
      height: height * 0.085,
      marginBottom: 8,
    },
    iconeContainer: {
      fontSize: 20,
      left: 40,
      position: 'absolute',
      zIndex: 1,
    },
    textContainerSignInLogin: {
      marginTop: 20,
      flexDirection: 'row',
      marginLeft: 10,
    },
    buttonLinkLogin: {
      marginLeft: 140,
      borderBottomWidth: 1,
      borderColor: '#0000ff',
    },
    textLinkLogin: {
      color: '#0000ff',
    },
    textLinkRegister: {
      color: '#0000ff',
    },
    buttonLinkRegister: {
      color: '#0000ff',
      borderBottomWidth: 1,
      borderColor: '#0000ff',
      marginLeft: 105,
    },
    containerSplash: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lineOr: {
      backgroundColor: '#ccc',
      width: 130,
      height: 1,
    },
    viewLineOr: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      margin: 12,
    },
    ravnaImg: {
      width: 270,
      height: 155,
      marginBottom: 5,
    },
    textView: {
      width,
      height: height * 0.12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewIcons: {
      width,
      height: height * 0.12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icons: {
      flexDirection: 'row',
      width: width * 0.3,
      justifyContent: 'space-between',
    },
  });
  return styles;
};

export default usestyles;
