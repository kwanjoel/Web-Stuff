import React, { Component } from 'react';
import axios from 'axios';
import MainContainer from './MainContainer'

class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = { Teams: [] };
    }
    componentDidMount() {
        axios.get("https://web422teamapi.herokuapp.com/teams").then((res) => {
            res.data.sort((a,b)=>(a._id > b._id ? 1 : -1));
            this.setState({ Teams: res.data });
        }).catch((err) => {
            console.log("error");
        });
    }
    render() {

        return (
            <MainContainer sidebar="Teams">
                <h1 className="page-header">Teams</h1>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <th>Name</th>
                        <th>Projects</th>
                        <th>Employees</th>
                        <th>Team Lead</th>
                        <tbody>
                            {this.state.Teams.map((team, index) => {
                                return (
                                    <tr key={team._id}>
                                        <td>{team.TeamName}</td>
                                        <td>{team.Projects.map((project, index) => {
                                            return (
                                                <li key={project.id}>{project.ProjectName} </li>
                                            )
                                        })}</td>
                                        <td>{team.Employees.length} Employees</td>
                                        <td>{team.TeamLead.FirstName} {team.TeamLead.LastName}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </MainContainer>
        );
    }
}

export default Teams;