import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAdvice } from '../hooks/useAdvice';

export default function TipCard() {
  const { advice, loading, error, refresh } = useAdvice();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="bulb-outline" size={14} color="#4f46e5" />
        <Text style={styles.label}>Tip of the Day</Text>
      </View>

      {loading && <ActivityIndicator size="small" color="#4f46e5" />}

      {error && !loading && (
        <TouchableOpacity onPress={refresh} style={styles.retryRow}>
          <Ionicons name="refresh-outline" size={14} color="#ef4444" />
          <Text style={styles.error}>Could not load tip. Tap to retry.</Text>
        </TouchableOpacity>
      )}

      {!loading && !error && advice && (
        <Text style={styles.advice}>"{advice}"</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 4,
    minHeight: 64,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4f46e5',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  advice: {
    fontSize: 13,
    color: '#4338ca',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  retryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  error: {
    fontSize: 13,
    color: '#ef4444',
  },
});