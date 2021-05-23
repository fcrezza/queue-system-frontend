import React, {useEffect} from "react";
import useSWR from "swr";
import {Route, Switch} from "react-router-dom";
import {useSocket} from "../../../utils/socket";
import Home from "./Home";
import Queue from "./Queue";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import NotFound from "../../NotFound";
import Professor from "./Professor";
import Spinner from "../../../components/Spinner";
import {useAuth} from "../../../utils/auth";
import useAsyncError from "../../../hooks/useAsyncError";

function StudentDashboard({match}) {
  const {user} = useAuth();
  const socket = useSocket();
  const setAsyncError = useAsyncError();
  const {id, fullname, avatar, study, role, professor: studentProfessor} = user;
  const {data: professor, mutate, error} = useSWR(
    `/professors/${studentProfessor.id}`
  );

  useEffect(() => {
    if (error) {
      setAsyncError(error);
    }
  }, [error, setAsyncError]);

  useEffect(() => {
    socket.on("professorStatus", ({status, id: profID}) => {
      if (studentProfessor.id === profID) {
        mutate(async cachedValue => ({status, ...cachedValue}));
      }
    });
  }, [mutate, socket, studentProfessor.id]);

  if (!professor) {
    return <Spinner>Memuat data ...</Spinner>;
  }

  return (
    <Switch>
      <Route
        exact
        path={match.path}
        render={routerProps => (
          <Home
            professorName={professor.fullname}
            professorAvatar={professor.avatar}
            professorStatus={professor.status}
            study={study.name}
            fullname={fullname}
            avatar={avatar}
            {...routerProps}
          />
        )}
      />
      <Route
        exact
        path={`${match.path}queue`}
        render={routerProps => (
          <Queue
            id={id}
            fullname={fullname}
            professorID={professor.id}
            professorName={professor.fullname}
            professorAvatar={professor.avatar}
            professorStatus={professor.status}
            {...routerProps}
          />
        )}
      />
      <Route
        exact
        path={`${match.path}professor`}
        render={routerProps => (
          <Professor professor={professor} {...routerProps} />
        )}
      />
      <Route
        exact
        path={`${match.path}profile/change-password`}
        render={routerProps => (
          <ChangePassword
            fullname={fullname}
            role={role}
            id={id}
            {...routerProps}
          />
        )}
      />
      <Route
        exact
        path={`${match.path}profile/edit`}
        render={routerProps => <EditProfile user={user} {...routerProps} />}
      />
      <Route
        exact
        path={`${match.path}profile`}
        render={routerProps => <Profile user={user} {...routerProps} />}
      />
      <Route component={NotFound} />
    </Switch>
  );
}

export default StudentDashboard;
