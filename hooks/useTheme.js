import {useEffect, useState} from 'react';

export default function useTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  function switchTheme() {
    setIsDarkTheme(curr => !curr);
  }

  function getSystemPreference() {
    const mediaQuery = "(prefers-color-scheme: dark)";
    const mql = window.matchMedia(mediaQuery);
    const hasPreference = typeof mql.matches === "boolean";
    if (hasPreference) {
      return mql.matches ? "dark" : "light";
    }
  }

  function getUserPreference() {
    return localStorage.getItem('pop-central-theme');
  }
  function setUserPreference(theme) {
    localStorage.setItem('pop-central-theme', theme);
  }

  useEffect(function getThemeOnStartup() {
    const userPreference = getUserPreference();
    if (userPreference) {
      setIsDarkTheme(userPreference === 'dark');
    } else {
      console.log('getting system pref')
      const systemPreference = getSystemPreference();
      setIsDarkTheme(systemPreference === 'dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkTheme === undefined) return;
    if (isDarkTheme) {
      setUserPreference('dark');
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setUserPreference('light');
      document.documentElement.removeAttribute("data-theme");
    }
  }, [isDarkTheme]);

  const theme = isDarkTheme ? 'dark' : 'light'
  return [theme, switchTheme];
}
