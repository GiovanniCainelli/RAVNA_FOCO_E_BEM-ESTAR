import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  useWindowDimensions,
  Animated,
} from 'react-native';
import {
  Fontisto,
  AntDesign,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import firebase from '../factory/firebase';
import { useState } from 'react';
import useStyles from '../css/style';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { width, height } = useWindowDimensions();
  const styles = useStyles(width, height);


  function login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        firebase
          .firestore()
          .collection('usuarios')
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              const userData = doc.data();

              if (userData.isPsychologist) {
                Alert.alert(
                  'Login bem-sucedido',
                  `Bem-vindo, ${userData.displayName}`
                );
                navigation.navigate('Home');
              } else {
                Alert.alert(
                  'Login bem-sucedido',
                  `Bem-vindo, ${userData.displayName}`
                );
                navigation.navigate('Home');
              }
            } else {
              Alert.alert('Erro', 'Usuário não encontrado no Firestore');
            }
          })
          .catch((error) => {
            Alert.alert(
              'Erro',
              'Erro ao verificar dados do usuário: ' + error.message
            );
          });
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Erro', 'Senha incorreta');
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert('Erro', 'Usuário não encontrado');
        } else {
          Alert.alert('Erro', 'Credenciais Inválidas!');
        }
      });
  }

  return (
    <SafeAreaView style={styles.containerRegister}>
      <View style={styles.formRegister}>
        <Image
          source={require('../img/HeaderImg/RAVNA.png')}
          style={styles.ravnaImg}
        />
        <View
          style={styles.textView}>
          <Text style={styles.textSignUp}>Login</Text>
        </View>
        <View style={styles.formRegisterInput}>
          <View style={styles.absoluteContainerLogin}>
            <Fontisto style={styles.iconeContainer} name="email" />
            <TextInput
              style={styles.inputSignUp}
              placeholder="Digite seu E-mail"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.absoluteContainerLogin}>
            <Ionicons
              style={styles.iconeContainer}
              name="lock-closed-outline"
            />
            <TextInput
              style={styles.inputSignUp}
              placeholder="Digite sua senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.buttonRegister} onPress={login}>
            <Text style={styles.textButtonRegister}>Fazer Login</Text>
            <FontAwesome name="sign-in" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.viewLineOr}>
            <Text style={styles.lineOr}></Text>
            <Text>ou</Text>
            <Text style={styles.lineOr}></Text>
          </View>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.textButtonLogin}>Cadastre-se</Text>
            <FontAwesome name="arrow-right" size={20} color="#035378" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
