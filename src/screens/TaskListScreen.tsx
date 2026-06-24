import React, { useState, useMemo, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types/Task';
import TaskItem from '../components/TaskItem';
import TipCard from '../components/TipCard';
import SearchBar from '../components/SearchBar';
import FilterTabs, { FilterType } from '../components/FilterTabs';
import EmptyState from '../components/EmptyState';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskList'>;

export default function TaskListScreen({ navigation }: Props) {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTasks = useMemo(() => {
    const q = search.toLowerCase().trim();
    return tasks.filter((t) => {
      const matchesSearch = q === '' || t.title.toLowerCase().includes(q);
      const matchesFilter = filter === 'all' || t.status === filter;
      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  const handlePress = useCallback(
    (task: Task) => navigation.navigate('TaskDetail', { taskId: task.id }),
    [navigation]
  );

  const isFiltered = search.trim() !== '' || filter !== 'all';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

      <View style={styles.header}>
        <Text style={styles.heading}>My Tasks</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddTask')}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onPress={handlePress}
          />
        )}
        ListHeaderComponent={
          <View>
            <TipCard />
            <View style={styles.listHeader}>
              <SearchBar value={search} onChangeText={setSearch} />
              <FilterTabs active={filter} onChange={setFilter} />
            </View>
          </View>
        }
        ListEmptyComponent={<EmptyState filtered={isFiltered} />}
        contentContainerStyle={
          filteredTasks.length === 0 ? styles.emptyContent : styles.listContent
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4f46e5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listHeader: {
    paddingTop: 12,
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
});
