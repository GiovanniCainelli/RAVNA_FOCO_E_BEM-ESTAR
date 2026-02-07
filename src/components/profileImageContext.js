// ProfileImageContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileImageContext = createContext();

export const ProfileImageProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);

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

  const updateProfileImage = async (newImageUri) => {
    try {
      if (newImageUri) {
        console.log('Atualizando imagem para:', newImageUri);
        await AsyncStorage.setItem('profileImage', newImageUri);
        setProfileImage(newImageUri);
      } else {
        console.log('Excluindo imagem');
        await AsyncStorage.removeItem('profileImage');
        setProfileImage(null);
      }
    } catch (error) {
      console.error('Erro ao atualizar imagem de perfil:', error);
    }
  };

  return (
    <ProfileImageContext.Provider value={{ profileImage, updateProfileImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
};
