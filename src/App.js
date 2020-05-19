import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'
import 'typeface-montserrat'

import homepage from './pages/homepage'

const GlobalStyle = createGlobalStyle`
	*,
	*::before,
	*::after {
		font-size: 10px;
		font-family: "Montserrat", sans-serif;
		box-sizing: border-box;
	}

	body {
		margin: 0;
		line-height: 1.5;
		background: #f9f9f9;
	}
`

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={homepage} />
        </Switch>
      </Router>
    </>
  )
}

export default App
