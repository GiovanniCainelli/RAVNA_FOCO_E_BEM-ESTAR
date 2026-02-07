import { StyleSheet } from 'react-native';

const StyleQuestions = StyleSheet.create({

  containerQuestions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBF3FC',
  },
    boxQuestions: {
    backgroundColor: '#B9D3EA',
    padding:40,
    alignItems: 'center',
    height: '50%',
    width: '90%',
    borderRadius: 7,

  },
  buttonsQuestions:{
    gap: 20,
    
    width: 270,
  },
  btnQuestions: {
    backgroundColor: '#fff',
    paddingHorizontal: 23,
    paddingVertical: 8,
    borderRadius: 10,
    
  },
  buttonGoHome: {
    backgroundColor: '#B9D3EA',
    marginTop: 15,
    marginLeft: 250,
    padding: 10,
    borderRadius: 7,
    width: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  textQuestions: {
    
    justifyContent: 'center',
  },
  labelBoxQuestions:{
    fontSize:17,
    textAlign:'justify',
    paddingBottom:10,
    width: 280,
    marginBottom:10,
  }



});

export default StyleQuestions;