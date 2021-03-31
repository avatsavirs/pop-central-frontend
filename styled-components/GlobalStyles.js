import {Global} from '@emotion/react';

export default function GlobalStyles() {
  return (
    <Global
      styles={{
        "*": {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },
        body: {
          minHeight: '100vh',
          backgroundColor: 'yellow'
        }
      }}
    />
  )
}
