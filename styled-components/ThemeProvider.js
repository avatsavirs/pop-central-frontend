import {ThemeProvider as EmotionThemeProvider} from '@emotion/react'
import {createContext, useContext, useState} from 'react'

const currentThemeContext = createContext();

export function ThemeProvider({children}) {

  const [currentTheme, setCurrentTheme] = useState('dark');

  function toggleCurrentTheme() {
    setCurrentTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark');
  }

  const isDarkTheme = currentTheme === 'dark';

  const colors = {
    grey: '#264653',
    green: '#2A9D8F',
    yellow: '#E9C46A',
    orange: '#F4A261',
    darkOrange: '#E76F51',
    red: '#e63946',
    white: '#f1faee',
    black: '#011627'
  }

  const darkColors = {
    backgroundColor: colors.grey,
    primary: colors.white,
    secondary: colors.yellow
  }

  const lightColors = {
    backgroundColor: colors.white,
    primary: colors.black,
    secondary: colors.yellow
  }

  let themeColors = colors;
  if (isDarkTheme) {
    themeColors = {...themeColors, ...darkColors}
  } else {
    themeColors = {...themeColors, ...lightColors}
  }

  const theme = {
    colors: {
      ...colors,
      ...themeColors
    },
    typography: {
      headingWeight: 400,
      bodyWeight: 400,
      baseFontSize: '10px',
    }
  }

  return (
    <EmotionThemeProvider theme={theme}>
      <currentThemeContext.Provider value={[currentTheme, toggleCurrentTheme]}>
        {children}
      </currentThemeContext.Provider>
    </EmotionThemeProvider>
  )
}

export function useCurrentTheme() {
  const context = useContext(currentThemeContext);
  if (!context) {
    throw new Error('use useCurrentTheme inside ThemeProvider')
  }
  return context;
}

