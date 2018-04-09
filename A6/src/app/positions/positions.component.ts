import { Component, OnInit } from '@angular/core';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';
import { Router } from '@angular/router';

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

  constructor(private ps: PositionService, private router: Router) { }

  routePosition(id:string) {
    this.router.navigate(['/position', id]);
  }

  ngOnInit() {

    this.getPositionSub = this.ps.getPositions().subscribe(
      (positions) => { this.positions = positions },
      (err) => { this.loadingError = true },
      () => { this.isLoading = false }
    );


  }

  ngOnDestroy() {
    this.getPositionSub.unsubscribe();
  }

}
