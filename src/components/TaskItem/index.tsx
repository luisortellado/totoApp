import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = ({task, onToggleComplete, onDelete}: TaskItemProps) => {
  return (
    <View style={styles.taskItem}>
      <Text
        style={[styles.taskText, task.completed && styles.completedTaskText]}
        testID={`taskText-${task.id}`}>
        {task.text}
      </Text>
      <Button
        title="Complete"
        onPress={() => onToggleComplete(task.id)}
        testID={`completeButton-${task.id}`}
      />
      <Button
        title="Delete"
        onPress={() => onDelete(task.id)}
        testID={`deleteButton-${task.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
});

export default TaskItem;
