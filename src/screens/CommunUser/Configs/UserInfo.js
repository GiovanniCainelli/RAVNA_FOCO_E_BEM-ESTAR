import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Image,
  StatusBar,
  ScrollView,
  Button,
} from 'react-native';
import React, { useContext, useCallback, useEffect, useState } from 'react';
import CustomActionSheet from '../../../components/customActionSheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../../factory/firebase';
import { ThemeContext } from '../../../components/DarkMode/DmContext';
import WindowDimensions from '../../../css/Config/StyleUserInfo';
import { ProfileImageContext } from '../../../components/profileImageContext';
import { useWindowDimensions } from 'react-native';
import 'firebase/auth';
import AntDesign from '@expo/vector-icons/AntDesign';

const UserInfo = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const styleUserInfo = WindowDimensions(theme);
  const { height, width } = useWindowDimensions();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [expertiseArea, setExpertiseArea] = useState('');
  const [aboutMe, setaboutMe] = useState('');
  const [isPsychologist, setIsPsychologist] = useState(false);
  const [imageOptionsVisible, setImageOptionsVisible] = useState(false);

  const { profileImage, updateProfileImage } = useContext(ProfileImageContext);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

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
            if (data.expertiseArea) setExpertiseArea(data.expertiseArea);
            if (data.aboutMe) setaboutMe(data.aboutMe);

            setIsPsychologist(data.isPsychologist || false);
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

  const isValidPhoneNumber = (phone) => {
    const cleanedPhone = phone.replace(/\D/g, '');
    return cleanedPhone.length === 11;
  };

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

  const updateUserData = async (name, phoneNumber, password) => {
    const user = firebase.auth().currentUser;

    if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
      Alert.alert(
        'Erro',
        'Número de telefone inválido. Use o formato 11951683304.'
      );
      return;
    }

    if (user) {
      try {
        if (password) {
          const credentials = firebase.auth.EmailAuthProvider.credential(
            user.email,
            password
          );
          await user.reauthenticateWithCredential(credentials);
        }

        await user.updateProfile({ displayName: name });

        await firebase.firestore().collection('usuarios').doc(user.uid).update({
          displayName: name,
          phoneNumber: phoneNumber,
          aboutMe: aboutMe,
          expertiseArea: expertiseArea,
          profileImage: profileImage,
        });

        setName(name);
        setPhoneNumber(phoneNumber);
        setaboutMe(aboutMe);
        setExpertiseArea(expertiseArea);
        Alert.alert('Dados Atualizados Com Sucesso!');
        setAuthModalVisible(false);
      } catch (error) {
        Alert.alert('Erro', `Falha ao atualizar Dados: ${error.message}`);
      }
    } else {
      Alert.alert('Erro', 'Usuário não encontrado');
    }
  };

  const handleSave = () => {
    setModalVisible(false);
    setAuthModalVisible(true);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erro', 'Precisamos da permissão para acessar suas fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      await updateProfileImage(result.assets[0].uri);
    }
  };

  const deleteProfileImage = () => {
    Alert.alert(
      'Excluir Imagem',
      'Tem certeza que deseja excluir a imagem de perfil?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => updateProfileImage(null) },
      ],
      { cancelable: true }
    );
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

  return (
    <SafeAreaView style={styleUserInfo.containerUserInfo}>
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              style={{ margin: 10, color: '#4A90E2' }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: theme === 'light' ? '#333' : '#fff',
            }}>
            Perfil
          </Text>
        </View>

        <View style={styleUserInfo.containerimgForm}>
          <View
            style={{
              flexDirection: 'row-reverse',
              width: width * 0.4,
              height: height * 0.2,
            }}>
            <TouchableOpacity onPress={() => setActionSheetVisible(true)}>
              <AntDesign
                name="edit"
                style={{ color: theme === 'dark' ? '#4A90E2' : '#333' }}
                size={30}
              />

              <CustomActionSheet
                visible={actionSheetVisible}
                onClose={() => setActionSheetVisible(false)}
                onEdit={pickImage}
                onDelete={deleteProfileImage}
              />
            </TouchableOpacity>

            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styleUserInfo.userImg}
              />
            ) : (
              <FontAwesome
                style={styleUserInfo.userImg}
                name="user-circle"
                size={120}
              />
            )}
          </View>

          <View style={{ justifyContent: 'center', gap: 11 }}>
            <View style={styleUserInfo.fieldName}>
              <Text style={{ color: theme === 'light' ? '#333' : '#fff' }}>
                Nome
              </Text>
            </View>
            <View style={styleUserInfo.fieldInfo}>
              <TextInput
                value={name}
                onChangeText={setName}
                style={{ color: theme === 'light' ? '#333' : '#fff' }}
              />
            </View>

            <View style={styleUserInfo.fieldName}>
              <Text style={{ color: theme === 'light' ? '#333' : '#fff' }}>
                Email
              </Text>
            </View>
            <View style={styleUserInfo.fieldInfo}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                style={{ color: theme === 'light' ? '#333' : '#fff' }}
              />
            </View>

            <View style={styleUserInfo.fieldName}>
              <Text style={{ color: theme === 'light' ? '#333' : '#fff' }}>
                Telefone
              </Text>
            </View>
            <View style={styleUserInfo.fieldInfo}>
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
                placeholder="Ex: 11951683304"
                placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
                style={{ color: theme === 'light' ? '#333' : '#fff' }}
              />
            </View>

            {isPsychologist && (
              <>
                <View style={styleUserInfo.fieldName}>
                  <Text style={{ color: theme === 'light' ? '#333' : '#fff' }}>
                    Área de Atuação
                  </Text>
                </View>
                <View style={styleUserInfo.fieldInfo}>
                  <TextInput
                    value={expertiseArea}
                    onChangeText={setExpertiseArea}
                    maxLength={59}
                    style={{ color: theme === 'light' ? '#333' : '#fff' }}
                  />
                </View>

                <View style={styleUserInfo.fieldName}>
                  <Text style={{ color: theme === 'light' ? '#333' : '#fff' }}>
                    Sobre Mim
                  </Text>
                </View>
                <View style={styleUserInfo.fieldInfo}>
                  <TextInput
                    value={aboutMe}
                    onChangeText={setaboutMe}
                    multiline
                    numberOfLines={4}
                    style={{
                      color: theme === 'light' ? '#333' : '#fff',
                      textAlignVertical: 'top',
                    }}
                  />
                </View>
              </>
            )}
          </View>

          <TouchableOpacity
            style={styleUserInfo.btnEditar}
            onPress={() => setModalVisible(true)}>
            <Text style={{ color: theme === 'light' ? '#333' : '#fff' }}>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styleUserInfo.overlay} />
        <View style={styleUserInfo.modalView}>
          <Text style={styleUserInfo.modalText}>
            Deseja salvar as alterações?
          </Text>
          <View style={styleUserInfo.modalBtnView}>
            <TouchableOpacity
              style={styleUserInfo.modalButton}
              onPress={handleSave}>
              <Text>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styleUserInfo.modalButton}
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
        <View style={styleUserInfo.overlay} />
        <View style={styleUserInfo.modalView}>
          <Text style={styleUserInfo.modalText}>
            Digite sua senha para Salvar as alterações
          </Text>
          <TextInput
            secureTextEntry={isSecureEntry}
            placeholder="Senha atual"
            placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
            onChangeText={setPassword}
            style={styleUserInfo.textPassword}
          />
          <View style={styleUserInfo.modalBtnView}>
            <TouchableOpacity
              style={styleUserInfo.modalButton}
              onPress={() => updateUserData(name, phoneNumber)}>
              <Text>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styleUserInfo.modalButton}
              onPress={() => setAuthModalVisible(false)}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View
        style={[
          styleUserInfo.overlay,
          (modalVisible || authModalVisible) && styleUserInfo.overlayVisible,
        ]}
      />
    </SafeAreaView>
  );
};

export default UserInfo;
