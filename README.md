# RAVNA – Foco e Bem-Estar 🧠📚

O **Ravna** é um aplicativo voltado à saúde mental de estudantes, com o objetivo de auxiliá-los na organização dos estudos de forma saudável, promovendo bem-estar e melhor desempenho acadêmico.  
A plataforma também prevê suporte e orientação de profissionais da área da saúde.

---

## 🎯 Objetivo do Projeto

Promover uma experiência de estudo equilibrada, unindo produtividade e saúde mental, por meio de uma aplicação mobile acessível e intuitiva.

---

## 📱 Sobre o Projeto

O Ravna é um aplicativo móvel desenvolvido com **React Native** e **Expo**, focado em oferecer uma plataforma integrada para estudantes e profissionais da saúde mental.

O projeto conta com:
- autenticação de usuários
- navegação estruturada
- gerenciamento de estado
- múltiplas funcionalidades voltadas ao bem-estar e organização acadêmica

🔗 O projeto pode ser visualizado via **Expo Snack** utilizando o aplicativo **Expo Go**, disponível pra Android: 

https://snack.expo.dev/@cainellinelli/ravna-back
---

## ✨ Funcionalidades Principais

- **Autenticação de Usuário**
  - Login
  - Registro

- **Gestão de Perfil**
  - Informações do usuário
  - Configurações
  - Alteração de senha

- **Conteúdo Informativo**
  - Metodologias de estudo
  - Lista de psicólogos

- **Interatividade**
  - Criação de posts
  - Sistema de favoritos
  - Agendamento de atividades
  - Notificações

- **Temas**
  - Modo claro
  - Modo escuro

- **Navegação**
  - Navegação em pilha, abas e drawer com React Navigation

---

## 🛠️ Tecnologias Utilizadas

### Framework e Plataforma
- React Native
- Expo

### Navegação
- @react-navigation/native
- @react-navigation/stack
- @react-navigation/drawer
- @react-navigation/bottom-tabs
- react-native-screens
- react-native-safe-area-context

### UI e Componentes Visuais
- @rneui/base
- @rneui/themed
- react-native-elements
- react-native-paper
- @expo/vector-icons
- react-native-vector-icons
- react-native-swiper
- react-native-snap-carousel
- react-native-popup-menu
- react-native-material-menu
- expo-status-bar

### Formulários e Validação
- formik
- yup

### Backend e Dados
- firebase
- @react-native-async-storage/async-storage

### Recursos do Dispositivo
- expo-image-picker
- react-native-image-picker
- expo-file-system
- expo-av
- expo-font

### Animações e Gestos
- react-native-reanimated
- react-native-gesture-handler

---

## ▶️ Como Executar o Projeto

Este projeto está configurado para execução via **Expo Snack**.

1. Acesse o Snack:  
   https://snack.expo.dev/@cainellinelli/ravna-back

2. Execute no dispositivo (recomendado):
   - Instale o aplicativo **Expo Go** (Android ou iOS)
   - Clique em **Run on device** ou escaneie o QR Code

3. Execute no navegador:
   - Utilize o preview web disponível no Snack
  
## Observação
 -  Imagens ficam salvas apenas temporariamente por falta de recursos de armazenamento.
 -  Ao inicializar o App, será redirecionado diretamente a Home (tela inicial) para facilitar a navegação. Para criar contas e testar o Login/Cadastro, acesse o icone de configurações e clique "Sair".

---

## 📂 Estrutura de Pastas

```text
src/
 ├── components/          # Componentes reutilizáveis e contextos
 │   ├── DarkMode/
 │   ├── notificationContext/
 │   ├── profileImageContext/
 │   ├── postContext/
 │   └── favoritesContext/
 ├── screens/             # Telas do aplicativo
 │   ├── CommunUser/
 │   ├── Routes.js
 │   ├── AboutUs.js
 │   ├── Contact.js
 │   ├── CreatePost.js
 │   ├── Home.js
 │   ├── Login.js
 │   ├── Methodologies.js
 │   ├── Notification.js
 │   ├── Psicologos.js
 │   ├── Register.js
 │   ├── Schedule.js
 │   └── SplashScreen.js
App.js                    # Entrada principal do app
README.md


