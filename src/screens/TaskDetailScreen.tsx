import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../App';
import { useTasks } from '../hooks/useTasks';
import { formatDate } from '../utils/dateFormatter';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen({ route, navigation }: Props) {
  const { taskId } = route.params;
  const { getTask, toggleTask, deleteTask } = useTasks();
  const task = getTask(taskId);

  if (!task) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Task not found.</Text>
      </View>
    );
  }

  const isCompleted = task.status === 'completed';

  function handleDelete() {
    Alert.alert('Delete Task', `Delete "${task!.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteTask(taskId);
          navigation.goBack();
        },
      },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={[styles.badge, isCompleted ? styles.badgeDone : styles.badgePending]}>
            <Text style={[styles.badgeText, isCompleted ? styles.badgeTextDone : styles.badgeTextPending]}>
              {isCompleted ? 'Completed' : 'Pending'}
            </Text>
          </View>
          <Text style={styles.date}>Created {formatDate(task.createdAt)}</Text>
        </View>

        <Text style={styles.title}>{task.title}</Text>

        <View style={styles.divider} />

        <Text style={styles.descLabel}>Description</Text>
        <Text style={styles.desc}>
          {task.description.trim() || 'No description provided.'}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.actionBtn, isCompleted ? styles.btnPending : styles.btnDone]}
        onPress={() => toggleTask(taskId)}
        activeOpacity={0.85}
      >
        <Ionicons
          name={isCompleted ? 'refresh-outline' : 'checkmark-circle-outline'}
          size={18}
          color="#fff"
        />
        <Text style={styles.actionBtnText}>
          {isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete} activeOpacity={0.85}>
        <Ionicons name="trash-outline" size={18} color="#dc2626" />
        <Text style={styles.deleteBtnText}>Delete Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgePending: { backgroundColor: '#fef3c7' },
  badgeDone: { backgroundColor: '#d1fae5' },
  badgeText: { fontSize: 12, fontWeight: '700' },
  badgeTextPending: { color: '#92400e' },
  badgeTextDone: { color: '#065f46' },
  date: {
    fontSize: 12,
    color: '#9ca3af',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 30,
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 16,
  },
  descLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 12,
  },
  btnDone: { backgroundColor: '#10b981' },
  btnPending: { backgroundColor: '#f59e0b' },
  actionBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingVertical: 14,
    backgroundColor: '#fee2e2',
  },
  deleteBtnText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '700',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    color: '#6b7280',
    fontSize: 16,
  },
});