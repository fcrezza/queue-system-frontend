import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ContextProvider from './context'
import {GlobalStyle, ThemeProvider} from './theme/index'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <ContextProvider>
        <App />
      </ContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

serviceWorker.unregister()
