import {
  View,
  TouchableOpacity,
  Text,
  Switch,
  useWindowDimensions,
  Modal,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import { ThemeContext } from '../../../components/DarkMode/DmContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStyleSettings from '../../../css/Config/StyleSettings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons';
import firebase from '../../../factory/firebase';

const Settings = ({ navigation }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDarkMode = theme === 'dark';
  const { width, height } = useWindowDimensions();
  const styleSettings = useStyleSettings(theme, width, height);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [authModalVisible, setAuthModalVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          setName(user.displayName || '');
          setEmail(user.email || '');

          const doc = await firebase
            .firestore()
            .collection('usuarios')
            .doc(user.uid)
            .get();
          if (doc.exists) {
            const data = doc.data();
            setPhoneNumber(data.phoneNumber || '');
            if (data.displayName) setName(data.displayName);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem('profileImage');
        if (savedImage) {
          setProfileImage(savedImage);
        }
      } catch (error) {
        console.error('Erro ao carregar imagem do perfil:', error);
      }
    };

    loadProfileImage();
  }, []);

  const user = firebase.auth().currentUser;

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogout = async () => {
    const auth = firebase.auth(); 
    try {
      await auth.signOut(); 
      navigation.navigate('Login');
      Alert.alert('Logout', 'Você foi desconectado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao tentar desconectar. Tente novamente.');
    }
  };

  const deleteUserAccount = async () => {
    if (user) {
      if (!isValidEmail(email)) {
        Alert.alert(
          'Erro',
          'Formato de email inválido. Por favor, insira um email válido.'
        );
        return;
      }

      if (email !== user.email) {
        Alert.alert(
          'Erro',
          'O email fornecido não coincide com o email do usuário atual.'
        );
        return;
      }

      const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
      );

      try {
        await user.reauthenticateWithCredential(credentials);
        await firebase
          .firestore()
          .collection('usuarios')
          .doc(user.uid)
          .delete();
        await user.delete();

        setAuthModalVisible(false);
        setModalVisible(false);
        navigation.navigate('Login');
        Alert.alert('Sucesso', 'Conta excluída com sucesso.');
      } catch (error) {
        console.log('Erro ao reautenticar:', error);

        if (error.code === 'auth/wrong-password') {
          Alert.alert('Erro', 'Senha incorreta. Tente novamente.');
        } else if (error.code === 'auth/user-mismatch') {
          Alert.alert(
            'Erro',
            'O email fornecido não coincide com o usuário autenticado.'
          );
        } else {
          Alert.alert('Erro', `Falha ao excluir conta: ${error.message}`);
        }
      }
    } else {
      Alert.alert('Erro', 'Usuário não encontrado.');
    }
  };

  const setStatusBarOpacity = useCallback(
    (isVisible) => {
      if (isVisible) {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.01)', true);
      } else {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(
          theme === 'light' ? '#EBF3FC' : '#333',
          true
        );
      }
    },
    [theme]
  );

  useEffect(() => {
    setStatusBarOpacity(modalVisible || authModalVisible);

    return () => {
      setStatusBarOpacity(false);
    };
  }, [modalVisible, authModalVisible, setStatusBarOpacity]);

  const handleSave = () => {
    setModalVisible(false);
    setAuthModalVisible(true);
  };

  return (
    <SafeAreaView style={styleSettings.container}>
      <View
        style={styleSettings.arrowView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
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
          Configurações
        </Text>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={styleSettings.viewPass}>
          <TouchableOpacity
            style={styleSettings.btnConfig}
            onPress={() => navigation.navigate('ChangePassword')}>
            <Icon
              name="lock-reset"
              size={30}
              color={theme === 'light' ? '#333' : '#fff'}
            />
            <Text style={{ color: theme === 'light' ? '#333' : '#fff' }}>
              Redefinir Senha
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={styleSettings.feather}>
          <Feather
            name={isDarkMode ? 'moon' : 'sun'}
            size={30}
            color={theme === 'light' ? '#333' : '#fff'}
          />
          <Text style={{ color: theme === 'light' ? '#333' : '#fff' }}>
            Tema Escuro
          </Text>
        </View>
        <View style={styleSettings.feather}>
          <Switch
            trackColor={{ false: '#767577', true: '#fff' }}
            thumbColor="#4A90E2"
            onValueChange={toggleTheme}
            value={isDarkMode}
            style={{ width: width * 0.2, paddingRight: 30 }}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={styleSettings.logout}>
          <TouchableOpacity
            onPress={handleLogout}
            style={styleSettings.btnConfig}>
            <Icon
              name="exit-to-app"
              size={30}
              color={theme === 'light' ? '#333' : '#fff'}
            />
            <Text
              style={{
                color: theme === 'light' ? '#333' : '#fff',
                fontSize: 16,
              }}>
              Sair
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={styleSettings.deleteAcc}>
          <TouchableOpacity
            style={styleSettings.btnConfig}
            onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons
              name="account-remove"
              size={30}
              color={theme === 'light' ? '#B71C1C' : '#FF0000'}
            />
            <Text style={{ color: theme === 'light' ? '#B71C1C' : '#FF0000' }}>
              Excluir Conta
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styleSettings.modalView}>
            <Text style={styleSettings.modalTitle}>
              Deseja Excluir Sua Conta Do Ravna ?
            </Text>
            <Text style={styleSettings.modalText}>
              Se você optar por excluir sua conta, todas as suas informações e
              dados associados serão removidos permanentemente de nossos
              servidores. Essa ação é irreversível, e você não poderá recuperar
              nenhuma informação após a exclusão.
            </Text>
            <View style={styleSettings.modalBtnView}>
              <TouchableOpacity
                style={styleSettings.modalButton}
                onPress={handleSave}>
                <Text>Prosseguir</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleSettings.modalButton}
                onPress={() => setModalVisible(false)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent
          visible={authModalVisible}
          onRequestClose={() => setAuthModalVisible(false)}>
          <View style={styleSettings.modalView}>
            <Text style={{ ...styleSettings.modalTitle, fontSize: 16 }}>
              É Necessário Verificar Seus Dados
            </Text>
            <View style={styleSettings.viewInput}>
              <TextInput
                secureTextEntry={isSecureEntry}
                placeholder="Senha"
                placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
                onChangeText={setPassword}
                style={styleSettings.textPassword}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
                onChangeText={setEmail}
                style={styleSettings.textEmail}
              />
            </View>
            <View style={styleSettings.modalBtnView}>
              <TouchableOpacity
                style={styleSettings.modalButton}
                onPress={() => deleteUserAccount(password, email)}>
                <Text style={styleSettings.btnDelete}>Excluir Conta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styleSettings.modalButton}
                onPress={() => setAuthModalVisible(false)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View
        style={[
          styleSettings.overlay,
          modalVisible && styleSettings.overlayVisible,
        ]}
      />
      <View
        style={[
          styleSettings.overlay,
          authModalVisible && styleSettings.overlayVisible,
        ]}
      />
    </SafeAreaView>
  );
};

export default Settings;
