import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Slots } from '../interfaces/slots.interface';

@Injectable({
  providedIn: 'root'
})
export class SlotsService {

  constructor(
    public http: HttpClient,
  ) { }

  getStatus(): Observable<Slots> {
    return this.http.get<Slots>(`${environment.apiUrl}/game/slots/status`, {
      withCredentials: true,
    });
  }

  spin(): Observable<Slots> {
    return this.http.post<Slots>(`${environment.apiUrl}/game/slots/spin`, {}, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
  }
}
