import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

body {
  margin: 0;
  background-color: #fff;
  font-family: Nunito, sans-serif;
  font-size: 16px;
  color: #000;
}

img {
  max-width: 100%;
  height: auto;
}

input, button {
  font-family: inherit;
  }

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}


button {
  cursor: pointer;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    display: none; 
    -webkit-appearance: none;
    margin: 0; 
}
    input[type='number'] {
      -moz-appearance: textfield;
  }
`;
