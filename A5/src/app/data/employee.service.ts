import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { HttpBackend } from '@angular/common/http/src/backend';

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployees():Observable<Employee[]> {
    return this.http.get<Employee[]>("https://web422teamapi.herokuapp.com/employees");
  }

}
