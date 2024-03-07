import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer, Text, Switch, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const DrawerContent = (props) => {
  const theme = useTheme();
  const { colors } = theme;
  

  return (
    <DrawerContentScrollView {...props}>
      <View style={[styles.drawerContent, {backgroundColor: colors.surface}]}>
        <View style={[styles.userInfoSection, {backgroundColor: colors.primary}]}>
          <Avatar.Image 
            source={require('../../assets/bgRannaGhor.jpg')}
            size={100}
            style={{backgroundColor: colors.background}}
          />
          <Title style={[styles.title, {color: colors.onPrimary}]}>NoMan Nayeem</Title>
          <Caption style={[styles.caption, {color: colors.onPrimary}]}>@nomannayeem</Caption>
        </View>

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem 
            icon={({color, size}) => (
              <Icon name="home-outline" color={colors.primary} size={size} />
            )}
            label="Home"
            labelStyle={{color: colors.text}}
            onPress={() => {props.navigation.navigate('Home')}}
          />
          <DrawerItem 
            icon={({color, size}) => (
              <Icon name="book-outline" color={colors.primary} size={size} />
            )}
            label="Recipes"
            labelStyle={{color: colors.text}}
            onPress={() => {props.navigation.navigate('Recipes')}}
          />
          {/* Example of additional DrawerItem */}
          <DrawerItem 
            icon={({color, size}) => (
              <Icon name="account-settings-outline" color={colors.primary} size={size} />
            )}
            label="Settings"
            labelStyle={{color: colors.text}}
            onPress={() => {props.navigation.navigate('Settings')}}
          />
        </Drawer.Section>

        {/* Add a toggle for Dark Mode or other settings */}
        <Drawer.Section title="Preferences" style={{borderTopColor: colors.divider, borderTopWidth: 1}}>
          <TouchableOpacity onPress={() => { /* Toggle dark mode or other preference */ }}>
            <View style={styles.preference}>
              <Text style={{color: colors.text}}>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={false} /* Dynamically change this value based on theme */ />
              </View>
            </View>
          </TouchableOpacity>
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
    title: {
      marginTop: 20,
      fontWeight: 'bold',
      fontSize: 20,
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      marginTop: 5,
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