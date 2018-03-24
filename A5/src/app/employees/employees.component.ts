import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../data/employee.service';
import { Employee } from '../data/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  
  employees: Employee[];
  getEmployeeSub: any;
  loadingError:boolean = false;
  isLoading:boolean = true;

  constructor(private es:EmployeeService) { }

  ngOnInit() {
    this.getEmployeeSub = this.es.getEmployees().subscribe(employees => this.employees = employees);
    this.isLoading = false;
  }
  ngOnDestroy() {
    this.getEmployeeSub.unsubscribe();
  }
}
