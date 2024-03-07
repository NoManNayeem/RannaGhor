import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, TouchableHighlight } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Dummy data with Bengali titles and English translations
const dummyFeaturedRecipes = [
  { id: 1, title: 'স্প্যাঘেটি কার্বোনারা', translatedTitle: 'Spaghetti Carbonara', category: 'Italian', image: 'https://via.placeholder.com/300', description: 'স্প্যাঘেটি কার্বোনারা একটি ইতালীয় রেসিপি। এটি পাস্তা, পার্মেজান চিজ, ডিম, পাঁচ পিঁয়াজ, গারলিক, অরিগানো, মুষলি, লম্বা মাখা বা প্যাঞ্জা মুষলি এবং মাংসের বাতির সাথে তৈরি হয়।' },
  { id: 2, title: 'চিকেন টিক্কা মাসালা', translatedTitle: 'Chicken Tikka Masala', category: 'Indian', image: 'https://via.placeholder.com/300', description: 'চিকেন টিক্কা মাসালা একটি ভারতীয় রেসিপি।' },
  { id: 3, title: 'সুশি রোল', translatedTitle: 'Sushi Rolls', category: 'Japanese', image: 'https://via.placeholder.com/300', description: 'সুশি রোল একটি জাপানিজ রেসিপি।' },
  { id: 4, title: 'তাকা রেসিপি', translatedTitle: 'Taco Recipe', category: 'Mexican', image: 'https://via.placeholder.com/300', description: 'তাকা রেসিপি একটি মেক্সিকান রেসিপি।' },
  { id: 5, title: 'পানি পুড়ি', translatedTitle: 'Pani Puri', category: 'Indian', image: 'https://via.placeholder.com/300', description: 'পানি পুড়ি একটি ভারতীয় রেসিপি।' },
  { id: 6, title: 'পিজ্জা', translatedTitle: 'Pizza', category: 'Italian', image: 'https://via.placeholder.com/300', description: 'পিজ্জা একটি ইতালীয় রেসিপি।' },
];

// Additional recipe categories
const dummyRecipeCategories = ['Italian', 'Indian', 'Japanese', 'Mexican', 'Mediterranean', 'Chinese', 'Thai', 'American'];


// Dummy data for quotes on food
const dummyFoodQuotes = [
  'Lets eat, then talk! - NoMan Nayeem',
  'Food is symbolic of love when words are inadequate. - Alan D. Wolfelt',
  'One cannot think well, love well, sleep well, if one has not dined well. - Virginia Woolf',
  'The only thing I like better than talking about food is eating. - John Walters',
  'Laughter is brightest in the place where the food is. - Irish Proverb',
  'Good food is the foundation of genuine happiness. - Auguste Escoffier',
];

export default function RecipesScreen({ navigation }) {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const openRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeRecipeDetails = () => {
    setModalVisible(false);
  };

  const renderFeaturedRecipes = () => {
    return dummyFeaturedRecipes.map(recipe => (
      <TouchableOpacity key={recipe.id} style={styles.featuredRecipeItem} onPress={() => openRecipeDetails(recipe)}>
        <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
        <Text style={[styles.recipeTitle,]}>{recipe.title}</Text>
        <Text style={[styles.recipeCategory,]}>{recipe.category}</Text>
      </TouchableOpacity>
    ));
  };

  const renderRecipeCategories = () => {
    return dummyRecipeCategories.map(category => (
      <TouchableOpacity key={category} style={styles.categoryItem}>
        <Text style={[styles.categoryText,]}>{category}</Text>
      </TouchableOpacity>
    ));
  };

  const renderFoodQuotes = () => {
    return dummyFoodQuotes.map((quote, index) => (
      <View key={index} style={styles.quoteItem}>
        <Text style={[styles.quoteText,]}>{quote}</Text>
      </View>
    ));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeRecipeDetails}
      >
        <View style={styles.modalContainer}>
          <Image source={{ uri: selectedRecipe?.image }} style={styles.modalImage} />
          <Text style={styles.modalTitle}>{selectedRecipe?.translatedTitle}</Text>
          <ScrollView style={styles.modalDescriptionContainer}>
            <Text style={styles.modalDescription}>{selectedRecipe?.description}</Text>
          </ScrollView>
          <TouchableHighlight onPress={closeRecipeDetails}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableHighlight>
        </View>
      </Modal>

      <Text style={[styles.title, { color: colors.primary }]}>রান্নাঘরে আপনাকে স্বাগতম</Text>
      <ScrollView style={styles.sliderContainer} horizontal pagingEnabled>
        {renderFeaturedRecipes()}
      </ScrollView>

      <View style={styles.section}>
        <Text style={[styles.subtitle, { color: colors.primary }]}>Recipe Categories</Text>
        <View style={styles.categoriesContainer}>{renderRecipeCategories()}</View>
      </View>

      <ScrollView style={styles.quoteContainer} horizontal pagingEnabled>
        {renderFoodQuotes()}
      </ScrollView>

      <Button
        mode="contained"
        onPress={() => console.log('Pressed')}
        style={[styles.button, { backgroundColor: colors.accent }]}
        labelStyle={{ color: colors.background }}
      >
        Explore All Recipes
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sliderContainer: {
    maxHeight: 200,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  featuredRecipeItem: {
    width: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  recipeImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333', // Updated to a darker color for better visibility
  },
  recipeCategory: {
    fontSize: 12,
    color: '#666', // Updated to a darker color for better visibility
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
  },
  button: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescriptionContainer: {
    maxHeight: 200,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    marginTop: 20,
  },
  quoteContainer: {
    maxHeight: 100,
    marginBottom: 20,
  },
  quoteItem: {
    width: 300,
    backgroundColor: '#f97827',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333', // Updated to a darker color for better visibility
  },
});
