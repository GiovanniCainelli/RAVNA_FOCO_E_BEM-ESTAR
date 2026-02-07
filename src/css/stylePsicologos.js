import { StyleSheet } from 'react-native';
const useStylePsicologos = (width, height, theme) => {
  const stylePsicologos = StyleSheet.create({
    containerCommunity: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#333' : '#EBF3FC', 
    },
    flatListContainer: {
      padding: 15,
      paddingBottom: 30,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: '#4A90e2',
      borderRadius: 20,
      marginVertical: 10,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'space-between',
      gap:20,
    },
    cardImage: {
      width: 70,
      height: 70,
      borderRadius: 35,
      marginRight: 15,
      borderWidth: 2,
      borderColor: '#fff',
    },
    cardText: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 5,
    },
    cardSubtitle: {
      fontSize: 14,
      color: '#fff',
    },
    cardIcon: {
      backgroundColor: '#3B82F6',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)', // Fundo semi-transparente
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 60,
      borderRadius: 10,
      width: 350,
      alignItems: 'center',
    },
    modalImage: {
      width: 150,
      height: 150,
      borderRadius: 75, // Torna a imagem circular
      marginBottom: 15,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalSubtitle: {
      fontSize: 16,
      fontStyle: 'italic',
      marginBottom: 10,
    },
    modalEducation: {
      fontSize: 14,
      color: '#555',
      marginBottom: 10,
    },
    modalDescription: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
    },
    modalCloseButton: {
      backgroundColor: '#035378',
      padding: 10,
      width: 100,
      borderRadius: 5,
    },
    modalCloseButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    profileImage: {
      borderRadius: 100,
      width: width * 0.15,
      height: height * 0.075,
    },
    iconHeader: {
      fontSize: 30,
      color: '#000',
    },
  });
  return stylePsicologos;
};

export default useStylePsicologos;
