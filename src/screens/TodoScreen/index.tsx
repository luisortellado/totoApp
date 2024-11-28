import React, {useState} from 'react';
import {View, TextInput, Button, FlatList, StyleSheet} from 'react-native';
import TaskItem from '../../components/TaskItem';
import {generateId} from '../../utils/utils';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const TodoScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>('');

  const addTask = () => {
    if (task.trim()) {
      setTasks(prevTasks => [
        ...prevTasks,
        {id: generateId(), text: task, completed: false},
      ]);
      setTask('');
    }
  };

  const toggleComplete = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(t => (t.id === id ? {...t, completed: !t.completed} : t)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="New Task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
        testID="taskInput"
      />
      <Button title="Add Task" onPress={addTask} testID="addButton" />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TaskItem
            task={item}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
});

export default TodoScreen;
