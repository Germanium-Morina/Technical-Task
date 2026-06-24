import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export type FilterType = 'all' | 'pending' | 'completed';

const TABS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
];

interface Props {
  active: FilterType;
  onChange: (filter: FilterType) => void;
}

export default function FilterTabs({ active, onChange }: Props) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.value}
          style={[styles.tab, active === tab.value && styles.tabActive]}
          onPress={() => onChange(tab.value)}
          activeOpacity={0.7}
        >
          <Text style={[styles.label, active === tab.value && styles.labelActive]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  tabActive: {
    backgroundColor: '#4f46e5',
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6b7280',
  },
  labelActive: {
    color: '#fff',
  },
});