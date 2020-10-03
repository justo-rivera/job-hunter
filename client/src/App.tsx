import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Home from "./pages/Home";

import Calendar from "./pages/Calendar";
import JobBoard from "./pages/JobBoard";
import Tasks from "./pages/tasks/Tasks";
import Preperation from "./pages/Preperation";
import Profile from "./pages/Profile";
import Todos from "./pages/tasks/Todos";
import Challenges from "./pages/tasks/Challenges";
import Learning from "./pages/tasks/Learning";



import Navbar from "./components/Navbar";

import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";
import { TaskProvider } from "./context/TaskContext";


import { IProps } from './interfaces'
import "./App.css";

function App(props: IProps) {
  return (
    <AuthProvider>
      <JobProvider>
        <TaskProvider>
      <div>
        <Navbar history={props.history} />
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />

          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/job-board" component={JobBoard} />

          <Route exact path="/tasks" component={Tasks} />
          <Route path="/tasks/todos" component={Todos} />
          <Route path="/tasks/challenges" component={Challenges} />
          <Route path="/tasks/learning" component={Learning} />

          <Route path="/preperation" component={Preperation} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
      </TaskProvider>
      </JobProvider>
    </AuthProvider>
  );
}

export default withRouter(App);