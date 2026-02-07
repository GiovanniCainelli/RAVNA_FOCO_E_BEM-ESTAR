import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useStyleHeader from '../css/StyleHeader';
import { ThemeContext } from './DarkMode/DmContext'; 
import { useWindowDimensions } from 'react-native';
import { ProfileImageContext } from './profileImageContext'; 
const Header = () => {
  const navigation = useNavigation(); 
  const { width, height } = useWindowDimensions(); 
  const { theme } = useContext(ThemeContext);
  
  const { profileImage, updateProfileImage } = useContext(ProfileImageContext);
  
  const styleHeader = useStyleHeader(theme, width, height); 

  return (
    <SafeAreaView style={styleHeader.container}>
      <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={[styleHeader.profileImage, { borderRadius: 50 }]}
            onError={(error) => {
              console.log('Erro ao carregar imagem:', error.nativeEvent.error);
            }}
          />
        ) : (
          <FontAwesome6 name="user-circle" style={styleHeader.iconHeader} />
        )}
      </TouchableOpacity>

      <View style={styleHeader.containerLogo}>
        <Image 
          style={styleHeader.logoHeader} 
          source={theme === 'light' ? require('../img/HeaderImg/RAVNA.png') : require('../img/HeaderImg/RAVNADm.png')} 
        />
        <Text style={styleHeader.logoText}>RAVNA</Text>
      </View>

      <TouchableOpacity onPress={() => { navigation.navigate('Settings'); }}>
        <AntDesign name="setting" style={styleHeader.iconHeader} />
      </TouchableOpacity>
    </SafeAreaView >
  );
}

export default Header;
