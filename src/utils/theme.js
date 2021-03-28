import React from "react";
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle
} from "styled-components";
import "normalize.css";
import "typeface-montserrat";

import colorScheme from "./colorScheme";

const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		font-size: 10px;
	}

	body {
		font-family: 'Montserrat', sans-serif;
		background: ${({theme}) => theme.background};
	}
`;

function ThemeProvider({children}) {
  return (
    <StyledThemeProvider theme={colorScheme}>{children}</StyledThemeProvider>
  );
}

export {GlobalStyle, ThemeProvider};
