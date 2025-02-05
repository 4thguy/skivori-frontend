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

  /*
  * Retrieves the current status of the slots.
  * @returns An Observable that emits the current status of the slots.
  */
  getStatus(): Observable<Slots> {
    return this.http.get<Slots>(`${environment.apiUrl}/game/slots/status`, {
      withCredentials: true,
    });
  }

  /*
  * Spins the slots and retrieves the result.
  * @returns An Observable that emits the result of the slot spin.
  */
  spin(): Observable<Slots> {
    return this.http.post<Slots>(`${environment.apiUrl}/game/slots/spin`, {}, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
  }
}
