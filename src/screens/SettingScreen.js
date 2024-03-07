import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Avatar, Button, useTheme } from 'react-native-paper';
import { useThemeContext } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { theme } = useThemeContext();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.profileSection}>
        <Avatar.Image
          source={require('../../assets/bgRannaGhor.jpg')}
          size={100}
          style={{ backgroundColor: colors.surface }}
        />
        <View style={styles.userInfo}>
          <Text style={[styles.username, { color: colors.text }]}>John Doe</Text>
          <Text style={[styles.email, { color: colors.text }]}>john.doe@example.com</Text>
        </View>
      </View>
      <View style={styles.subscribeSection}>
        <Text style={[styles.subscribeText, { color: colors.text }]}>Subscribe to our newsletter:</Text>
        <TouchableOpacity onPress={() => console.log('Subscribe button pressed')}>
          <Button mode="contained" style={styles.subscribeButton} color={theme.colors.primary}>
            Subscribe
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    marginTop: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  subscribeSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  subscribeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default SettingsScreen;
