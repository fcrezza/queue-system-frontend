import React, {createContext, useContext, useEffect, useState} from "react";
import useSWR from "swr";
import Spinner from "../components/Spinner";
import useAsyncError from "../hooks/useAsyncError";
import axios from "../libs/axios";

const AuthContext = createContext();

function AuthProvider({children}) {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const {data: user, isValidating, mutate, error} = useSWR("/user");
  const setAsyncError = useAsyncError();

  useEffect(() => {
    if (error) {
      setAsyncError(error);
    }
  }, [error, setAsyncError]);

  useEffect(() => {
    if (!isValidating && typeof user === "object") {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isValidating, user]);

  const login = async inputData => {
    setLoadingMessage("Login ...");
    await axios.post("/login", inputData);
    await mutate();
  };

  const logout = async () => {
    setLoading(true);
    setLoadingMessage("Logout ...");
    await axios.get("/logout");
    await mutate(null, false);
  };

  const signup = async data => {
    setLoadingMessage("Signup ...");
    await axios.post("/signup", data);
    await mutate();
  };

  if (loading) {
    return <Spinner>{loadingMessage}</Spinner>;
  }

  return (
    <AuthContext.Provider value={{user, logout, login, signup}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export {AuthProvider, useAuth};
