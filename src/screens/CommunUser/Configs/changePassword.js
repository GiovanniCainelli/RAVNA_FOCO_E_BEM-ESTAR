import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../../components/DarkMode/DmContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import useStyleChangePassword from '../../../css/Config/styleChangePassword';
import firebase from '../../../factory/firebase';
import 'firebase/auth';

const ChangePassword = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { width, height } = useWindowDimensions();
  const styleChangePassword = useStyleChangePassword(theme, width, height);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSave = () => {
    if (newPassword.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres!');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        'Erro',
        'As senhas não coincidem, verifique se digitou corretamente.'
      );
      return;
    }

    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );

    user
      .reauthenticateWithCredential(credentials)
      .then(() => {
        return user.updatePassword(newPassword);
      })
      .then(() => {
        Alert.alert('Sucesso', 'Senha atualizada com sucesso!');
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Erro', 'Senha atual incorreta.');
        } else {
          Alert.alert(
            'Erro',
            `Não foi possível cadastrar a nova senha: ${error.message}`
          );
        }
      });
  };

  return (
    <SafeAreaView style={styleChangePassword.container}>
      <View style={styleChangePassword.arrowView}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            style={{
              margin: 10,
              color: theme === 'light' ? '#333' : '#4A90E2',
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: 15,
            color: theme === 'light' ? '#333' : '#fff',
          }}>
          Redefinir Senha
        </Text>
      </View>
      <View style={styleChangePassword.card}>
        <View style={styleChangePassword.titleInput}>
          <Text style={styleChangePassword.titleText}>
            Digite a Senha Atual
          </Text>
        </View>
        <TextInput
          style={styleChangePassword.inputPassword}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styleChangePassword.titleInput}>
          <Text style={styleChangePassword.titleText}>Digite a Nova Senha</Text>
        </View>
        <View style={styleChangePassword.newPassword}>
          <TextInput
            style={styleChangePassword.inputPassword}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            style={styleChangePassword.eye}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <MaterialCommunityIcons
              size={24}
              style={{ color: theme === 'light' ? '#333' : '#fff' }}
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            />
          </TouchableOpacity>
        </View>

        <View style={styleChangePassword.titleInput}>
          <Text style={styleChangePassword.titleText}>
            Confirme a Nova Senha
          </Text>
        </View>
        <TextInput
          style={styleChangePassword.inputPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleSave}
          style={styleChangePassword.btnSalvar}>
          <Text style={{ color: theme === 'light' ? '#333' : '#fff' }}>
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
