import React, { useContext } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

import WindowDimensions from '../css/Config/StyleUserInfo';
import { ThemeContext } from './DarkMode/DmContext';

export default function CustomActionSheet({
  visible,
  onClose,
  onEdit,
  onDelete,
  post,
  postId,
}) {
  const { theme } = useContext(ThemeContext);
  const styleUserInfo = WindowDimensions(theme);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styleUserInfo.container}>
        <TouchableOpacity onPress={()=>{
          onEdit();
          onClose();
        }} style={styleUserInfo.option}>
          <Text style={styleUserInfo.text}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
          onDelete();
          onClose();
        }} style={styleUserInfo.option}>
          <Text style={[styleUserInfo.text, { color: 'red' }]}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} style={styleUserInfo.optionCancel}>
          <Text style={styleUserInfo.textCancel}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
