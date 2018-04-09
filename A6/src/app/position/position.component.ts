import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PositionService } from "../data/position.service";
import { Position } from "../data/position";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  paramSubScription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: Position;
  successMessage = false;
  failMessage = false;

  constructor(private route: ActivatedRoute, private ps: PositionService) { }

  ngOnInit() {
    this.paramSubScription = this.route.params.subscribe((params) => {
      this.positionSubscription = this.ps.getPosition(params['_id']).subscribe((pos) => {
        this.position = pos[0];
      })
    })
  }

  onSubmit(f: NgForm) {
    this.savePositionSubscription = this.ps.savePosition(this.position).subscribe(
      () => {
        this.successMessage = true;
        setTimeout(() => this.successMessage = false, 2500);
      },

      (err) => {
        this.failMessage = true;
        console.log(err);
        setTimeout(() => this.failMessage = false, 2500);
      }
    )
  }

  ngOnDestroy() {
    if (this.paramSubScription)
      this.paramSubScription.unsubscribe();
    if (this.savePositionSubscription)
      this.savePositionSubscription.unsubscribe();
    if (this.positionSubscription)
      this.positionSubscription.unsubscribe();
  }

}
