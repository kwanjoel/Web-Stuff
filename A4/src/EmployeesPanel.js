import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

class TeamsPanel extends Component {

    constructor(props) {
        super(props);
        this.state = { Employees: [] }
    }

    //Use axios to get data
    componentDidMount() {
        axios.get("https://web422teamapi.herokuapp.com/Employees").then((res) => {
            this.setState({ Employees: res.data });
            console.log(this.state.Employees);
        }).catch((err) => {
            console.log("error");
        });
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Employees</h3>
                    </div>
                    <div className="panel-body">
                        <div className="table-responsive overview-table">
                            <table className="table table-striped table-bordered">
                                <tbody>
                                    {this.state.Employees.map((employee, index) => {
                                        return (

                                            <tr key={employee._id}>
                                                <td>{employee.FirstName} {employee.LastName} </td>
                                                <td>{employee.Position.PositionName}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Link to="/employees" className="btn btn-primary form-control">View All Employee Data</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamsPanel;