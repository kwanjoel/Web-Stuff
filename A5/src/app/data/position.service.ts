import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Position } from "./position";


@Injectable()
export class PositionService {


  constructor(private http: HttpClient) { }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>("https://web422teamapi.herokuapp.com/positions");
  }
}
