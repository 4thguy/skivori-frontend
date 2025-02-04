import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ExchangeRateApiResponse } from '../interfaces/exchange-rate-api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    private http: HttpClient,
  ) { }

  convertCurrency(amount: number, currency: string): Observable<ExchangeRateApiResponse> {
    return this.http.get<ExchangeRateApiResponse>(`https://v6.exchangerate-api.com/v6/${environment.exchangerateKey}/latest/${currency.toUpperCase()}`);
  }
}
