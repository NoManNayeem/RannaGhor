import React, { createContext, useContext, useState } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const CustomLightTheme = {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#f97827', // Main color for the light theme
      accent: '#03DAC5', // Mint green for a refreshing look
      primaryContainer: '#FFE0B2', // Soft orange for container backgrounds, complementing the primary color
    },
  };
  
  const CustomDarkTheme = {
    ...MD3DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#f97827', // Keeping the main color consistent in the dark theme
      accent: '#03DAC5', // Mint green for consistency
      background: '#121212', // Retain dark background for depth
      surface: '#242424', // Slightly lighter dark surface for subtle contrast
      primaryContainer: '#333333', // Dark container backgrounds for depth, ensuring text stands out
      text: '#FFFFFF', // Ensuring text is light for readability
      onPrimary: '#000000', // Dark text on primary color for contrast
      onSurface: '#FFFFFF', // Light text on dark surfaces
    },
  };
  
  

const ThemeContext = createContext({
  theme: CustomLightTheme, // Default to light theme
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(CustomLightTheme); // Start with light theme

  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === CustomLightTheme ? CustomDarkTheme : CustomLightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
