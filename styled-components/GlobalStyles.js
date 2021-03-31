import {Global, useTheme} from '@emotion/react';

export default function GlobalStyles() {
  const theme = useTheme();
  return (
    <Global
      styles={{
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },
        'html, body': {
          backgroundColor: theme.colors.backgroundColor,
          color: theme.colors.primary,
          transition: `background-color ease-in-out 0.3s, color ease-in-out 0.3s`,
          fontSize: theme.typography.baseFontSize
        },
        h1: {
          fontSize: '4.5rem'
        },
        h2: {
          fontSize: '4rem'
        },
        h3: {
          fontSize: '3.5rem'
        },
        h4: {
          fontSize: '3rem'
        },
        h5: {
          fontSize: '2.5rem'
        },
        h6: {
          fontSize: '2rem'
        },
        p: {
          fontSize: '2rem'
        },
        small: {
          fontSize: '1.5rem'
        }
      }}
    />
  )
}
