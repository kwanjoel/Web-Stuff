import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { EmployeeService } from '../data/employee.service';
import { ActivatedRoute } from "@angular/router";
import { PositionService } from "../data/position.service";
import { Position } from "../data/position";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  paramSubScription: any;
  employeeSubscription: any
  getPositionsSubcription: any
  saveEmployeeSubscription: any
  employee: EmployeeRaw
  positions: Position[]
  successMessage: boolean = false;
  failMessage: boolean = false

  constructor(private ps: PositionService, private es: EmployeeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramSubScription = this.route.params.subscribe((params) => {
      this.employeeSubscription = this.es.getEmployee(params['_id']).subscribe((emp) => {
        this.employee = emp[0];
      })

      this.getPositionsSubcription = this.ps.getPositions().subscribe((data) => {
        this.positions = data;
      })
    })
  }

  onSubmit(f: NgForm) {
    this.saveEmployeeSubscription = this.es.saveEmployee(this.employee).subscribe(
      () => {
        this.successMessage = true;
        setTimeout(() => { this.successMessage = false; }, 2500);
      },

      (err) => {
        this.failMessage = true;
        setTimeout(() => { this.failMessage = false }, 2500);
      }

    );
  }

  ngOnDestroy() {
    if (this.paramSubScription)
      this.paramSubScription.unsubscribe();
    if (this.getPositionsSubcription)
      this.getPositionsSubcription.unsubscribe();
    if (this.saveEmployeeSubscription)
      this.saveEmployeeSubscription.unsubscribe();
  }

}
