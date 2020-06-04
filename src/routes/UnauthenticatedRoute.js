import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Home from '../pages/HomePage'
import Login from '../pages/LoginPage'
import Signup from '../pages/Signup'

function UnauthenticatedRoute() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
			</Switch>
		</Router>
	)
}

export default UnauthenticatedRoute
