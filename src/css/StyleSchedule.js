import { StyleSheet } from 'react-native';

const useStyleSchedule = (theme, width, height) => {
  const styleSchedule = StyleSheet.create({
    containerSchedule: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#333' : '#EBF3FC',
      justifyContent: 'center',
      alignItems: 'center',
    },
    flatList: {
      flex: 1,
    },
    cardSchedule: {
      width: width * 0.85,
      height: height * 0.65,
      justifyContent: 'center',

      backgroundColor: theme === 'dark' ? '#555' : '#B9D3EA',
      borderRadius: 30,
      marginHorizontal: width * 0.075,
      marginVertical: width * 0.1,
      paddingVertical: 20,
    },
    item: {
      flexDirection: 'row-reverse',
      padding: 10,
    },
    checkDel: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 20,
      flexWrap: 'wrap',
      flexShrink: 0,
      width: width * 0.425,
    },
    cardText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: theme === 'light' ? '#000' : '#fff',
    },
    inputText: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
      color: theme === 'light' ? '#000' : '#fff',
      borderBottomWidth: 1,
      borderBottomColor: theme === 'light' ? '#333' : '#fff',
      width: width * 0.5,
      height: height * 0.05,
    },
    btnAdd: {
      backgroundColor: '#4A90E2',
      borderRadius: 10,
      width: width * 0.5,
      height: height * 0.045,
      alignItems: 'center',
      marginBottom: 20,
      zIndex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 10,
    },
    viewItem: {
      flexDirection: 'column',
      flex: 1,
    },
    inputExpanded: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 15,
      paddingBottom: 2,
      color: theme === 'light' ? '#000' : '#fff',
      borderBottomWidth: 1,
      width: width * 0.3,
      height: height * 0.04,
      opacity: 0.8,
    },
    timerView: {
      flexDirection: 'row',
      zIndex: 2,
      justifyContent: 'center',
    },
    viewBtnExp: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-around',
      marginHorizontal: 5,
      gap: 30,
      marginTop: 20,
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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height,
      position: 'relative', // necessário para o overlay absoluto funcionar corretamente dentro dele
      zIndex: 2,
    },

    modalContent: {
      backgroundColor: '#EBF3FC',
      height: height * 0.25,
      width: width * 0.85,
      borderRadius: 20,
    },
    titleModal: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: height * 0.06,
      margin: 5,
    },
    textTitle: {
      fontSize: 20,
      letterSpacing: 0.5,
    },
    viewExpanded: {
      flexDirection: 'column',
      width: width * 0.8,
      alignItems: 'center',
      height: height * 0.15,
      marginTop: 8,
      borderBottomWidth: 0.5,
      borderBottomColor: '#333',
    },
  });
  return styleSchedule;
};

export default useStyleSchedule;
