import { StyleSheet } from 'react-native';
const useStyleNotification = (theme, width, height) => {
  const styleNotification = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',
    },
    activity: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: height * 0.07,
      alignItems: 'center',
      backgroundColor: '',
      marginHorizontal: 10,
      gap: 20,
      padding: 8,
    },
    containerNotification: {
      width: width * 0.95,
      height: height * 0.15,
      backgroundColor: '#B0C4DE',
      shadowColor: theme === 'dark' ? '#4A90E2' : '#333',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4.84,
      elevation: 15,
      borderRadius: 10,
      marginVertical: 15,
      marginHorizontal: 10,
    },
    notification: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      width: width * 0.75,
    },
    day: {
      fontWeight: 'bold',
      justifyContent: 'space-around',
      width: width * 0.6,
      height: height * 0.05,
      fontSize: 17,
      padding: 8,
      marginHorizontal: 15,
    },
    time: {
      fontSize: 16,
    },
    endTime: {
      height: height * 0.05,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
      marginLeft: 15,
      width: width * 0.15,
    },
    title: {
      marginHorizontal: 15,
      fontSize: 15,
      paddingVertical: 16,
      paddingLeft: 8,
    },
    notifyBtn: {
      width: width * 0.95,
      height: height * 0.09,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    broom: {
      flexDirection: 'row',
      backgroundColor: '#4A90E2',
      width: width * 0.35,
      height: height * 0.045,
      borderRadius: 11,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return styleNotification;
};

export default useStyleNotification;
