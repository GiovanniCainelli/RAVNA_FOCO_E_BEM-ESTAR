import React, { useContext, useState, useEffect } from 'react';
import firebase from '../factory/firebase';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Animated,
  Modal,
  Image,
  MaterialCommunityIcons,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { StatusBar } from 'expo-status-bar';
import DATA_PROBLEMS from '../components/DataProblems';
import Header from '../components/Header';
import useStyleHome from '../css/styleHome';
import Swiper from 'react-native-swiper';
import useStyleCreate from '../css/styleCreate';
import useStyleMethodologies from '../css/StyleMetodologies';
import WindowDimensionsImg from '../css/StyleImg';
import { ThemeContext } from '../components/DarkMode/DmContext';
import { useWindowDimensions } from 'react-native';
import { useHeaderAnimation } from '../components/HeaderAnimation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { usePosts } from '../components/postContext';
import { useFavorites } from '../components/favoritesContext';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Home({ navigation }) {
  const [psychologists, setPsychologists] = useState([]);
  const { width, height } = useWindowDimensions();
  const { translateY, opacity, handleScroll } = useHeaderAnimation();
  const { theme } = useContext(ThemeContext);
  const { posts, deletePost } = usePosts();
  const { favorites } = useFavorites();
  const dataToDisplay = favorites.length > 0 ? favorites : DATA_PROBLEMS;
  const [expandedPosts, setExpandedPosts] = useState({});
  const styleHome = useStyleHome(theme, width, height);
  const styleImg = WindowDimensionsImg(width, height);
  const styleCreate = useStyleCreate(theme, width, height);
  const [modalVisible, setModalVisible] = useState(false);
  const styleMetodologies = useStyleMethodologies(width, height, theme);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pendingItem, setPendingItem] = useState(null);

  useEffect(() => {
    if (pendingItem) {
      setSelectedItem(pendingItem);
      setModalVisible(true);
      setPendingItem(null);
    }
  }, [pendingItem]);

  const handleExpand = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

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

  useEffect(() => {
    const fetchPsychologists = async () => {
      try {
        const snapshot = await firebase
          .firestore()
          .collection('usuarios')
          .where('isPsychologist', '==', true)
          .get();

        const psychologistsData = snapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        }));

        setPsychologists(psychologistsData);
      } catch (error) {
        console.error('Erro ao buscar psicólogos:', error);
      }
    };

    fetchPsychologists();
  }, []);

  const ItemHorizontal = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
        setSelectedItem(item);
        setPendingItem(item);
      }}>
      <View style={styleHome.cardRender}>
        <View style={styleHome.itemCard}>
          <View style={styleHome.contentCard}></View>
          <View>
            <Image source={item.image} style={styleImg.contentCardImg} />
          </View>
          <View style={styleHome.textCard}>
            <Text style={styleHome.styleText}>{item.title}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const Post = ({
    item,
    handleExpand,
    expandedPosts = {},
    maxLength,
    height,
    width,
    formatDate,
  }) => {
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
            <TouchableOpacity
              onPress={() => {
                console.log('Item passado para a tela Contact:', item);
                navigation.navigate('Contact', {
                  userUid: item.createdBy.uid,
                  psychologist: item,
                });
              }}>
              <Text style={styleCreate.username}>
                {item.createdBy?.displayName}
              </Text>
            </TouchableOpacity>
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
    <View style={styleHome.background}>
      <Animated.View
        style={{
          ...styleHome.animatedHeader,
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
      </Animated.View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 90 }}>
        <PagerView style={styleHome.containerCarrossel} initialPage={0}>
          <View key="1">
            <View style={styleHome.carrContent}>
              <Image
                source={require('../img/HeaderImg/RAVNADm.png')}
                style={styleHome.logoPager}
              />
              <Text style={{ color: '#fff' }}>Ravna Oficial</Text>
              <MaterialIcons name="verified" size={20} color="white" />
            </View>
            <View style={{ marginHorizontal: 18 }}>
              <Text style={{ color: '#fff' }}>
                Para fazer um estudo eficiente, seu cérebro precisa descansar
                durante o aprendizado. O método pomodoro, é excelente para isso.
              </Text>
            </View>
          </View>

          <View key="2">
            <View style={styleHome.contentPager}>
              <Image
                source={require('../img/HeaderImg/RAVNADm.png')}
                style={styleHome.logoPager}
              />
              <Text style={{ color: '#fff' }}>Ravna Oficial</Text>
              <MaterialIcons name="verified" size={20} color="white" />
            </View>
            <View style={{ marginHorizontal: 18 }}>
              <Text style={{ color: '#fff' }}>
                Mesmo com uma rotina ocupada, é essencial investir na qualidade
                do sono. Assim, você terá mais energia e foco para suas
                atividades acadêmicas.
              </Text>
            </View>
          </View>

          <View key="3">
            <View style={styleHome.contentPager}>
              <Image
                source={require('../img/HeaderImg/RAVNADm.png')}
                style={styleHome.logoPager}
              />
              <Text style={{ color: '#fff' }}>Ravna Oficial</Text>
              <MaterialIcons name="verified" size={20} color="white" />
            </View>
            <View style={{ marginHorizontal: 18 }}>
              <Text style={{ color: '#fff' }}>
                Adiar suas tarefas e obrigações só fará você perder a confiança
                em si mesmo.
              </Text>
            </View>
          </View>

          <View key="4">
            <View style={styleHome.contentPager}>
              <Image
                source={require('../img/HeaderImg/RAVNADm.png')}
                style={styleHome.logoPager}
              />
              <Text style={{ color: '#fff' }}>Ravna Oficial</Text>
              <MaterialIcons name="verified" size={20} color="white" />
            </View>
            <View style={{ marginHorizontal: 18 }}>
              <Text style={{ color: '#fff' }}>
                Tomar banho antes de dormir faz você adormecer 36% mais rápido
                que os demais, ter uma qualidade de sono melhor e se sentir mais
                descansado.
              </Text>
            </View>
          </View>

          <View key="5">
            <View style={styleHome.contentPager}>
              <Image
                source={require('../img/HeaderImg/RAVNADm.png')}
                style={styleHome.logoPager}
              />
              <Text style={{ color: '#fff' }}>Ravna Oficial</Text>
              <MaterialIcons name="verified" size={20} color="white" />
            </View>
            <View style={{ marginHorizontal: 18 }}>
              <Text style={{ color: '#fff' }}>
                Não se anseie pelo futuro mas também não o abandone.
              </Text>
            </View>
          </View>
        </PagerView>

        <Text
          style={{
            color: theme === 'light' ? '#000' : '#fff',
            fontSize: 18,
            paddingLeft: 15,
          }}>
          Metodologias Favoritas
        </Text>
        <FlatList
          data={dataToDisplay}
          renderItem={ItemHorizontal}
          keyExtractor={(item) => item.id}
          decelerationRate={'fast'}
          showsHorizontalScrollIndicator={false}
          horizontal
        />

        <View style={{ alignItems: 'center' }}>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <Post
                key={item.id}
                item={item}
                formatDate={formatDate}
                handleExpand={handleExpand}
                expandedPosts={expandedPosts}
                maxLength={30}
                height={height}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 10 }}
            ListEmptyComponent={
              <Text style={{ textAlign: 'center', marginTop: 20 }}>
                Nenhum post encontrado.
              </Text>
            }
          />
          {selectedItem && (
            <Modal
              animationType="fade"
              transparent={false}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styleMetodologies.modal}>
                <View style={styleMetodologies.modalContent}>
                  <View style={[styleMetodologies.viewTop, { marginTop: 30 }]}>
                    <TouchableOpacity
                      style={styleMetodologies.buttonClose}
                      onPress={() => setModalVisible(false)}>
                      <MaterialIcons
                        name="arrow-back"
                        size={30}
                        color="#4A90E2"
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          color: theme === 'dark' ? '#fff' : '#333',
                        }}>
                        Metodologias
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styleMetodologies.modalView}>
                    <Text style={styleMetodologies.modalText}>
                      {selectedItem.title}
                    </Text>
                    <Image
                      source={selectedItem.image}
                      style={styleMetodologies.imageModal}
                    />
                  </View>
                  <View style={styleMetodologies.modalDescription}>
                    <Text style={styleMetodologies.modalTextDesc}>
                      {selectedItem.description}
                    </Text>
                  </View>

                  <Swiper
                    loop={true}
                    autoplay={true}
                    autoplayTimeout={4}
                    dotColor={theme === 'light' ? '' : '#fff'}
                    showsPagination={true}
                    style={{
                      height: height * 0.24,
                      backgroundColor: theme === 'light' ? '#EBF3FC' : '#333',
                      justifyContent: 'center',
                    }}>
                    {[
                      selectedItem.example,
                      selectedItem.example2,
                      selectedItem.example3,
                    ]
                      .filter((texto) => !!texto)
                      .map((texto, index) => (
                        <View style={styleMetodologies.viewExample}>
                          <Text key={index} style={styleMetodologies.example}>
                            {texto}
                          </Text>
                        </View>
                      ))}
                  </Swiper>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export function firestore() {
  throw new Error('Function not implemented.');
}
