import {ThemeProvider as EmotionThemeProvider} from '@emotion/react'
import {createContext, useContext, useState} from 'react'
import colors from 'styled-components/colors'

const currentThemeContext = createContext();

export function ThemeProvider({children}) {

  const [currentTheme, setCurrentTheme] = useState('dark');

  function toggleCurrentTheme() {
    setCurrentTheme(currentTheme => currentTheme === 'dark' ? 'light' : 'dark');
  }

  const isDarkTheme = currentTheme === 'dark';

  const darkColors = {
    backgroundColor: colors.black,
    primary: colors.white,
    secondary: colors.pink
  }

  const lightColors = {
    backgroundColor: colors.white,
    primary: colors.black,
    secondary: colors.darkOrange
  }

  const theme = {
    colors: isDarkTheme ? lightColors : darkColors,
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

