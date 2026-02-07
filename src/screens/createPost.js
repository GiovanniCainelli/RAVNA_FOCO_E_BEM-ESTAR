import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  useWindowDimensions,
  Animated,
  Modal,
  StatusBar,
  LayoutAnimation,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ThemeContext } from '../components/DarkMode/DmContext';
import { usePosts } from '../components/postContext';
import * as ImagePicker from 'expo-image-picker';
import useStyleCreate from '../css/styleCreate';
import firebase from '../factory/firebase';
import Header from '../components/Header';
import { useHeaderAnimation } from '../components/HeaderAnimation';
import { ProfileImageContext } from '../components/profileImageContext';
import CustomActionSheet from '../components/customActionSheet';
import AntDesign from '@expo/vector-icons/AntDesign';

const Create = ({ postId }) => {
  const [image, setImage] = useState(null);
  const { translateY, opacity, handleScroll } = useHeaderAnimation();
  const [description, setDescription] = useState('');
  const { posts, addOrUpdatePost, deletePost } = usePosts();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState({});
  const [descHeight, setDescHeight] = useState(0);
  const { theme } = useContext(ThemeContext);
  const { height, width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const styleCreate = useStyleCreate(theme, width, height);
  const { profileImage } = useContext(ProfileImageContext);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const [userData, setUserData] = useState(null);
  const currentUser = firebase.auth().currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const fetchUserData = async () => {
      try {
        const userDoc = await firebase
          .firestore()
          .collection('usuarios')
          .doc(currentUser.uid)
          .get();

        if (userDoc.exists) {
          setUserData(userDoc.data());
          console.log('Dados do usuário carregados:', userDoc.data());
        } else {
          console.log('Usuário não encontrado na coleção "usuarios".');
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      width: width * 0.75,
      height: height * 0.35,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onTextLayout = (e) => {
    const { height } = e.nativeEvent.layout;
    setDescHeight(height);
  };

  const handleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setIsExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const addPost = async () => {
    if (!image || !description) {
      Alert.alert('Erro', 'Por favor, adicione uma imagem e uma descrição.');
      return;
    }

    const currentUser = firebase.auth().currentUser;

    try {
      const userDoc = await firebase
        .firestore()
        .collection('usuarios')
        .doc(currentUser.uid)
        .get();

      const newPost = {
        image: image,
        description: description,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: {
          uid: currentUser.uid,
        },
      };

      console.log('Novo Post:', newPost);
      await addOrUpdatePost(null, newPost);

      setImage(null);
      setDescription('');
      Alert.alert('Sucesso', 'Post adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar post:', error);
      Alert.alert(
        'Erro',
        'Não foi possível adicionar o post. Tente novamente.'
      );
    }
    setModalVisible(false);
  };

  const handleEdit = (postId, post) => {
    setIsEditing(true);
    setSelectedPostId(postId);
    setImage(post.image);
    setDescription(post.description);
    setModalVisible(true);
  };

  const handleSavePost = async () => {
    const currentUser = firebase.auth().currentUser;

    if (!currentUser) {
      Alert.alert(
        'Erro',
        'Você precisa estar autenticado para adicionar um post.'
      );
      return;
    }

    if (!image || !description) {
      Alert.alert('Erro', 'Por favor, adicione uma imagem e uma descrição.');
      return;
    }

    try {
      const userDoc = await firebase
        .firestore()
        .collection('usuarios')
        .doc(currentUser.uid)
        .get();

      const userName = userDoc.exists
        ? userDoc.data().displayName
        : currentUser.displayName;

      const postData = {
        image,
        description,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: {
          uid: currentUser.uid,
          displayName: userData.displayName,
          profileImage: profileImage,
        },
      };

      console.log('Novo post sendo salvo:', postData);

      if (isEditing && selectedPostId) {
        await addOrUpdatePost(selectedPostId, postData);
        console.log('Post atualizado com ID:', selectedPostId);
      } else {
        await addOrUpdatePost(null, postData);
      }

      Alert.alert('Sucesso', 'Post adicionado com sucesso!');
      setImage(null);
      setDescription('');
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao adicionar ou atualizar o post:', error);
      Alert.alert('Erro', 'Não foi possível adicionar ou atualizar o post.');
    }
  };

  const setStatusBarOpacity = useCallback(
    (isVisible) => {
      if (isVisible) {
        StatusBar.setBarStyle('light-content');
        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0)', true);
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
    setStatusBarOpacity(modalVisible);

    return () => {
      setStatusBarOpacity(false);
    };
  }, [modalVisible, setStatusBarOpacity]);

  const formatDate = (timestamp) => {
    if (!timestamp) {
      return 'Data inválida';
    }

    const postDate = timestamp.toDate ? timestamp.toDate() : null;

    if (!postDate) {
      return 'Agora Mesmo';
    }

    const now = new Date();

    const differenceInSeconds = Math.floor((now - postDate) / 1000);

    if (differenceInSeconds < 5) {
      return 'Agora Mesmo';
    }

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} ${
        differenceInSeconds === 1 ? 'segundo' : 'segundos'
      } atrás`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`;
    } else if (differenceInSeconds < 2592000) {
      // 30 dias
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
    } else if (differenceInSeconds < 31536000) {
      // 1 ano
      const months = Math.floor(differenceInSeconds / 2592000);
      return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`;
    } else {
      const years = Math.floor(differenceInSeconds / 31536000);
      return `${years} ${years === 1 ? 'ano' : 'anos'} atrás`;
    }
  };

  const maxLength = 30;

  return (
    <View style={styleCreate.container}>
      <Animated.View
        style={{
          ...styleCreate.animatedHeader,
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 100],
                outputRange: [0, -100],
                extrapolate: 'clamp',
              }),
            },
          ],
          opacity: opacity,
        }}>
        <Header />
        <View
          style={[
            styleCreate.overlay,
            modalVisible && styleCreate.overlayVisible,
          ]}
        />
      </Animated.View>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={{ marginTop: 120 }}>
          <View style={styleCreate.yourPost}>
            <Text style={styleCreate.ypText}>Suas Postagens</Text>
            <TouchableOpacity
              style={styleCreate.btnCreate}
              onPress={() => setModalVisible(true)}>
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 18,
                }}>
                Criar
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styleCreate.containerPost}>
            {posts.length === 0 ? (
              <Text style={styleCreate.postnFound}>
                Nenhum post encontrado.
              </Text>
            ) : (
              posts.map((post) => {
                const cardHeight = isExpanded[post.id]
                  ? height * 0.6
                  : height * 0.52;

                return (
                  <View style={styleCreate.cardPost}>
                    <View style={styleCreate.headerContainer}>
                      {profileImage ? (
                        <Image
                          source={{ uri: profileImage }}
                          style={styleCreate.profileImage}
                          onError={(error) => {
                            console.log(
                              'Erro ao carregar imagem:',
                              error.nativeEvent.error
                            );
                          }}
                        />
                      ) : (
                        <FontAwesome6
                          name="user-circle"
                          style={styleCreate.iconHeader}
                        />
                      )}

                      <Text style={styleCreate.username}>
                        {userData?.displayName}
                      </Text>

                      <TouchableOpacity
                        style={styleCreate.btnEdit}
                        onPress={() => {
                          setSelectedPostId(post.id);
                          setSelectedPost(post);
                          setActionSheetVisible(true);
                        }}>
                        <AntDesign
                          name="edit"
                          style={{
                            color: theme === 'dark' ? '#4A90E2' : '#333',
                          }}
                          size={30}
                        />

                        <CustomActionSheet
                          visible={actionSheetVisible}
                          onClose={() => setActionSheetVisible(false)}
                          onEdit={() =>
                            handleEdit(selectedPostId, selectedPost)
                          }
                          onDelete={() => deletePost(selectedPostId)}
                          postId={selectedPostId}
                          post={selectedPost}
                        />
                      </TouchableOpacity>
                    </View>

                    <Image
                      source={{ uri: post.image }}
                      style={styleCreate.image}
                    />

                    <View style={styleCreate.descView}>
                      <Text
                        style={{
                          minHeight: 0,
                          maxHeight: isExpanded[post.id] ? null : height * 0.15,
                          marginHorizontal: 15,
                          width: width * 0.7,
                          marginTop: 15,
                          fontSize: 17,
                          letterSpacing: 1,
                          color: theme === 'light' ? ' #333' : '#fff',
                        }}
                        onLayout={onTextLayout}>
                        {isExpanded[post.id]
                          ? post.description
                          : post.description &&
                            post.description.length > maxLength
                          ? post.description.substring(0, maxLength) + '...'
                          : post.description}
                      </Text>

                      <View style={styleCreate.footerContainer}>
                        {post.description &&
                          post.description.length > maxLength && (
                            <TouchableOpacity
                              onPress={() => handleExpand(post.id)}>
                              <Text style={styleCreate.readMoreText}>
                                {isExpanded[post.id] ? 'Ler Menos' : 'Ler Mais'}
                              </Text>
                            </TouchableOpacity>
                          )}

                        <Text style={styleCreate.dateText}>
                          {formatDate(post.createdAt)}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </View>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styleCreate.modalOverlay}>
            <View style={styleCreate.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setImage(null);
                  setDescription('');
                }}
                style={styleCreate.close}>
                <AntDesign
                  name="close"
                  style={{
                    color: theme === 'light' ? '#B71C1C' : '#FF0000',
                    marginRight: 25,
                    marginTop: 8,
                  }}
                  size={25}
                />
              </TouchableOpacity>

              <View style={styleCreate.infoPost}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={[styleCreate.profileImage, { borderRadius: 50 }]}
                    onError={(error) => {
                      console.log(
                        'Erro ao carregar imagem:',
                        error.nativeEvent.error
                      );
                    }}
                  />
                ) : (
                  <FontAwesome6
                    name="user-circle"
                    style={styleCreate.iconHeader}
                  />
                )}

                <Text
                  style={{ fontWeight: 'bold', fontSize: 16, paddingTop: 5 }}>
                  {
                    posts.find((post) => post.id === selectedPostId)?.createdBy
                      .name
                  }
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styleCreate.imagePicker,
                  image && { backgroundColor: 'transparent' },
                ]}
                onPress={pickImage}>
                <MaterialCommunityIcons
                  name="image"
                  size={20}
                  color={image ? 'transparent' : '#333'}
                />
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={styleCreate.imagePreview}
                    resizeMode="cover"
                  />
                )}
              </TouchableOpacity>

              <TextInput
                style={styleCreate.textInput}
                placeholder="Descrição"
                placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
                textAlignVertical="top"
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <TouchableOpacity
              style={styleCreate.btnSave}
              onPress={handleSavePost}>
              <Text
                style={{
                  color: theme === 'light' ? '#000' : '#fff',
                  fontSize: 18,
                }}>
                {isEditing ? 'Postar' : 'Criar'}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
      <View
        style={[
          styleCreate.overlay,
          modalVisible && styleCreate.overlayVisible,
        ]}
      />
    </View>
  );
};

export default Create;
