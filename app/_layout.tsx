import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { initDatabase } from '../config/database';

export default function Layout() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563EB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Data Collector TK3',
        }}
      />
      <Stack.Screen
        name="detail/[id]"
        options={{
          title: 'Person Details',
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: 'Add New Person',
        }}
      />
    </Stack>
  );
}