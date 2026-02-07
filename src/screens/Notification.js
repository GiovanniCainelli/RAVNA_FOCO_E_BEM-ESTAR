import React, { useContext, useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  Animated,
} from 'react-native';
import Header from '../components/Header';
import AntDesign from '@expo/vector-icons/AntDesign';
import useStyleNotification from '../css/StyleNotification';
import { ThemeContext } from '../components/DarkMode/DmContext';
import { useWindowDimensions } from 'react-native';
import { NotificationContext } from '../components/notificationContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Notification = ({ navigation }) => {
  const {
    notifications,
    markNotificationAsRead,
    clearNotifications,
    deleteNotification,
  } = useContext(NotificationContext);

  const { width, height } = useWindowDimensions();
  const { theme } = useContext(ThemeContext);
  const styleNotification = useStyleNotification(theme, width, height);

  const fadeAnims = useRef({});
  const slideAnims = useRef({});

  const handleDeleteNotification = async (notificationId) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    await deleteNotification(notificationId);
  };

  const animateDelete = (itemId) => {
    const fadeAnim = fadeAnims.current[itemId];
    const slideAnim = slideAnims.current[itemId];

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      handleDeleteNotification(itemId);
    });
  };

  const handleNotificationPress = async (item) => {
    if (!item.isRead) {
      await markNotificationAsRead(item.id);
    }

    navigation.navigate('Routs', {
      screen: 'Cronograma',
      params: { dayTask: item.dayTask },
    });
  };

  const handleClearNotifications = () => {
    let animations = notifications.map((item, index) => {
      return new Promise((resolve) => {
        animateDelete(item.id);
        setTimeout(() => resolve(), 300);
      });
    });

    Promise.all(animations).then(() => {
      clearNotifications();
    });
  };

  const renderNotification = ({ item }) => {
    if (!fadeAnims.current[item.id]) {
      fadeAnims.current[item.id] = new Animated.Value(1);
      slideAnims.current[item.id] = new Animated.Value(0);
    }

    return (
      <Animated.View
        style={[
          styleNotification.containerNotification,
          {
            opacity: fadeAnims.current[item.id],
            transform: [{ translateX: slideAnims.current[item.id] }],
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styleNotification.day}>{item.dayTask}</Text>
          <TouchableOpacity onPress={() => animateDelete(item.id)}>
            <AntDesign
              name="close"
              style={{
                color: theme === 'light' ? '#B71C1C' : '#FF0000',
                marginHorizontal: 15,
              }}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styleNotification.notifyBtn}
          onPress={() => handleNotificationPress(item)}>
          <View style={styleNotification.notification}>
            <Text style={styleNotification.title}>
              Tarefa {item.status}: {item.title.substring(0, 30) + '...'}
              <Text style={{ color: '#007BFF' }}> Ler mais </Text>
            </Text>
          </View>
          <View style={styleNotification.endTime}>
            <Text style={styleNotification.time}>{item.endTime}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styleNotification.container}>
      <Header />

      <View style={styleNotification.activity}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: 'condensedBold',
            color: theme === 'light' ? '#333' : '#fff',
          }}>
          Suas Atividades
        </Text>
        <TouchableOpacity
          onPress={handleClearNotifications}
          style={styleNotification.broom}>
          <Icon
            name="broom"
            size={28}
            style={{
              color: theme === 'light' ? 'black' : '#fff',
            }}
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: theme === 'light' ? '#333' : '#fff',
            }}>
            Excluir Todas
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
      />
    </View>
  );
};

export default Notification;
