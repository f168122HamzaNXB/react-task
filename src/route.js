import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import AllStudent from './Students/allstudents';
import EditStudent from './Students/editstudent';
import CreateStudent from './Students/createstudent';
import ShowStudent from './Students/showstudent';
import Login from './login';

function AppRoute() {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/all" component={AllStudent}></Route>
                <Route exact path="/editstudent/:id" component={EditStudent}></Route>
                <Route exact path="/createstudent" component={CreateStudent}></Route>
                <Route exact path="/showstudent/:id" component={ShowStudent}></Route>
            </Switch>
        </Router>
    );
}

export default AppRoute;
