import React, {createContext, useContext} from "react";
import {useErrorHandler} from "react-error-boundary";
import useSWR from "swr";

import axios from "./axios";

const AuthContext = createContext();

function AuthProvider({children}) {
  const {data: user, mutate, error} = useSWR("/api/auth/user");
  useErrorHandler(error);

  const login = async inputData => {
    const {role, ...input} = inputData;

    if (role === "student") {
      const {data} = await axios.post("/api/auth/login/student", input);
      await mutate(data, false);
      return;
    }

    const {data} = await axios.post("/api/auth/login/professor", input);
    await mutate(data, false);
  };

  const signup = async inputData => {
    const {role, ...input} = inputData;

    if (inputData.role === "student") {
      const {data} = await axios.post("/api/auth/signup/student", input);
      await mutate(data, false);
      return;
    }

    const {data} = await axios.post("/api/auth/signup/professor", input);
    await mutate(data, false);
  };

  const logout = async () => {
    await axios.delete("/api/auth/logout");
    await mutate(null, false);
  };

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
