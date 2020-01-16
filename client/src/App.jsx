import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './App.module.scss';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} exact />
        <Route path="/login" component={Login} exact />
        {/* <Redirect to="/home" /> */}
      </Switch>
    </Router>
  );
}

export default App;
