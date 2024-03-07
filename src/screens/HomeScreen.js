import React, { useState, useRef, useEffect } from 'react';
import {
  View, ScrollView, Text, TextInput, TouchableOpacity,
  Image, StyleSheet, ActivityIndicator, Alert, Platform
} from 'react-native';
import { useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const { colors } = useTheme();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        const { status: imagePickerStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (cameraStatus !== 'granted' || imagePickerStatus !== 'granted') {
          Alert.alert('Permission needed', 'Camera and photo library access is required to use these features.');
        }
      }
    })();
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    const newMessage = { text: message.trim(), isUser: true, timestamp: new Date() };
    setMessages([...messages, newMessage]);
    mockBotResponse(message.trim());
    setMessage('');
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const mockBotResponse = (userMessage) => {
    setIsLoading(true);
    setTimeout(() => {
      const botMessage = { text: `Your reply is: ${userMessage}`, isUser: false, timestamp: new Date() };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsLoading(false);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 2000);
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handleCamera = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    if (!granted) {
      Alert.alert("Permission Required", "Camera access is needed to take photos.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesList}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <View key={index} style={[styles.message, msg.isUser ? styles.userMessage : styles.botMessage, msg.isUser ? {backgroundColor: colors.primary} : {backgroundColor: colors.surface}]}>
            <Text style={[styles.messageText, {color: colors.onSurface}]}>
              {msg.text}
            </Text>
          </View>
        ))}
        {isLoading && <ActivityIndicator size="large" color={colors.primary} />}
        {imageUri && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          </View>
        )}
      </ScrollView>
      <View style={styles.inputArea}>
        <TextInput
          style={[styles.input, {color: colors.text, backgroundColor: colors.background}]}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          placeholderTextColor="#121111"
        />
        <TouchableOpacity onPress={handleImagePicker} style={styles.button}>
          <MaterialCommunityIcons name="image" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCamera} style={styles.button}>
          <MaterialCommunityIcons name="camera" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendMessage} style={styles.button}>
          <MaterialCommunityIcons name="send" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Your existing styles
  // Add styles for previewContainer and previewImage if not already defined
  previewContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  previewImage: {
    width: 250, // Adjust size as needed
    height: 250,
    resizeMode: 'contain',
    borderRadius: 20, // Optional: if you want rounded corners
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesList: {
    flex: 1,
  },
  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
    maxWidth: '75%',
    alignSelf: 'flex-end',
  },
  userMessage: {
    marginLeft: '25%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    marginRight: '25%',
  },
  messageText: {
    fontSize: 16,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    padding: 8,
  },
  previewContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  previewText: {
    fontSize: 16,
    marginBottom: 10,
  },
  previewImage: {
    width: 200, // Adjust size as needed
    height: 200,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
