import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

class TeamsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = { Teams: [] }
    }

    //Use axios to get data
    componentDidMount() {
        axios.get("https://web422teamapi.herokuapp.com/teams").then((res) => {
            this.setState({ Teams: res.data });
        }).catch((err) => {
            console.log("error");
        });
    }

    render() {

        return (
            <div className="col-md-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Teams</h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive overview-table">
                            <table className="table table-striped table-bordered">
                                <tbody>
                                    {this.state.Teams.map((team, index) => {
                                        return (
                                            <tr key={team._id}>
                                                <td>{team.TeamName}</td>
                                                <td>{team.Employees.length} Employees</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Link to="/teams" className="btn btn-primary form-control">View All Team Data</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamsPanel;