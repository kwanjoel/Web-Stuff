import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import MainContainer from './MainContainer'

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = { Projects: [] };
    }
    componentDidMount() {
        axios.get("https://web422teamapi.herokuapp.com/projects").then((res) => {
            res.data.sort((a,b)=>(a._id > b._id ? 1 : -1));
            this.setState({ Projects: res.data });
        }).catch((err) => {
            console.log("error");
        });
    }
    render() {

        return (
            <MainContainer sidebar="Projects">
                <h1 className="page-header">Projects</h1>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>

                        <tbody>
                            {this.state.Projects.map((project, index) => {
                                return (
                                    <tr key={project._id}>
                                        <td>{project.ProjectName}</td>
                                        <td>{project.ProjectDescription}</td>
                                        <td>{moment(project.ProjectStartDate).format("LL")}</td>
                                        <td>N/A</td>
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

export default Projects;