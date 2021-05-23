import React, {useRef} from "react";
import {Switch, Route, useHistory, useRouteMatch} from "react-router-dom";

import {useAuth} from "../../utils/auth";
import Auth from "./auth";
import AccountDetails from "./accountdetails";
import ChooseProfessor from "./chooseprofessor";
import NotFound from "../notfound";

function Signup() {
  const {signup} = useAuth();
  const history = useHistory();
  const match = useRouteMatch();
  const formData = useRef(JSON.parse(sessionStorage.getItem("formData")) || {});

  const nextStep = (data, step) => {
    if (formData.current.role && formData.current.role !== data.role) {
      formData.current = {
        ...data
      };
    } else {
      formData.current = {
        ...formData.current,
        ...data
      };
    }

    sessionStorage.setItem("formData", JSON.stringify(formData.current));
    history.push(`${match.url}/${step}`);
  };

  const sendData = async data => {
    await signup(data);
    sessionStorage.removeItem("formData");
    formData.current = {};
  };

  return (
    <Switch>
      <Route exact path={match.path}>
        <Auth formData={formData.current} nextStep={nextStep} />
      </Route>
      <Route exact path={`${match.path}/account-details`}>
        <AccountDetails
          formData={formData.current}
          sendData={sendData}
          nextStep={nextStep}
        />
      </Route>
      <Route exact path={`${match.path}/choose-professor`}>
        <ChooseProfessor formData={formData.current} sendData={sendData} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Signup;
