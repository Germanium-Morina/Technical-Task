import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../types/Task';
import { formatDate } from '../utils/dateFormatter';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onPress: (task: Task) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onPress }: Props) {
  const isCompleted = task.status === 'completed';

  function handleDelete() {
    Alert.alert('Delete Task', `Delete "${task.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(task.id) },
    ]);
  }

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(task)} activeOpacity={0.7}>
      <View style={styles.row}>

        <TouchableOpacity
          style={[styles.checkbox, isCompleted && styles.checkboxDone]}
          onPress={() => onToggle(task.id)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {isCompleted && <Ionicons name="checkmark" size={14} color="#fff" />}
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={[styles.title, isCompleted && styles.titleDone]} numberOfLines={1}>
            {task.title}
          </Text>
          {task.description ? (
            <Text style={styles.description} numberOfLines={1}>
              {task.description}
            </Text>
          ) : null}
          <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
        </View>

        <View style={styles.right}>
          <View style={[styles.badge, isCompleted ? styles.badgeDone : styles.badgePending]}>
            <Text style={[styles.badgeText, isCompleted ? styles.badgeTextDone : styles.badgeTextPending]}>
              {isCompleted ? 'Done' : 'Pending'}
            </Text>
          </View>
          <TouchableOpacity onPress={handleDelete} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close-outline" size={20} color="#d1d5db" />
          </TouchableOpacity>
        </View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 5,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  date: {
    fontSize: 11,
    color: '#9ca3af',
  },
  right: {
    alignItems: 'flex-end',
    gap: 8,
    flexShrink: 0,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  badgePending: { backgroundColor: '#fef3c7' },
  badgeDone: { backgroundColor: '#d1fae5' },
  badgeText: { fontSize: 11, fontWeight: '600' },
  badgeTextPending: { color: '#92400e' },
  badgeTextDone: { color: '#065f46' },
});