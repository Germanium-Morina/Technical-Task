import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  filtered?: boolean;
}

export default function EmptyState({ filtered = false }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons
        name={filtered ? 'search-outline' : 'clipboard-outline'}
        size={56}
        color="#d1d5db"
        style={styles.icon}
      />
      <Text style={styles.title}>
        {filtered ? 'No results found' : 'No tasks yet'}
      </Text>
      <Text style={styles.subtitle}>
        {filtered ? 'Try a different search or filter' : 'Tap + to add your first task'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});