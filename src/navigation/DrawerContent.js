import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Drawer, Text, Caption, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeContext } from '../context/ThemeContext';

const DrawerContent = (props) => {
  const { theme, toggleTheme } = useThemeContext(); // Leverage your custom theme context
  const { colors } = theme;
  const isDarkTheme = theme.dark;

  return (
    <DrawerContentScrollView {...props}>
      <View style={[styles.drawerContent, { backgroundColor: colors.surface }]}>
        <View style={[styles.userInfoSection, { backgroundColor: colors.primary }]}>
          <Avatar.Image 
            source={require('../../assets/bgRannaGhor.jpg')}
            size={100}
            style={{ backgroundColor: colors.background }}
          />
          <Title style={{ color: colors.onPrimary }}>NoMan Nayeem</Title>
          <Caption style={{ color: colors.onPrimary }}>@nomannayeem</Caption>
        </View>

        {/* Drawer Items */}
        <Drawer.Section style={styles.drawerSection}>
          {/* Home */}
          <DrawerItem
            icon={({ color, size }) => <Icon name="home-outline" color={colors.primary} size={size} />}
            label="Home"
            labelStyle={{ color: colors.text }}
            onPress={() => props.navigation.navigate('Home')}
          />
          {/* Recipes */}
          <DrawerItem
            icon={({ color, size }) => <Icon name="book-outline" color={colors.primary} size={size} />}
            label="Recipes"
            labelStyle={{ color: colors.text }}
            onPress={() => props.navigation.navigate('Recipes')}
          />
          {/* Settings */}
          <DrawerItem
            icon={({ color, size }) => <Icon name="account-settings-outline" color={colors.primary} size={size} />}
            label="Settings"
            labelStyle={{ color: colors.text }}
            onPress={() => props.navigation.navigate('Settings')}
          />
        </Drawer.Section>

        {/* Dark Theme Toggle */}
        <Drawer.Section title="Preferences" style={{ borderTopColor: colors.divider, borderTopWidth: 1 }}>
          <View style={styles.preference}>
            <Text style={{ color: colors.text }}>Dark Theme</Text>
            <Switch value={isDarkTheme} onValueChange={toggleTheme} />
          </View>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
