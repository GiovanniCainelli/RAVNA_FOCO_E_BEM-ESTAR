import React, { useState, useEffect, useContext } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import firebase from '../factory/firebase';
import { ThemeContext } from '../components/DarkMode/DmContext';
import useStyleContact from '../css/styleContact';
import useStyleCreate from '../css/styleCreate';
import { useWindowDimensions } from 'react-native';

import { useHeaderAnimation } from '../components/HeaderAnimation';

const Contact = ({ navigation }) => {
  const route = useRoute();
  const { psychologist, userUid } = route.params;
  const [psychologistInfo, setPsychologistInfo] = useState(null);
  const { theme } = useContext(ThemeContext);
  const { height, width } = useWindowDimensions();
  const styleContact = useStyleContact(theme, width, height);
  const styleCreate = useStyleCreate(theme, width, height);
  const { translateY, opacity, handleScroll } = useHeaderAnimation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState({});
  const maxLength = 30;

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      if (!userUid) return;

      try {
        const psychologistDoc = await firebase
          .firestore()
          .collection('usuarios')
          .doc(userUid)
          .get();

        if (!psychologistDoc.exists) {
          console.log('Psicólogo não encontrado!');
          return;
        }

        const data = psychologistDoc.data();
        setPsychologistInfo(data);
        console.log('Psicólogo encontrado!', data);

        const snapshot = await firebase
          .firestore()
          .collection('posts')
          .where('createdBy.uid', '==', userUid)
          .get();

        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postsData);
        console.log(`Posts encontrados: ${snapshot.size}`);
      } catch (error) {
        console.error('Erro ao buscar psicólogo e posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [userUid]);

  const handleExpand = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Data inválida';
    const postDate = timestamp.toDate ? timestamp.toDate() : null;
    if (!postDate) return 'Agora Mesmo';
    const now = new Date();
    const differenceInSeconds = Math.floor((now - postDate) / 1000);
    if (differenceInSeconds < 5) return 'Agora Mesmo';
    if (differenceInSeconds < 60)
      return `${differenceInSeconds} segundos atrás`;
    else if (differenceInSeconds < 3600)
      return `${Math.floor(differenceInSeconds / 60)} minutos atrás`;
    else if (differenceInSeconds < 86400)
      return `${Math.floor(differenceInSeconds / 3600)} horas atrás`;
    else if (differenceInSeconds < 2592000)
      return `${Math.floor(differenceInSeconds / 86400)} dias atrás`;
    else if (differenceInSeconds < 31536000)
      return `${Math.floor(differenceInSeconds / 2592000)} meses atrás`;
    else return `${Math.floor(differenceInSeconds / 31536000)} anos atrás`;
  };

  const renderPost = ({ item }) => {
    const isExpanded = expandedPosts[item.id] || false;

    return (
      <View style={styleCreate.containerPost}>
        <View style={styleCreate.cardPost}>
          <View style={styleCreate.headerContainer}>
            {item.createdBy?.profileImage ? (
              <Image
                source={{ uri: item.createdBy?.profileImage }}
                style={styleCreate.profileImage}
                onError={(error) =>
                  console.log(
                    'Erro ao carregar imagem:',
                    error.nativeEvent.error
                  )
                }
              />
            ) : (
              <FontAwesome6 name="user-circle" style={styleCreate.iconHeader} />
            )}

            <Text style={styleCreate.username}>
              {item.createdBy?.displayName}
            </Text>
          </View>

          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={styleCreate.image}
              onError={(error) =>
                console.log(
                  'Erro ao carregar imagem principal:',
                  error.nativeEvent.error
                )
              }
            />
          )}

          <View style={styleCreate.descView}>
            <Text
              style={{
                minHeight: 0,
                maxHeight: isExpanded ? null : height * 0.15,
                marginHorizontal: 15,
                width: width * 0.7,
                marginTop: 15,
                fontSize: 17,
                letterSpacing: 1,
                color: theme === 'light' ? ' #333' : '#fff',
              }}>
              {isExpanded
                ? item.description
                : item.description && item.description.length > maxLength
                ? item.description.substring(0, maxLength) + '...'
                : item.description}
            </Text>

            <View style={styleCreate.footerContainer}>
              {item.description && item.description.length > maxLength && (
                <TouchableOpacity onPress={() => handleExpand(item.id)}>
                  <Text style={styleCreate.readMoreText}>
                    {isExpanded ? 'Ler Menos' : 'Ler Mais'}
                  </Text>
                </TouchableOpacity>
              )}
              <Text style={styleCreate.dateText}>
                {formatDate(item.createdAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styleContact.containerUserInfo}>
      <ScrollView onScroll={handleScroll}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -50],
                    extrapolate: 'clamp',
                  }),
                },
              ],
              opacity: opacity,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Routs', {
                  screen: 'Psicologos',
                })
              }>
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                style={{ margin: 10, color: '#4A90E2' }}
              />
            </TouchableOpacity>
          </Animated.View>

          <Text
            style={{
              fontSize: 20,
              color: theme === 'light' ? '#333' : '#fff',
            }}>
            Contato
          </Text>
        </View>

        <View style={styleContact.containerimgForm}>
          {psychologistInfo?.profileImage ? (
            <Image
              source={{ uri: psychologistInfo.profileImage }}
              style={styleCreate.profileImageContact}
              onError={(error) =>
                console.log('Erro ao carregar imagem:', error.nativeEvent.error)
              }
            />
          ) : (
            <FontAwesome6 name="user-circle" style={styleCreate.iconProfile} />
          )}
          <View style={styleContact.viewInfo}>
            <Text
              style={{
                fontSize: 18,
                color: theme === 'light' ? '#333' : '#fff',
                flexShrink: 1,
              }}
              numberOfLines={1}>
              {psychologistInfo?.displayName}
              <Text> • </Text>
              {psychologistInfo?.expertiseArea}
              {psychologistInfo?.phoneNumber ? (
                <Text> • {psychologistInfo.phoneNumber}</Text>
              ) : null}
            </Text>
          </View>
        </View>

        <View style={styleContact.aboutMe}>
          <Text
            style={{
              fontSize: 16,
              color: theme === 'light' ? '#333' : '#fff',
              paddingTop: 10,
              paddingLeft: 15,
            }}>
            {psychologistInfo?.aboutMe}
          </Text>
        </View>

        <View style={styleContact.lineWithText}>
          <View style={styleContact.divider} />
          <View style={styleContact.iconAndText}>
            <MaterialCommunityIcons
              name="post-outline"
              size={24}
              color="#0078B7"
            />
            <Text style={styleContact.postsTitle}>Posts</Text>
          </View>
          <View style={styleContact.divider} />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0078B7" />
        ) : (
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center' }}>
                Nenhum post encontrado.
              </Text>
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Contact;
