import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Link } from 'expo-router';
import React from 'react';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>

      <Link href='/'>
        <Pressable>
          <Text>Go to details {process.env.EXPO_PUBLIC_API_URL}</Text>
        </Pressable>
      </Link>
      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
});
