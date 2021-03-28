import React, {useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";
import Home from "./Home";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import StudentProfile from "./StudentProfile";
import StudentList from "./StudentList";
import NotFound from "../../NotFound";
import Queue from "./Queue";
import {useSocket} from "../../../context/SocketContext";

function ProfessorDashboard({match}) {
  const {user} = useAuth();
  const socket = useSocket();
  const {id, fullname, avatar, faculty} = user;

  useEffect(() => {
    socket.emit("makeMeOnline");
  }, [socket]);

  return (
    <Switch>
      <Route
        exact
        path={match.path}
        render={() => (
          <Home
            avatar={avatar}
            fullname={fullname}
            facultyName={faculty.name}
          />
        )}
      />
      <Route
        exact
        path={`${match.path}profile/change-password`}
        render={({history}) => (
          <ChangePassword id={id} fullname={fullname} history={history} />
        )}
      />
      <Route
        exact
        path={`${match.path}profile/edit`}
        render={routeProps => <EditProfile user={user} {...routeProps} />}
      />
      <Route
        exact
        path={`${match.path}profile`}
        render={() => <Profile user={user} />}
      />
      <Route
        exact
        path={`${match.path}students/:id`}
        render={routeProps => <StudentProfile {...routeProps} />}
      />
      <Route
        exact
        path={`${match.path}students`}
        render={routeProps => (
          <StudentList id={id} fullname={fullname} {...routeProps} />
        )}
      />
      <Route
        exact
        path={`${match.path}queue`}
        render={routeProps => (
          <Queue id={id} fullname={fullname} {...routeProps} />
        )}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default ProfessorDashboard;
