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
import firebase from '../factory/firebase';
import { useState } from 'react';
import useStyles from '../css/style';
import { SafeAreaView } from 'react-native-safe-area-context';

function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { width, height } = useWindowDimensions();
  const [crp, setCrp] = useState('');
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [crpAnim] = useState(new Animated.Value(0));
  const [selectedIcon, setSelectedIcon] = useState('user');
  const styles = useStyles(width, height);

  function cadastrarEmail() {
    if (!validarCRP(crp)) {
      alert('CRP inválido.');
      return;
    }
    const isPsychologist = selectedIcon === 'heartbeat';

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        Alert.alert('Usuário criado', `Usuário criado: ${user.email}`);

        navigation.navigate('Login');

        const userData = {
          displayName: name,
          email: user.email,
          isPsychologist: isPsychologist,
        };

        if (isPsychologist && crp) {
          userData.crp = crp;
        }

        const userDocRef = firebase
          .firestore()
          .collection('usuarios')
          .doc(user.uid);

        userDocRef
          .set(userData)
          .then(() => {
            setName('');
            setEmail('');
            setPassword('');
            setCrp('');
          })
          .catch((error) => {
            Alert.alert(
              'Erro',
              'Erro ao salvar dados no Firestore: ' + error.message
            );
          });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Erro', 'Email já existe');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Erro', 'Email inválido');
        } else {
          Alert.alert('Erro', error.message);
        }
      });
  }

  const handleHeartClick = () => {
    if (!isHeartClicked) {
      setIsHeartClicked(true);
      Animated.timing(crpAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setSelectedIcon('heartbeat');
  };

  const handleUserClick = () => {
    setIsHeartClicked(false);
    Animated.timing(crpAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setSelectedIcon('user');
  };
  const getIconColor = (icon) => {
    return selectedIcon === icon ? '#035378' : 'black';
  };

  const regex = /^\d{2}\/\d{5}$/;

  const validarCRP = (crp) => {
    if (isHeartClicked) {
      if (!crp || !regex.test(crp)) {
        return false;
      }

      return true;
    }

    return true;
  };

  return (
    <SafeAreaView style={styles.containerRegister}>
      <View style={styles.formRegister}>
        <Image
          source={require('../img/HeaderImg/RAVNA.png')}
          style={styles.ravnaImg}
        />
        <View style={styles.viewIcons}>
          <Text style={styles.textSignUp}>Cadastre-se</Text>
          <View style={styles.icons}>
            <TouchableOpacity onPress={handleUserClick}>
              <FontAwesome name="user" size={38} color={getIconColor('user')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleHeartClick}>
              <FontAwesome
                name="heartbeat"
                size={38}
                color={getIconColor('heartbeat')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formRegisterInput}>
          <View style={styles.absoluteContainer}>
            <AntDesign style={styles.iconeContainer} name="user" />
            <TextInput
              style={styles.inputSignUp}
              placeholder="Digite seu nome"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={styles.absoluteContainer}>
            <Fontisto style={styles.iconeContainer} name="email" />
            <TextInput
              style={styles.inputSignUp}
              placeholder="Digite seu E-mail"
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.absoluteContainer}>
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

          <Animated.View
            style={{
              ...styles.absoluteContainer,
              opacity: crpAnim,
              height: crpAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 70],
              }),
              marginBottom: 15,
            }}>
            <AntDesign style={styles.iconeContainer} name="idcard" />
            <TextInput
              style={styles.inputSignUp}
              placeholder="Digite seu CRP"
              value={crp}
              onChangeText={(text) => setCrp(text)}
            />
          </Animated.View>

          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={cadastrarEmail}>
            <Text style={styles.textButtonRegister}>Cadastre-se</Text>
            <FontAwesome name="sign-in" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.viewLineOr}>
            <Text style={styles.lineOr}></Text>
            <Text>ou</Text>
            <Text style={styles.lineOr}></Text>
          </View>
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textButtonLogin}>Fazer Login</Text>
            <FontAwesome name="arrow-right" size={20} color="#035378" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Register;
