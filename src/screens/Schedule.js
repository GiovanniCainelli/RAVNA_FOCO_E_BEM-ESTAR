import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  View,
  FlatList,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Animated,
  Alert,
  Modal,
  StatusBar,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

import useStyleRouts from '../css/styleRouts';
import { NotificationProvider } from '../components/notificationContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRoute } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import useStyleSchedule from '../css/StyleSchedule';
import { ThemeContext } from '../components/DarkMode/DmContext';
import Header from '../components/Header';
import firebase from '../factory/firebase';
const { width } = Dimensions.get('window');

const ITEM_WIDTH = width;

const DAYS_OF_WEEK = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const Schedule = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const [checkedItems, setCheckedItems] = useState([]);
  const [task, setTask] = useState('');
  const [tasksByDay, setTasksByDay] = useState([]);
  const [status, setStatus] = useState();
  const { height } = useWindowDimensions();
  const styleSchedule = useStyleSchedule(theme, width, height);
  const [modalVisible, setModalVisible] = useState(false);
  const styleRouts = useStyleRouts(theme, height, width);

  const route = useRoute();
  const flatListRef = useRef(null);
  const currentUser = firebase.auth().currentUser;
  const { dayTask } = route.params || {};

  // Inicializa as tarefas por dia

  useEffect(() => {
    setTasksByDay(DAYS_OF_WEEK.map((day) => ({ day, tasks: [] }))); 
  }, []);

  const statusBarOpacity = useCallback(
    (isVisible) => {
      if (isVisible) {
        StatusBar.setBarStyle('light');
        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.01)', true);
      } else {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(
          theme === 'light' ? '#EBF3FC' : '#333',
          true
        );
      }
    },
    [theme]
  );

  const loadTasksFromFirestore = async () => {
    try {
      const snapshot = await firebase
        .firestore()
        .collection('tarefas')
        .where('CreatedBy', '==')
        .get();
      const loadedTasksByDay = DAYS_OF_WEEK.map((day) => ({
        day,
        tasks: [],
      }));

      snapshot.forEach((doc) => {
        const data = doc.data();
        const taskDay = loadedTasksByDay.find((d) => d.day === data.dayTask);

        if (taskDay) {
          taskDay.tasks.push({
            ...data,
            id: `${taskDay.tasks.length + 1}. `,
            firebaseId: doc.id,
            animation: new Animated.Value(1),
            scale: new Animated.Value(1),
            position: new Animated.Value(0),
            expanded: false,
          });
        }
      });

      setTasksByDay(loadedTasksByDay);
    } catch (error) {
      console.error('Erro ao carregar as tarefas do Firestore: ', error);
    }
  };

  useEffect(() => {
    loadTasksFromFirestore();
  }, []);

  const initialIndex = tasksByDay.findIndex((task) => task.day === dayTask);
  useEffect(() => {
    if (dayTask) {
      Alert.alert('Dia da Tarefa', `Tarefa para o dia: ${dayTask}`);
    }
  }, [dayTask]);

  useEffect(() => {
    if (dayTask && tasksByDay.length > 0 && flatListRef.current) {
      const dayIndex = tasksByDay.findIndex((task) => task.day === dayTask);

      if (dayIndex !== -1) {
        flatListRef.current.scrollToIndex({
          index: dayIndex,
          animated: true,
        });
      }
    }
  }, [dayTask, tasksByDay]);

  const addTask = async (day) => {
    const currentTime = new Date().getTime();
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const taskDayIndex = day;

    console.log(`Adicionando tarefa para o dia: ${day}`);

    const tasksForDay = tasksByDay.find((d) => d.day === day)?.tasks || [];
    const recentTasks = tasksForDay.filter(
      (task) => currentTime - task.timestamp < 3 * 60 * 60 * 1000
    );

    console.log(`Recent Tasks: ${recentTasks.length}`);

    if (recentTasks.length >= 5) {
      Alert.alert(
        'Limite de tarefas',
        'Você pode adicionar no máximo 5 tarefas a cada 3 horas.'
      );
      return;
    }

    const taskStatus = StatusTask(taskDayIndex, currentDayOfWeek, currentTime);
    Alert.alert('Status determinado', `Status: ${taskStatus}`);

    if (task && task.trim()) {
      const newTask = {
        id: `${tasksForDay.length + 1}. `,
        dayTask: day,
        title: task,
        timestamp: currentTime,
        startTime: '',
        endTime: '',
        isCompleted: false,
        notificated: false,
        animation: new Animated.Value(1),
        scale: new Animated.Value(1),
        position: new Animated.Value(0),
        expanded: false,
        status: taskStatus,
      };

      setTasksByDay((prevTasks) =>
        prevTasks.map((d) => {
          if (d.day === day) {
            return { ...d, tasks: [...d.tasks, newTask] };
          }
          return d;
        })
      );

      setTask('');
      AdicionarTarefas(day, newTask);
      StatusTask(status);
    } else {
      Alert.alert('Erro', 'O campo de tarefa não pode estar vazio.');
    }
  };

  const StatusTask = (taskDayIndex, currentDayOfWeek, currentTime) => {
    let status;
    if (taskDayIndex < currentDayOfWeek && endTime < currentTime) {
      status = 'agendada';
    } else if (taskDayIndex === currentDayOfWeek) {
      if (endTime && endTime < currentTime) {
        status = 'Pendente';
      }
    } else {
      status = 'agendada';
    }
    Alert.alert('Status calculado', `Status atual: ${status}`);
    return status;
  };

  const AdicionarTarefas = (day, newTask) => {
    firebase
      .firestore()
      .collection('tarefas')
      .add({
        title: newTask.title,
        dayTask: day,
        isCompleted: newTask.isCompleted,
        status: newTask.status,
        notificated: newTask.notificated,
      })
      .then((docRef) => {
        setTasksByDay((prevTasks) =>
          prevTasks.map((d) => {
            if (d.day === day) {
              const updatedTasks = d.tasks.map((t) => {
                if (t.title === newTask.title) {
                  return { ...t, firebaseId: docRef.id };
                }
                return t;
              });
              return { ...d, tasks: updatedTasks };
            }
            return d;
          })
        );
      })
      .catch((error) => {
        console.error('Erro ao adicionar a tarefa ao Firestore: ', error);
      });
  };

  const toggleCheckbox = async (firebaseId) => {
    try {
      const taskToUpdate = tasksByDay
        .flatMap((day) => day.tasks)
        .find((task) => task.firebaseId === firebaseId);

      if (!taskToUpdate) return;

      const newIsCompleted = !taskToUpdate.isCompleted;
      const currentDate = new Date();
      const currentDayOfWeek = currentDate.getDay();
      const currentTime = currentDate.getTime();
      const taskDayIndex = taskToUpdate.taskDayIndex;
      const endTime = taskToUpdate.endTime
        ? convertToTimestamp(taskToUpdate.endTime)
        : null;

      let newStatus;
      if (newIsCompleted) {
        newStatus = 'concluída';
      } else {
        if (
          taskDayIndex < currentDayOfWeek ||
          (taskDayIndex === currentDayOfWeek &&
            endTime &&
            endTime < currentTime)
        ) {
          newStatus = 'Pendente';
        } else {
          newStatus = 'agendada';
        }
      }

      await firebase.firestore().collection('tarefas').doc(firebaseId).update({
        isCompleted: newIsCompleted,
        status: newStatus,
      });

      setTasksByDay((prevTasks) =>
        prevTasks.map((day) => ({
          ...day,
          tasks: day.tasks.map((task) =>
            task.firebaseId === firebaseId
              ? { ...task, isCompleted: newIsCompleted, status: newStatus }
              : task
          ),
        }))
      );
    } catch (error) {
      console.error('Erro ao atualizar a checkbox:', error);
    }
  };

  const convertToTimestamp = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.getTime();
  };
  const updateExpiredTasksStatus = useCallback(async () => {
    try {
      const tasksSnapshot = await firebase
        .firestore()
        .collection('tarefas')
        .get();

      const dayOfWeekMap = {
        Domingo: 0,
        'Segunda-feira': 1,
        'Terça-feira': 2,
        'Quarta-feira': 3,
        'Quinta-feira': 4,
        'Sexta-feira': 5,
        Sábado: 6,
      };

      const updatePromises = tasksSnapshot.docs.map(async (doc) => {
        const task = { firebaseId: doc.id, ...doc.data() };

        const taskDayIndex = dayOfWeekMap[task.dayTask];

        if (taskDayIndex === undefined) {
          return;
        }

        const endTimeTimestamp = task.endTime
          ? convertToTimestamp(task.endTime)
          : null;
        const currentDate = new Date();
        const currentDayOfWeek = currentDate.getDay();

        if (
          task.status === 'agendada' &&
          endTimeTimestamp &&
          taskDayIndex === currentDayOfWeek &&
          endTimeTimestamp < Date.now()
        ) {
          await firebase
            .firestore()
            .collection('tarefas')
            .doc(task.firebaseId)
            .update({
              status: 'Pendente',
            });

          Alert.alert(
            'Tarefa atualizada',
            `A tarefa "${task.title}" foi marcada como Pendente.`
          );
        }
      });

      await Promise.all(updatePromises);
    } catch (error) {
      Alert.alert('Erro ao atualizar o status das tarefas:', error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updateExpiredTasksStatus();
    }, 15000);

    return () => clearInterval(interval);
  }, [updateExpiredTasksStatus]);

  const handleCheck = async (taskId, day) => {
    const dayTasks = tasksByDay.find((d) => d.day === day);
    const taskToUpdate = dayTasks?.tasks.find((t) => t.id === taskId);

    if (taskToUpdate && taskToUpdate.firebaseId) {
      if (
        (taskToUpdate.startTime && !isValidTime(taskToUpdate.startTime)) ||
        (taskToUpdate.endTime && !isValidTime(taskToUpdate.endTime))
      ) {
        Alert.alert(
          'Horário inválido',
          'Por favor, insira horários válidos no formato HH:mm para continuar.'
        );
        setTasksByDay((prevTasks) =>
          prevTasks.map((d) =>
            d.day === day
              ? {
                  ...d,
                  tasks: d.tasks.map((t) =>
                    t.id === taskId ? { ...t, startTime: '', endTime: '' } : t
                  ),
                }
              : d
          )
        );
        return;
      }

      const formattedStartTime = formatTime(taskToUpdate.startTime || '');
      const formattedEndTime = formatTime(taskToUpdate.endTime || '');

      const novosDados = {
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      };

      try {
        await firebase
          .firestore()
          .collection('tarefas')
          .doc(taskToUpdate.firebaseId)
          .update(novosDados);

        setTasksByDay((prevTasks) =>
          prevTasks.map((d) =>
            d.day === day
              ? {
                  ...d,
                  tasks: d.tasks.map((t) =>
                    t.id === taskId ? { ...t, ...novosDados } : t
                  ),
                }
              : d
          )
        );

        Alert.alert(
          'Campos de horários atualizados e tarefa fechada com sucesso!'
        );
      } catch (error) {
        console.error('Erro ao atualizar a tarefa: ', error);
        Alert.alert('Erro', 'Não foi possível atualizar os horários.');
      }
    } else {
      Alert.alert('Erro', 'Tarefa não encontrada ou ID do Firestore ausente.');
    }
  };

  const deleteTime = async (taskId, day) => {
    const delTimebyDay = tasksByDay.find((d) => d.day === day);

    const taskToDeleteTime = delTimebyDay?.tasks.find((t) => t.id === taskId);

    if (taskToDeleteTime && taskToDeleteTime.firebaseId) {
      try {
        await firebase
          .firestore()
          .collection('tarefas')
          .doc(taskToDeleteTime.firebaseId)
          .update({
            startTime: firebase.firestore.FieldValue.delete(),
            endTime: firebase.firestore.FieldValue.delete(),
          });

        setTasksByDay((prevTasks) =>
          prevTasks.map((d) => {
            if (d.day === day) {
              return {
                ...d,
                tasks: d.tasks.map((t) => {
                  if (t.id === taskId) {
                    return { ...t, startTime: null, endTime: null };
                  }
                  return t;
                }),
              };
            }
            return d;
          })
        );

        Alert.alert('Horarios removidos com sucesso');
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível remover os horários.');
      }
    } else {
      Alert.alert('Erro, Não foi possivel encontrar o id');
    }
  };

  const handleDelete = async (day, taskId) => {
    const taskToDelete = tasksByDay
      .find((d) => d.day === day)
      ?.tasks.find((t) => t.id === taskId);

    if (taskToDelete && taskToDelete.firebaseId) {
      try {
        await firebase
          .firestore()
          .collection('tarefas')
          .doc(taskToDelete.firebaseId)
          .delete();

        setCheckedItems((prevCheckedItems) =>
          prevCheckedItems.filter((id) => id !== taskId)
        );

        setTasksByDay((prevTasks) => {
          return prevTasks.map((d) => {
            if (d.day === day) {
              return {
                ...d,
                tasks: d.tasks
                  .filter((task) => task.id !== taskId)
                  .map((task, index) => ({
                    ...task,
                    id: `${index + 1}. `,
                  })),
              };
            }
            return d;
          });
        });

        Alert.alert('Tarefa excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir a tarefa: ', error);
        Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
      }
    } else {
      Alert.alert('Erro', 'Tarefa não encontrada ou ID do Firestore ausente.');
    }
  };

  const handleExpand = (task, day) => {
    setTasksByDay((prevTasks) =>
      prevTasks.map((d) => {
        if (d.day === day) {
          return {
            ...d,
            tasks: d.tasks.map((t) =>
              t.id === task.id ? { ...t, expanded: !t.expanded } : t
            ),
          };
        }
        return d;
      })
    );
  };
  const formatTime = (text) => {
    const cleanedText = text.replace(/\D/g, '');

    if (cleanedText.length <= 2) {
      return cleanedText;
    } else if (cleanedText.length <= 4) {
      return `${cleanedText.slice(0, 2)}:${cleanedText.slice(2)}`;
    }

    return `${cleanedText.slice(0, 2)}:${cleanedText.slice(2, 4)}`;
  };

  const isValidTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
  };

  const handleStartTimeChange = (text, taskId, day) => {
    const formattedTime = formatTime(text);

    const updatedTasks = tasksByDay.map((d) => {
      if (d.day === day) {
        return {
          ...d,
          tasks: d.tasks.map((t) =>
            t.id === taskId ? { ...t, startTime: formattedTime } : t
          ),
        };
      }
      return d;
    });
    setTasksByDay(updatedTasks);
  };

  const handleEndTimeChange = (text, taskId, day) => {
    const formattedTime = formatTime(text);
    const updatedTasks = tasksByDay.map((d) => {
      if (d.day === day) {
        return {
          ...d,
          tasks: d.tasks.map((t) =>
            t.id === taskId ? { ...t, endTime: formattedTime } : t
          ),
        };
      }
      return d;
    });
    setTasksByDay(updatedTasks);
  };

  const renderItem = ({ item, day }) => {
    const animateDelete = () => {
      Animated.parallel([
        Animated.timing(item.animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(item.position, {
          toValue: width,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        handleDelete(day, item.id);
      });
    };

    return (
      <View style={{ backgroundColor: '', flexDirection: 'row', width }}>
        <Animated.View
          style={[
            styleSchedule.item,
            {
              opacity: item.animation,
              transform: [{ translateX: item.position }],
              width: width * 0.8,
              flex: 4,
            },
          ]}>
          <View style={styleSchedule.viewItem}>
            <Text
              style={{
                textDecorationLine: item.isCompleted ? 'line-through' : 'none',
                opacity: item.isCompleted ? 0.5 : 1,
                color: theme === 'light' ? '#000' : '#fff',
                marginHorizontal: 5,
                fontSize: 17,
                width: width * 0.5,
                zIndex: 12,
              }}>
              {item.id}
              {item.title}
            </Text>
            {item.expanded && (
              <View
                style={styleSchedule.viewExpanded}>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    placeholder="Iniciar ás 12:00  "
                    placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
                    style={styleSchedule.inputExpanded}
                    value={item.startTime}
                    onChangeText={(text) =>
                      handleStartTimeChange(text, item.id, day)
                    }
                    maxLength={5}
                    keyboardType="numeric"
                  />
                  <TextInput
                    placeholder="Finalizar ás 12:00 "
                    placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
                    style={styleSchedule.inputExpanded}
                    value={item.endTime}
                    onChangeText={(text) =>
                      handleEndTimeChange(text, item.id, day)
                    }
                    maxLength={5}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styleSchedule.viewBtnExp}>
                  <TouchableOpacity onPress={() => handleCheck(item.id, day)}>
                    <AntDesign
                      name="check"
                      style={{
                        color: theme === 'light' ? 'green' : '#4CAF50',
                        marginHorizontal: 15,
                      }}
                      size={23}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTime(item.id, day)}>
                    <AntDesign
                      name="close"
                      style={{
                        color: theme === 'light' ? '#B71C1C' : '#FF0000',
                        marginHorizontal: 15,
                      }}
                      size={23}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </Animated.View>

        <View style={styleSchedule.checkDel}>
          <TouchableOpacity onPress={() => handleExpand(item, day)}>
            <MaterialCommunityIcons
              name={item.startTime || item.endTime ? 'bell-ring' : 'bell'}
              size={23}
              color="#4A90E2"
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
          <CheckBox
            checked={item.isCompleted}
            onPress={() => toggleCheckbox(item.firebaseId)}
            iconRight
            uncheckedColor={theme === 'light' ? '#000' : '#4A90E2'}
          />
          <TouchableOpacity
            onPress={animateDelete}
            style={styleSchedule.btnDelete}>
            <AntDesign
              name="delete"
              size={23}
              style={{ color: 'red', bottom: 1 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCard = ({ item }) => {
    return (
      <View style={styleSchedule.cardSchedule}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styleSchedule.cardText}>{item.day}</Text>
          <TextInput
            placeholder="Nova Tarefa"
            placeholderTextColor={theme === 'light' ? '#000' : '#fff'}
            value={task}
            onChangeText={setTask}
            style={styleSchedule.inputText}
          />
          <TouchableOpacity
            onPress={() => addTask(item.day)}
            style={styleSchedule.btnAdd}>
            <Text
              style={{
                fontWeight: 'condensedBold',
                color: theme === 'light' ? '#000' : '#fff',
              }}>
              Adicionar
            </Text>
            <MaterialIcons
              name="note-add"
              size={15}
              style={{ color: theme === 'light' ? 'black' : '#fff' }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={item.tasks}
          renderItem={(props) => renderItem({ ...props, day: item.day })}
          keyExtractor={(task) => task.id}
        />
      </View>
    );
  };

  return (
    <NotificationProvider tasksByDay={tasksByDay}>
      <Header />
      <View style={styleSchedule.containerSchedule}>
        <FlatList
          ref={flatListRef}
          data={tasksByDay}
          renderItem={renderCard}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.day}
          initialScrollIndex={initialIndex !== -1 ? initialIndex : 0}
          getItemLayout={(data, index) => ({
            length: ITEM_WIDTH,
            offset: ITEM_WIDTH * index,
            index,
          })}
          style={styleSchedule.flatList}
        />
      </View>
    </NotificationProvider>
  );
};

export default Schedule;
