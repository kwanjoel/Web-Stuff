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
  loadingError: boolean = false;
  isLoading: boolean = true;

  constructor(private es: EmployeeService) { }

  loadData() {
    return new Promise((resolve, reject) => {
      this.getEmployeeSub = this.es.getEmployees().subscribe(employees => this.employees = employees);
    })
  }

  ngOnInit() {
    this.loadData().then(() => {
      
      this.isLoading = false;
      console.log("hello");
    })
  }
  ngOnDestroy() {
    this.getEmployeeSub.unsubscribe();
  }
}
