import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { chatWithGemini, chatWithGeminiMultiModal } from '../services/ChatService'; // Adjust the import path as necessary
import * as FileSystem from 'expo-file-system';
import Markdown from 'react-native-markdown-display';


const HomeScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef();
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    requestPermissionsAsync();
  }, []);

  const requestPermissionsAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: imagePickerStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus !== 'granted' || imagePickerStatus !== 'granted') {
        Alert.alert('Permission needed', 'Camera and photo library access is required to use these features.');
      }
    }
  };

  const handleImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "An error occurred while picking the image.");
    }
    if (!result.cancelled) {
      setImageUri(result.uri);
      setMessage('Explain this image'); // Set default text when an image is selected
    }
  };

  const handleCamera = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 0.5,
        base64: true,
      });

      if (!result.cancelled) {
        setImageUri(result.uri);
      }
    } catch (error) {
      console.error("Error capturing image:", error);
      Alert.alert("Error", "An error occurred while capturing the image.");
    }
    if (!result.cancelled) {
      setImageUri(result.uri);
      setMessage('Explain this image'); // Set default text when an image is captured
    }
  };

  const handleSendMessage = async () => {
    // Check if neither a message nor an image has been provided.
    if (!message.trim() && !imageUri) {
      Alert.alert("Error", "Please enter a message or select an image.");
      return;
    }
  
    setIsLoading(true);
  
    // Create a message object for the message list.
    // If an image is selected but no custom message is provided, use the default message.
    const newMessage = {
      text: message.trim() || (imageUri ? 'Explain this image' : ''),
      isUser: true,
      timestamp: new Date().toISOString(),
      imageUri: imageUri,
    };
    
    // Add the new message to the messages list.
    setMessages(messages => [...messages, newMessage]);
  
    try {
      // If an image is included, prepare it for sending.
      // You might need to adjust this logic based on how your chatWithGemini or chatWithGeminiMultiModal functions expect the image data.
      let responseText = '';
      if (imageUri) {
        const base64Data = await FileSystem.readAsStringAsync(imageUri, { encoding: FileSystem.EncodingType.Base64 });
        
        // Assuming chatWithGeminiMultiModal can handle both text and base64 encoded image.
        // Adjust this call based on your actual API/service requirements.
        responseText = await chatWithGeminiMultiModal(message.trim() || 'Explain this image', base64Data);
      } else {
        // No image, just send the text message.
        responseText = await chatWithGemini(message.trim());
      }
  
      // Handle the bot's response.
      // This example just adds the response as a new message from the bot.
      // Adjust based on the actual response format and requirements.
      const botMessage = {
        text: responseText,
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      
      // Add the bot's message to the messages list.
      setMessages(messages => [...messages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error", "Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
      setMessage(''); // Clear the message input.
      setImageUri(null); // Clear the selected/captured image URI.
      scrollViewRef.current?.scrollToEnd({ animated: true }); // Scroll to the bottom of the message list.
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.messagesList}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <View key={index} style={[styles.message, msg.isUser ? styles.userMessage : styles.botMessage]}>
            {msg.isUser ? (
              <>
                <Text style={[styles.messageText, styles.userMessageText]}>
                  {msg.text}
                </Text>
                {msg.imageUri && <Image source={{ uri: msg.imageUri }} style={styles.previewImage} />}
              </>
            ) : (
              // Render Markdown for bot messages
              <Markdown style={{ body: [styles.messageText, styles.botMessageText] }}>
                {msg.text}
              </Markdown>
            )}
          </View>
        ))}
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      </ScrollView>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          multiline
        />
        <TouchableOpacity onPress={handleImagePicker} style={styles.iconButton}>
          <MaterialCommunityIcons name="image" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCamera} style={styles.iconButton}>
          <MaterialCommunityIcons name="camera" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSendMessage} style={styles.iconButton}>
          <MaterialCommunityIcons name="send" size={24} color="blue" />
        </TouchableOpacity>
      </View>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.fullPreviewImage} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5', // Added a background color for better UI
  },
  messagesList: {
    flex: 1,
  },
  message: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    borderRadius: 20, // Added border radius
    backgroundColor: '#ffffff', // Added background color
    shadowColor: '#000', // Added shadow for elevation effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageText: {
    fontSize: 16,
    marginRight: 10,
  },
  inputArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff', // Input area background color
    borderRadius: 20, // Rounded corners for input area
    padding: 5, // Padding for input area
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20, // Rounded corners for text input
    padding: 10,
    backgroundColor: '#f0f0f0', // Changed input background for better contrast
  },
  iconButton: {
    marginLeft: 4,
    padding: 8, // Increased padding for larger touchable area
    borderRadius: 20, // Rounded corners for buttons
    backgroundColor: '#e0e0e0', // Button background color for better UI
  },
  previewImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  fullPreviewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    marginTop: 10, // Added margin top for spacing
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6', // Different color for user messages
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0', // Different color for bot messages
  },
  userMessageText: {},
  botMessageText: {},
});

export default HomeScreen;
