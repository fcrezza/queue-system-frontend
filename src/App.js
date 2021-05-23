import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import NotFound from "./pages/notfound";
import Home from "./pages/home";
import {AuthenticatedRoute, UnAuthenticatedRoute} from "./components/Routes";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <UnAuthenticatedRoute>
            <Landing />
          </UnAuthenticatedRoute>
        </Route>
        <Route exact path="/login">
          <UnAuthenticatedRoute>
            <Login />
          </UnAuthenticatedRoute>
        </Route>
        <Route path="/signup">
          <UnAuthenticatedRoute>
            <Signup />
          </UnAuthenticatedRoute>
        </Route>
        <Route path="/home">
          <AuthenticatedRoute>
            <Home />
          </AuthenticatedRoute>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
