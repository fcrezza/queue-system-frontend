import React, {useRef} from "react";
import {Switch, Route} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import Step1 from "./Step1";
import Step2 from "./Step2/index";
import Step3 from "./Step3";

function Signup({match, history}) {
  const {signup} = useAuth();
  const cacheFormData = useRef(
    JSON.parse(sessionStorage.getItem("formData")) || {}
  );

  const nextStep = (formData, step) => {
    if (formData.role && cacheFormData.current.role !== formData.role) {
      cacheFormData.current = {
        ...formData
      };
    } else {
      cacheFormData.current = {
        ...cacheFormData.current,
        ...formData
      };
    }

    sessionStorage.setItem("formData", JSON.stringify(cacheFormData.current));
    history.push(`${match.url}/step-${step}`);
  };
  const sendData = async (formData, callback) => {
    cacheFormData.current = {
      ...cacheFormData.current,
      ...formData
    };
    await signup(cacheFormData.current, callback);
    sessionStorage.removeItem("formData");
    cacheFormData.current = {};
  };

  return (
    <div>
      <Switch>
        <Route
          path={`${match.path}/step-3`}
          render={routerProps => (
            <Step3
              cacheFormData={cacheFormData.current}
              sendData={sendData}
              {...routerProps}
            />
          )}
        />
        <Route
          path={`${match.path}/step-2`}
          render={() => (
            <Step2
              cacheFormData={cacheFormData.current}
              sendData={sendData}
              nextStep={nextStep}
            />
          )}
        />
        <Route
          path={match.path}
          render={() => (
            <Step1 cacheFormData={cacheFormData.current} nextStep={nextStep} />
          )}
        />
      </Switch>
    </div>
  );
}

export default Signup;
