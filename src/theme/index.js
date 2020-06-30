import React from 'react'
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components'
import colorScheme from './colorScheme'
import 'typeface-montserrat'

const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		font-size: 10px;
		font-family: 'Montserrat', sans-serif;
		box-sizing: border-box;
	}

	body {
		margin: 0;
		line-height: 1.5;
		background: ${({theme}) => theme.background};
	}
`

function ThemeProvider({children}) {
  return (
    <StyledThemeProvider theme={colorScheme}>{children}</StyledThemeProvider>
  )
}

export {GlobalStyle, ThemeProvider}
