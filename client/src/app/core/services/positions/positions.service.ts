import { HttpClient } from '@angular/common/http';
import { Position } from '../../../shared/interfaces/position/position';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../../../shared/interfaces/message/message';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {

  constructor(private http: HttpClient) { }

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`);
  }

  createPosition(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position);
  }

  updatePosition(position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${position._id}`, position);
  }

  deletePosition(position: Position): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${position._id}`);
  }
}
