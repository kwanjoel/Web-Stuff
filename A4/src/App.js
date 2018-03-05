import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Overview from './Overview';
import Projects from './Projects';
import Teams from './Teams';
import Employees from './Employees';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (

      <Switch>
        <Route exact path='/' render={() => (
          <Overview />
        )} />
        <Route exact path='/Projects' render={() => (
          <Projects />
        )} />
        <Route exact path='/Teams' render={() => (
          <Teams />
        )} />
        <Route exact path='/Employees' render={() => (
          <Employees />
        )} />

        <Route render={() => (
          <NotFound />
        )} />


      </Switch>
    );
  }
}

export default App;