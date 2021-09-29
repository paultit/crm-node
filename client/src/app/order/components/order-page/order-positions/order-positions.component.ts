import { Position } from '../../../../shared/interfaces/position/position';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PositionsService } from 'src/app/core/services/positions/positions.service';
import { OrderService } from 'src/app/order/services/order/order.service';
import { MaterialService } from 'src/app/core/services/material/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css'],
})
export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>;
  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionsService,
    private order: OrderService
  ) {}

  ngOnInit(): void {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionsService.fetch(params['id']);
      }),
      map((positions: Position[]) => {
        return positions.map((position) => {
          position.quantity = 1;
          return position;
        });
      })
    );
  }

  addToOrder(position) {
    MaterialService.toast(`Add x${position.quantity}`);
    this.order.add(position);
  }
}
