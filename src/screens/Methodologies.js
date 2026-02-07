import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import React, { useState, useContext, useLayoutEffect, useEffect } from 'react';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import DATA_PROBLEMS from '../components/DataProblems';
import useStyleMethodologies from '../css/StyleMetodologies';
import Header from '../components/Header';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SearchBar } from '@rneui/themed';
import { ThemeContext } from '../components/DarkMode/DmContext';
import useStyleRouts from '../css/styleRouts';
import useStyleHome from '../css/styleHome';
import { useWindowDimensions } from 'react-native';
import { useFavorites } from '../components/favoritesContext';
const Methodologies = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  const styleMetodologies = useStyleMethodologies(width, height, theme);
  const styleHome = useStyleHome(width, height);
  const styleRouts = useStyleRouts(width, height, theme);
  const { favorites, toggleFavorite } = useFavorites();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(DATA_PROBLEMS);
  const isFavorite = (item) => favorites.some((fav) => fav.id === item.id);
  const [pendingItem, setPendingItem] = useState(null);

  useEffect(() => {
    if (pendingItem) {
      setSelectedItem(pendingItem);
      setModalVisible(true);
      setPendingItem(null);
    }
  }, [pendingItem]);

  const searchFilter = (text) => {
    if (text) {
      const newData = DATA_PROBLEMS.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(DATA_PROBLEMS);
      setSearch(text);
    }
  };

  const defaultTabBarStyle = styleRouts.tab;

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: modalVisible ? { display: 'none' } : defaultTabBarStyle,
    });
  }, [modalVisible, navigation, defaultTabBarStyle]);

  const Item = ({ item }) => (
    <View style={styleMetodologies.containerFlat}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
          setSelectedItem(item);
          setPendingItem(item);
        }}>
        <View style={styleMetodologies.containerFlatCard}>
          <View style={styleHome.contentCard}></View>
          <View>
            <Image
              source={item.image}
              style={styleMetodologies.imageContainerFlat}
            />
          </View>
          <View style={styleHome.textCard}>
            <Text
              style={{ color: '#fff', fontWeight: '900', letterSpacing: 1 }}>
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styleMetodologies.containerMetodologies}>
      <Header />
      <View style={styleMetodologies.search}>
        <SearchBar
          placeholder="Pesquisar metodologias"
          onChangeText={(text) => searchFilter(text)}
          value={search}
          platform="android"
          containerStyle={{ width: width * 0.95, borderRadius: 15 }}
        />
      </View>

      <View style={styleMetodologies.textOptionsMethodologies}>
        <MaterialCommunityIcons
          name="book-open-page-variant"
          size={24}
          color="#808080"
        />
        <Text
          style={{
            color: theme === 'dark' ? '#fff' : '#333',
            fontWeight: 'bold',
          }}>
          Escolha uma Metodologia:
        </Text>
      </View>
      <FlatList
        data={filteredData}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
      />
      {selectedItem && (
        <>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styleMetodologies.modal}>
              <View style={styleMetodologies.modalContent}>
                <View style={styleMetodologies.viewTop}>
                  <TouchableOpacity
                    style={styleMetodologies.buttonClose}
                    onPress={() => setModalVisible(false)}>
                    <MaterialIcons name="arrow-back" size={30} color="#4A90E2" />
                    <Text
                      style={{
                        fontSize: 20,
                        color: theme === 'dark' ? '#fff' : '#333',
                      }}>
                      Metodologias
                    </Text>
                  </TouchableOpacity>
                  <View style={styleMetodologies.viewHeart}>
                    <TouchableOpacity
                      style={styleMetodologies.heart}
                      onPress={() => toggleFavorite(selectedItem)}>
                      <MaterialCommunityIcons
                        name={
                          isFavorite(selectedItem) ? 'heart' : 'heart-outline'
                        }
                        size={35}
                        color={theme === 'dark' ? '#4A90E2' : '#FF0000'}
                      />
                    </TouchableOpacity>
                  </View>
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
                <View
                  style={styleMetodologies.modalDescription}>
                  <Text style={styleMetodologies.modalTextDesc}>
                    {selectedItem.description}
                  </Text>
                </View>

                <Swiper
                  loop={true}
                  autoplay={true}
                  autoplayTimeout={10}
                  showsPagination={true}
                  dotColor={theme === 'light' ? '' : '#fff'}
                  style={{
                    height: height * 0.25,
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
                      <View
                        style={styleMetodologies.viewExample}>
                        <Text key={index} style={styleMetodologies.example}>
                          {texto}
                        </Text>
                      </View>
                    ))}
                </Swiper>
              </View>
            </View>
          </Modal>
          <View
            pointerEvents={modalVisible ? 'auto' : 'none'}
            style={[
              styleMetodologies.overlay,
              modalVisible && styleMetodologies.overlayVisible,
            ]}
          />
        </>
      )}
    </View>
  );
};

export default Methodologies;
