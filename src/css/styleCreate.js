import { StyleSheet } from 'react-native';
const useStyleCreate = (theme, width, height, isExpanded) => {
  const styleCreate = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#333' : '#EBF3FC', // Cor de fundo dinâmica
    },
    animatedHeader: {
      backgroundColor: theme === 'dark' ? '#222' : '#EBF3FC', // Cor do cabeçalho
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    modalContent: {
      width: width * 0.8,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      height: height * 0.65,
    },
    imagePicker: {
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.8,
      height: height * 0.39,
      backgroundColor: '#666',
      marginBottom: 5,
    },
    imagePreview: {
      width: width * 0.8,
      height: height * 0.39,
      zIndex: 2,
    },
    textInput: {
      borderRadius: 8,
      width: width * 0.75,
      height: height * 0.15,
      fontSize: 17,

      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButton: {
      backgroundColor: '#4A90E2',
      borderRadius: 10,
      width: width * 0.4,
      height: height * 0.045,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 10,
      marginTop: 15,
    },
    createBtn: {
      backgroundColor: '#4A90E2',
      borderRadius: 10,
      width: width * 0.5,
      height: height * 0.045,
      alignItems: 'center',
      marginBottom: 10,
      zIndex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 10,
    },
    profileImage: {
      width: width * 0.095,
      height: height * 0.05,
      borderRadius: 100,
    },
     profileImageContact: {
      width: width * 0.3,
      height: width * 0.3,
      borderRadius: 120,
    },
    iconHeader: {
      fontSize: 30,
      color: '#808080',
    },
    iconProfile:{
      fontSize:150,
      color: '#808080',
    },
    yourPost: {
      gap: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    ypText: {
      marginLeft: 17,
      fontWeight: 'bold',
      fontSize: 19,
      color: theme === 'light' ? ' #333' : '#fff',
    },
    btnCreate: {
      backgroundColor: '#4A90E2',
      borderRadius: 10,
      width: width * 0.3,
      height: height * 0.045,
      alignItems: 'center',
      marginRight: 15,
      marginBottom: 15,
      zIndex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 10,
    },
    containerPost: {
      marginVertical: 15,
      borderTopColor: 'gray',
      alignItems: 'center',
    },
    postnFound: {
      fontSize: 16,
      color: '#666',
      paddingHorizontal: 15,
      paddingTop: 15,
    },
    cardPost: {
      backgroundColor: theme === 'light' ? '#fff' : '#555',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 15,
    },
    btnEdit: {
      width: width * 0.2,
      marginLeft:'auto'
    },
    image: {
      width: width * 0.75,
      height: height * 0.35,
      marginTop: 5,
    },
    descView: {
      width: width * 0.75,
      marginBottom: 5,
      overflow: 'hidden',
    },

    bottomCard: {
      marginTop: 50,
      flexDirection: 'row',

      justifyContent: 'space-between',
      paddingHorizontal: 15,
    },
    close: {
      position: 'absolute',
      top: 1,
      right: -10,
      zIndex: 10,
    },
    infoPost: {
      flexDirection: 'row',
      paddingLeft: 15,
      alignItems: 'center',
      gap: 20,
      width: width * 0.8,
      marginBottom: 10,
      height: height * 0.05,
    },
    btnSave: {
      backgroundColor: '#4A90E2',
      borderRadius: 10,
      width: width * 0.25,
      height: height * 0.045,
      alignItems: 'center',
      marginVertical: 15,
      zIndex: 1,
      justifyContent: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 15,
      paddingTop: 10,
      gap: 20,

      justifyContent: 'flex-start',
    },
    username: {
      fontWeight: 'bold',
      fontSize: 16,
      color: theme === 'light' ? ' #333' : '#fff',
    },
    descriptionText: {
      marginHorizontal: 15,
      width: width * 0.7,
      marginTop: 15,
      fontSize: 17,
      letterSpacing: 1,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginTop: 10,
    },
    readMoreText: {
      color: theme === 'light' ? '#4A90E2' : '#4A90E2',
      fontSize: 14,
    },
    dateText: {
      color: theme === 'light' ? '#000' : '#fff',
      fontSize: 13,
    },
    iconEdit: {
      color: theme === 'dark' ? '#4A90E2' : '#333',
    },
  });
  return styleCreate;
};

export default useStyleCreate;
