import { StyleSheet } from 'react-native';

const useStyleContact = (theme, width, height) => {
  const styleContact = StyleSheet.create({
    containerUserInfo: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',
    },
    containerimgForm: {
      marginHorizontal: 18,
      justifyContent: 'start',
      alignItems: 'center',
      height: height * 0.25,
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',
      gap: 20,
    },
    lineWithText: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: theme === 'dark' ? '#aaa' : '#4A90E2',
    },
    image: {
      width: width * 0.75,
      height: height * 0.35,
      marginTop: 5,
    },
    iconAndText: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 8,
    },
    postsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#fff' : '#333',
      marginLeft: 4,
    },
    viewInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.9,
      alignSelf: 'center',
      marginVertical: 5,
    },

    infoContact: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconInfo: {
      flexDirection: 'row',
      gap: 20,
      alignItems: 'center',
    },
    aboutMe: {
      backgroundColor: '',
      marginHorizontal: 15,
      justifyContent: 'start',
      height: height * 0.1,
      gap: 20,
    },
    imgContact: {
      width: width * 0.3,
      height: height * 0.15,
      borderRadius: 120,
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
      borderRadius: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme === 'light' ? '#333' : '#fff',
      borderTopColor: theme === 'light' ? '#333' : '#fff',
      height: height * 0.05,
      paddingHorizontal: 10,
      paddingVertical: 10,
      gap: 10,
    },
    fieldName: {
      width: width * 0.8,
      borderRadius: 10,
      gap: 5,
      marginTop: 15,
    },
  });
  return styleContact;
};
export default useStyleContact;
