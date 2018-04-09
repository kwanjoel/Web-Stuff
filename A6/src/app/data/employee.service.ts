import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HttpBackend } from '@angular/common/http/src/backend';
import { EmployeeRaw } from './employeeRaw';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees():Observable<Employee[]> {
    return this.http.get<Employee[]>("https://web422teamapi.herokuapp.com/employees");
  }

  saveEmployee(employee:EmployeeRaw) {
    return this.http.put<Observable<any>>('https://web422teamapi.herokuapp.com/employee/' + employee._id, employee);
  }

  getEmployee(id) {
    return this.http.get<Observable<EmployeeRaw[]>>("https://web422teamapi.herokuapp.com/employee/" + id);
  }
}
