import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import {useAuth} from "./context/AuthContext";
import {SocketProvider} from "./context/SocketContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/Dashboard/Student";
import ProfessorDashboard from "./pages/Dashboard/Professor";

function App() {
  const {user} = useAuth();

  return (
    <BrowserRouter>
      <Switch>
        {user ? (
          <AuthenticatedRoute role={user.role} />
        ) : (
          <UnAuthenticatedRoute />
        )}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

function AuthenticatedRoute({role}) {
  const dashboard = role === "student" ? StudentDashboard : ProfessorDashboard;

  return (
    <SocketProvider>
      <Route exact path="/" component={dashboard} />
    </SocketProvider>
  );
}

function UnAuthenticatedRoute() {
  return (
    <>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </>
  );
}

export default App;
