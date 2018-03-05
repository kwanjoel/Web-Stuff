import React, { Component } from 'react';
import ProjectsPanel from './ProjectsPanel';
import MainContainer from './MainContainer';
import TeamsPanel from './TeamsPanel';
import EmployeesPanel from './EmployeesPanel';

class Overview extends Component {
  render() {
    return (
        <MainContainer sidebar="Overview">
          <h1 className="page-header">Overview</h1>
          <div className="row">
          <ProjectsPanel/>
          <TeamsPanel/>
          <EmployeesPanel/>
          </div>
        </MainContainer>
    );
  }
}

export default Overview;