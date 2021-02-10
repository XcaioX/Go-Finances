import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    font-size: 60%
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
  }

  ul { list-style: none }
  a { text-decoration: none }

  body, input, button {
    border: 0;
    background: none;
    font-family: Roboto, -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
    color: var(--black);
  }

  body {
    background: ${props => props.theme.colors.primary};
    font-size: 1rem
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%
    }
  }
`
