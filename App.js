import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { StatusBar } from 'expo-status-bar';
import UserInfo from './src/screens/CommunUser/Configs/UserInfo';
import SplashScreen from './src/screens/SplashScreen';
import Register from './src/screens/Register';
import Login from './src/screens/Login';
import Home from './src/screens/Routs';
import Header from './src/components/Header';
import Methodologies from './src/screens/Methodologies';
import Schedule from './src/screens/Schedule';
import Notification from './src/screens/Notification';
import ChangePassword from './src/screens/CommunUser/Configs/changePassword';
import { NotificationProvider } from './src/components/notificationContext';
import Routs from './src/screens/Routs';
import { ProfileImageProvider } from './src/components/profileImageContext';
import Create from './src/screens/createPost';
import { PostsProvider } from './src/components/postContext';
import { FavoritesProvider } from './src/components/favoritesContext';
import Psicologos from './src/screens/psicologos';
import Contact from './src/screens/Contact';
import {
  ThemeContext,
  ThemeProvider,
} from './src/components/DarkMode/DmContext';

import Settings from './src/screens/CommunUser/Configs/Settings';

const Stack = createStackNavigator();

const AppContent = () => {
  const { theme } = useContext(ThemeContext);
  const [profileImage, setProfileImage] = useState(null);
  return (
    <>
      <StatusBar
        style={theme === 'light' ? 'dark' : 'light'}
        backgroundColor={theme === 'light' ? '#EBF3FC' : '#333'}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Psicologos" component={Psicologos} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Methodologies" component={Methodologies} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen
            name="Header"
            component={Header}
            initialParams={{ profileImage }}
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            name="UserInfo"
            component={UserInfo}
            initialParams={{ profileImage, setProfileImage }}
          />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Schedule" component={Schedule} />
          <Stack.Screen name="Routs" component={Routs} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Create" component={Create} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <PostsProvider>
          <ProfileImageProvider>
            <ActionSheetProvider>
              <FavoritesProvider>
                <AppContent />
              </FavoritesProvider>
            </ActionSheetProvider>
          </ProfileImageProvider>
        </PostsProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
