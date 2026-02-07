import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import firebase from '../factory/firebase';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifiedTasks = useRef(new Set());
  //je jnjenjv
  // Quando você for carregar as notificações no hook useEffect
  const loadPendingNotifications = useCallback(() => {
    const notificationsCollection = firebase
      .firestore()
      .collection('notificacao');

    const unsubscribe = notificationsCollection.onSnapshot((snapshot) => {
      const loadedNotifications = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        loadedNotifications.push({
          id: doc.id,
          taskId: data.taskId,
          title: data.title,
          dayTask: data.dayTask || 'Desconhecido',
          startTime: data.startTime || 'Não especificado',
          endTime: data.endTime || 'Não especificado',
          status: data.status,
          createdAt: data.createdAt,
          isRead: data.isRead || false, // Carregando o campo isRead corretamente
        });
      });

      // Filtrar notificações não lidas
      const unreadNotifications = loadedNotifications.filter(
        (notification) => !notification.isRead
      );
      setNotifications(loadedNotifications);
      setHasNewNotifications(unreadNotifications.length > 0);
    });

    return unsubscribe;
  }, []);

  const saveNotificationToFirestore = async (
    taskId,
    title,
    dayTask,
    startTime,
    endTime,
    status
  ) => {
    try {
      const notificationDocRef = firebase
        .firestore()
        .collection('notificacao')
        .doc(taskId);

      const notificationDoc = await notificationDocRef.get();
      if (!notificationDoc.exists) {
        await notificationDocRef.set({
          taskId,
          title,
          dayTask,
          startTime,
          endTime,
          status,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          isRead: false,
        });
        console.log('Notificação salva com sucesso!');
      } else {
        console.log(
          'Notificação já existe para essa tarefa, não adicionada novamente'
        );
      }
    } catch (error) {
      console.error('Erro ao salvar notificação:', error);
    }
  };

  const monitorPendingTasks = useCallback(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('tarefas')
      .onSnapshot(async (snapshot) => {
        for (const doc of snapshot.docs) {
          const data = doc.data();
          const taskId = doc.id;

          if (
            data.status === 'Pendente' &&
            data.notificated === false &&
            !notifiedTasks.current.has(taskId)
          ) {
            notifiedTasks.current.add(taskId);

            await saveNotificationToFirestore(
              taskId,
              data.title,
              data.dayTask || 'Desconhecido',
              data.startTime || 'Não especificado',
              data.endTime || 'Não especificado',
              data.status
            );

            await firebase
              .firestore()
              .collection('tarefas')
              .doc(taskId)
              .update({
                notificated: true,
              });

            setHasNewNotifications(true);
          }
        }
      });

    return unsubscribe;
  }, []);

  const clearNotifications = async () => {
    try {
      const notificationsCollection = firebase
        .firestore()
        .collection('notificacao');
      const snapshot = await notificationsCollection.get();
      snapshot.forEach(async (doc) => {
        await doc.ref.delete();
      });

      setNotifications([]);
      setHasNewNotifications(false);
      console.log('Todas as notificações foram limpas com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar notificações:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const notificationDocRef = firebase
        .firestore()
        .collection('notificacao')
        .doc(notificationId);
      const notificationDoc = await notificationDocRef.get();

      if (notificationDoc.exists) {
        await notificationDocRef.delete();

        // Atualizando a lista de notificações local após a exclusão
        setNotifications((prevNotifications) => {
          const updatedNotifications = prevNotifications.filter(
            (n) => n.id !== notificationId
          );

          // Atualizando o estado de hasNewNotifications corretamente
          const hasUnreadNotifications = updatedNotifications.some(
            (n) => !n.isRead
          );
          setHasNewNotifications(hasUnreadNotifications);

          return updatedNotifications;
        });

        console.log(`Notificação ${notificationId} excluída com sucesso!`);
      } else {
        console.log(`Notificação ${notificationId} não encontrada!`);
      }
    } catch (error) {
      console.error('Erro ao excluir notificação:', error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const notificationDocRef = firebase
        .firestore()
        .collection('notificacao')
        .doc(notificationId);
      const notificationDoc = await notificationDocRef.get();

      if (notificationDoc.exists) {
        await notificationDocRef.update({ isRead: true });

      
        setNotifications((prevNotifications) => {
          const updatedNotifications = prevNotifications.map((notification) =>
            notification.id === notificationId
              ? { ...notification, isRead: true }
              : notification
          );

         
          const hasUnreadNotifications = updatedNotifications.some(
            (n) => !n.isRead
          );
          setHasNewNotifications(hasUnreadNotifications);

          return updatedNotifications;
        });

        console.log(
          `Notificação ${notificationId} marcada como lida com sucesso!`
        );
      }
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  };

  useEffect(() => {
    const unsubscribeNotifications = loadPendingNotifications();
    const unsubscribeTasks = monitorPendingTasks();
    return () => {
      unsubscribeNotifications();
      unsubscribeTasks();
    };
  }, [loadPendingNotifications, monitorPendingTasks]);

  return (
    <NotificationContext.Provider
      value={{
        hasNewNotifications,
        notifications,
        deleteNotification,
        clearNotifications,
        markNotificationAsRead,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
