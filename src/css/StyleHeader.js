import { StyleSheet } from 'react-native';
const useStyleHeader = (theme, width, height) => {
  const styleHeader = StyleSheet.create({
    container: {
      
      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333', //retiramos o padding top stats bar
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      width,
      height: height * 0.137,
      
      
    },
    iconHeader: {
      fontSize: 30,
      color: '#808080',
    },
    userinfo: {
      fontSize: 30,
      color: '#808080',
    },
    logoText: {
      fontSize: 16,
      color: '#00587C',
      fontWeight: 'bold',
    },
    containerLogo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    logoHeader: {
      width: width * 0.08,
      height: height * 0.07,
      paddingHorizontal: 10,
    },
    profileImage: { 
      borderRadius: 100,
      width: width * 0.13,
      height: height * 0.065,
    },
  });
  return styleHeader;
};

export default useStyleHeader;
