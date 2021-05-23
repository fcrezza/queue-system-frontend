import React from "react";
import {useHistory} from "react-router-dom";

import {useAuth} from "../utils/auth";
import Spinner from "./Spinner";

function checkAuth(user) {
  return typeof user === "object" ? Object.keys(user).length > 0 : false;
}

export function AuthenticatedRoute({children}) {
  const history = useHistory();
  const {user} = useAuth();
  const isAuth = checkAuth(user);

  React.useEffect(() => {
    if (!isAuth && typeof user === "object") {
      history.replace("/login");
    }
  }, [history, isAuth, user]);

  if (typeof user !== "object") {
    return <Spinner>Memuat halaman...</Spinner>;
  }

  if (typeof user === "object" && !isAuth) {
    return null;
  }

  return children;
}

export function UnAuthenticatedRoute({children}) {
  const history = useHistory();
  const {user} = useAuth();
  const isAuth = checkAuth(user);

  React.useEffect(() => {
    if (isAuth && typeof user === "object") {
      history.replace("/home");
    }
  }, [history, isAuth, user]);

  if (typeof user !== "object") {
    return <Spinner>Memuat halaman...</Spinner>;
  }

  if (typeof user === "object" && isAuth) {
    return null;
  }

  return children;
}
