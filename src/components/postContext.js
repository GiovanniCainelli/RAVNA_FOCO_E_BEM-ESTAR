import React, { createContext, useState, useContext, useEffect } from 'react';
import firebase from '../factory/firebase'; // Ajuste para o caminho correto do seu Firebase

// Criando o contexto
const PostsContext = createContext();

// Provider do contexto
export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const currentUser = firebase.auth().currentUser;

  const loadPostsFromFirestore = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('posts')
        .where('createdBy.uid', '==', currentUser.uid)
        .get();
      const loadedPosts = snapshot.docs.map((doc) => ({
        id: doc.id, // Usando o ID do documento no Firestore
        ...doc.data(),
      }));
      setPosts(loadedPosts); // Atualiza o estado com os posts carregados
    } catch (error) {
      console.error('Erro ao carregar os posts do Firestore:', error);
    }
  };

  // Atualiza o estado global sempre que um post é adicionado ou modificado
  const addOrUpdatePost = (postId, postData) => {
    if (postId) {
      // Atualiza o post existente no Firebase
      firebase
        .firestore()
        .collection('posts')
        .doc(postId)
        .update(postData)
        .then(() => {
          // Atualiza o estado local para refletir as mudanças
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId ? { ...post, ...postData } : post
            )
          );
        })
        .catch((error) => console.error('Erro ao atualizar post:', error));
    } else {
      // Cria um novo post no Firebase
      firebase
        .firestore()
        .collection('posts')
        .add(postData)
        .then((docRef) => {
          setPosts((prevPosts) => [
            ...prevPosts,
            { id: docRef.id, ...postData },
          ]);
        })
        .catch((error) => console.error('Erro ao criar post:', error));
    }
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc') // Ordenando por data de criação, mais recente primeiro
      .onSnapshot(
        (snapshot) => {
          const loadedPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(loadedPosts); // Atualiza o estado com os posts mais recentes
        },
        (error) => {
          console.error('Erro ao carregar posts:', error);
        }
      );

    // Função de limpeza para remover o listener quando o componente for desmontado
    return () => unsubscribe();
  }, []);
  // Deleta um post
  const deletePost = async (id) => {
    try {
      console.log(`Tentando excluir o post com ID Firestore: ${id}`);

      const postRef = firebase.firestore().collection('posts').doc(id);
      const postSnapshot = await postRef.get();

      if (postSnapshot.exists) {
        console.log('Post encontrado. Deletando...');
        await postRef.delete();
        Alert.alert(`Post com ID ${id} deletado com sucesso.`);

        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      } else {
        console.log(`Post com ID ${id} não encontrado.`);
        Alert.alert(`Post com ID ${id} não encontrado.`);
      }
    } catch (error) {
      console.error('Erro ao excluir o post:', error);
      Alert.alert('Ocorreu um erro ao tentar excluir o post.');
    }
  };
  useEffect(() => {
    loadPostsFromFirestore();
  },);

  return (
    <PostsContext.Provider value={{ posts, addOrUpdatePost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
