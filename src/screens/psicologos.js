import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import useStylePsicologos from '../css/stylePsicologos';
import { ThemeContext } from '../components/DarkMode/DmContext';
import firebase from '../factory/firebase';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Psicologos = ({ navigation }) => {
  const [psychologists, setPsychologists] = useState([]);
  const { theme } = useContext(ThemeContext);
  const { height, width } = useWindowDimensions();
  const stylePsicologos = useStylePsicologos(width, height, theme);

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

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log('Item passado para a tela Contact:', item); 
        navigation.navigate('Contact', {
          userUid: item.uid,
        });
      }}>
      <View style={stylePsicologos.card}>
        {item.profileImage ? (
          <Image
            source={{ uri: item.profileImage }}
            style={stylePsicologos.profileImage}
            onError={(error) =>
              console.log('Erro ao carregar imagem:', error.nativeEvent.error)
            }
          />
        ) : (
          <FontAwesome6 name="user-circle" style={stylePsicologos.iconHeader} />
        )}
        <View style={stylePsicologos.cardText}>
          <Text style={stylePsicologos.cardTitle}>
            {item.displayName || 'Anônimo'}
          </Text>
          <Text style={stylePsicologos.cardSubtitle}>
            {item.expertiseArea || 'Área de especialização não informada'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={stylePsicologos.containerCommunity}>
      <Header />
      <Text
        style={{
          margin: 12,
          fontSize: 18,
          color: theme === 'light' ? '#333' : '#fff',
        }}>
        Psicólogos Disponíveis
      </Text>

      <FlatList
        data={psychologists}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
        contentContainerStyle={stylePsicologos.flatListContainer}
        ListEmptyComponent={
          <Text style={stylePsicologos.emptyText}>
            Nenhum psicólogo disponível no momento.
          </Text>
        }
      />
    </View>
  );
};

export default Psicologos;
