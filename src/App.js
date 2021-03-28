import React from "react";
import {useAuth} from "./context/AuthContext";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./routes/UnauthenticatedRoute";

function App() {
  const {user} = useAuth();
  return user ? <AuthenticatedRoute /> : <UnauthenticatedRoute />;
}

export default App;
