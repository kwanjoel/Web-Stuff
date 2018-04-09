import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../data/employee.service';
import { Employee } from '../data/employee';
import { Router } from '@angular/router';
import { Position } from '../data/position';

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
  filteredEmployees:Employee[];

  constructor(private es: EmployeeService, private router: Router) { }

  routeEmployee(id:string) {
    this.router.navigate(['/employee', id]);
  }

  onEmployeeSearchKeyUP(event:any) {

    let x = event.target.value.toLowerCase();

    this.filteredEmployees = this.employees.filter((employee) => {
      if (
        employee.FirstName.toLowerCase().includes(x) ||
        employee.LastName.toLowerCase().includes(x) ||
        employee.Position.PositionName.toLowerCase().includes(x)
      )
      return true;
    })
  }

  ngOnInit() {
    this.getEmployeeSub = this.es.getEmployees().subscribe(
      (employees) => {this.employees = employees; this.filteredEmployees = employees},
      (err) => {this.loadingError = false},
      () => {this.isLoading = false;}
    )

  }
  ngOnDestroy() {
    this.getEmployeeSub.unsubscribe();
  }
}
