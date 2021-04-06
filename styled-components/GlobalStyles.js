import {Global, css} from '@emotion/react'

export default function GlobalStyles() {
  return (
    <Global styles={
      css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :root {
          font-size: 10px;
          /* Colors */
          --primary: #41403e;
          --secondary: #0071de;
          --success: #86a361;
          --warning: #ddcd45;
          --danger: #a7342d;
          --muted: #868e96;
          --primary-light: #c1c0bd;
          --secondary-light: #deefff;
          --success-light: #d0dbc2;
          --warning-light: #f5f0c6;
          --danger-light: #f0cbc9;
          --muted-light: #e6e7e9;
          --primary-dark: black;
          --secondary-dark: black;
          --success-dark: #374427;
          --warning-dark: #746a15;
          --danger-dark: black;
          --muted-dark: #313538;
          --primary-inverse: #fff;
          --brand: #fc0976;
          /* Colors Usage */
          --primary-text: var(--primary);
          --secondary-text: var(--secondary);
          --success-text: var(--success);
          --warning-text: var(--warning);
          --danger-text: var(--danger);
          --muted-text: var(--muted);
          --primary-background: #fff;
          --secondary-background: #eee;
          --primary-link: var(--brand);
          --button-background: var(--brand);
          --button-text-color: #fff;
          --border-color: var(--primary-dark);
          --shadow-color-regular: rgba(0, 0, 0, 0.2);
          --shadow-color-hover: rgba(0, 0, 0, 0.3);
          --outline-color: var(--secondary);
          /* Containers */
          --content-width: 130rem;
          /* Typography */ 
          --h1: 6.4rem;
          --h2: 4.8rem;
          --h3: 3.2rem;
          --h4: 2.4rem;
          --h5: 1.6rem;
          --h6: 1.28rem;
          --p: 1.8rem;
          --small: 1.28rem;
        }

        [data-theme="dark"] {
          --primary: #fff;
          --secondary: #0071de;
          --success: #189418;
          --warning: #ddcd45;
          --danger: #ff8c86;
          --muted: #868e96;
          --primary-light: white;
          --secondary-light: #007ef8;
          --success-light: #1caa1c;
          --warning-light: #e1d35b;
          --danger-light: #ffa4a0;
          --muted-light: #949ba2;
          --primary-dark: #373737;
          --secondary-dark: black;
          --success-dark: #031003;
          --warning-dark: #746a15;
          --danger-dark: #a00800;
          --muted-dark: #313538;
          --primary-background: #181818;
          --secondary-background: #333;
          --primary-inverse: #41403e;
        }

        body {
          color: var(--primary-text);
          background-color: var(--primary-background);
          transition: background-color 235ms ease-out, color 235ms ease-out;
          font-family: 'Roboto', sans-serif;
        }

        h1 {
          font-size: 6.4rem;
        }

        h2 {
          font-size: 4.8rem;
        }

        h3 {
          font-size: 3.2rem;
        }

        h4 {
          font-size: 2.4rem;
        }

        h5 {
          font-size: 1.6rem;
        }

        h6 {
          font-size: 1.28rem;
        }

        p {
          font-size: 1.8rem;
        }

        small {
          font-size: 1.28rem;
          color: var(--muted-text);
        }

        a {
          font-size: 1.8rem;
        }

        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
      `
    } />
  )
}
