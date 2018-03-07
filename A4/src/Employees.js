import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import MainContainer from './MainContainer'

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = { Employees: [] };
    }
    componentDidMount() {
        axios.get("https://web422teamapi.herokuapp.com/employees").then((res) => {
            res.data.sort((a,b)=>(a._id > b._id ? 1 : -1));
            this.setState({ Employees: res.data });
        }).catch((err) => {
            console.log("error");
        });
    }
    render() {

        return (
            <MainContainer sidebar="Employees">
                <h1 className="page-header">Employees</h1>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <th>Name & Position</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Hire Date</th>
                        <th>Salary Bonus</th>

                        <tbody>
                            {this.state.Employees.map((employee, index) => {
                                return (
                                    <tr key={employee._id}>
                                        <td>{employee.FirstName} {employee.LastName} - {employee.Position.PositionName}</td>
                                        <td>{employee.AddressStreet} {employee.AddressCity} {employee.AddressState}, {employee.AddressZip}</td>
                                        <td>{employee.PhoneNum} ex: {employee.Extension}</td>
                                        <td>{moment(employee.HireDate).format("LL")}</td>
                                        <td>{employee.SalaryBonus}</td>
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

export default Employees;