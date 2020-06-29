import React from 'react'
import ReactDOM from 'react-dom'
import {createGlobalStyle} from 'styled-components'
import 'typeface-montserrat'
import App from './App'
import ContextProvider from './context'
import * as serviceWorker from './serviceWorker'

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
		background: #fff;
	}
`

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
