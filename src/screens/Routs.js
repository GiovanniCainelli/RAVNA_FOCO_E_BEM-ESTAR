import React, { useContext, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useWindowDimensions } from 'react-native';
import firebase from '../factory/firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../components/DarkMode/DmContext';
import { NotificationContext } from '../components/notificationContext';
import Psicologos from './psicologos';
import Home from './Home';
import Notification from './Notification';
import Schedule from './Schedule';
import Methodologies from './Methodologies';
import Create from './createPost';
import useStyleRouts from '../css/styleRouts';
const Tab = createBottomTabNavigator();

function Routs() {
  const { theme } = useContext(ThemeContext);
  const { width, height } = useWindowDimensions();
  const { hasNewNotifications } = useContext(NotificationContext);
  const [isPsychologist, setIsPsychologist] = useState(false);
  const styleRouts = useStyleRouts(width, height, theme);

  useEffect(() => {
    const user = firebase.auth().currentUser;

    if (user) {
      firebase
        .firestore()
        .collection('usuarios')
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setIsPsychologist(userData.isPsychologist || false);
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar dados do usuário:', error);
        });
    }
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styleRouts.container}>
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: styleRouts.tab,
        })}>
        <Tab.Screen
          name="Inicio"
          component={Home}
          options={{
            tabBarLabelStyle: { position: 'relative', bottom: 6 },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            tabBarIconStyle: { color: '#2c2437' },
          }}
        />

        <Tab.Screen
          name="Metodologias"
          component={Methodologies}
          options={{
            tabBarLabelStyle: { position: 'relative', bottom: 6, width: 60 },
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="book" color={color} size={size} />
            ),
            tabBarIconStyle: { color: '#2c2437' },
          }}
        />

        <Tab.Screen
          name={isPsychologist ? 'Criar Post' : 'Cronograma'}
          component={isPsychologist ? Create : Schedule}
          options={{
            tabBarLabelStyle: { position: 'relative', bottom: 6 },
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name={isPsychologist ? 'create' : 'schedule'}
                color={color}
                size={size}
              />
            ),
            tabBarIconStyle: { color: '#2c2437' },
          }}
        />

        <Tab.Screen
          name={isPsychologist ? 'Cronograma' : 'Psicologos'}
          component={isPsychologist ? Schedule : Psicologos}
          options={{
            tabBarLabelStyle: { position: 'relative', bottom: 6, width: 60 },
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name={isPsychologist ? 'schedule' : 'groups-3'}
                color={color}
                size={size}
              />
            ),
            tabBarIconStyle: { color: '#2c2437' },
          }}
        />

        <Tab.Screen
          name="Notificação"
          component={Notification}
          options={{
            tabBarLabelStyle: { position: 'relative', bottom: 6, width: 60 },
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name={hasNewNotifications ? 'bell-ring' : 'bell'}
                color={hasNewNotifications ? '#4A90E2' : color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default Routs;
