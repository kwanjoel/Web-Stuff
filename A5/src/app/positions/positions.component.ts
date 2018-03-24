import { Component, OnInit } from '@angular/core';
import { PositionService }  from '../data/position.service';
import {Position} from '../data/position';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  positions: Position[];
  getPositionSub: any;
  loadingError: boolean = false;
  isLoading: boolean = false;
  
  constructor(private ps: PositionService) { }

  

  ngOnInit() {
    this.isLoading = true;
    this.getPositionSub = this.ps.getPositions().subscribe(positions => this.positions = positions);
    this.isLoading = false;

  }

  ngOnDestroy() {
    this.getPositionSub.unsubscribe();
  }

}
