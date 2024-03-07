import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { ThemeProvider, useThemeContext } from './src/context/ThemeContext';

// Create a new component that consumes the theme and renders PaperProvider and NavigationContainer
const MainContent = () => {
  const { theme } = useThemeContext(); // Use the custom hook to get the current theme
  
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <MainContent /> 
    </ThemeProvider>
  );
};

export default App;
