import { StyleSheet } from 'react-native';

const StyleAboutUs = StyleSheet.create({
  containerAboutUs: {
    flex: 1,
    backgroundColor: '#EBF3FC',
  },
  descricaoContainer: {
    flex: 2,
    backgroundColor: '#EBF3FC ',
    textAlign: 'center',
  },
  tituloDesc: {
    // top:10,
    fontSize: 24,
    lineHeight: 24,
    zIndex: 2,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textoDesc: {
    textAlign: 'justify',
  },
  containerText : {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 50,
    gap: 30,
    justifyContent: 'space-around',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  button : {
    backgroundColor: '#000',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    flexDirection: 'row',
    gap: 30,
    
  }
});

export default StyleAboutUs;