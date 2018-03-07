import React, { Component } from 'react';
import moment from 'moment'
import axios from 'axios'
import {Link} from 'react-router-dom';


class ProjectsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = { Projects: [] }
    }

    //Use axios to get data
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
            <div className="col-md-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Projects</h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive overview-table">
                            <table className="table table-striped table-bordered">
                                <tbody>
                                    {this.state.Projects.map((project, index) => {
                                        return (
                                            <tr key={project._id}>
                                                <td>{project.ProjectName}</td>
                                                <td>Active {moment().diff(moment([project.ProjectStartDate]), 'days')} days </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Link to="/projects" className="btn btn-primary form-control">View All Project Data</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsPanel;