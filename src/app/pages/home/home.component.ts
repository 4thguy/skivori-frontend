import { KeyValuePipe } from '@angular/common';
import { Component } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-home',
  imports: [KeyValuePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  data: Record<string, number> | null = null;

  constructor(
    private currencyService: CurrencyService,
  ) { }

  convert() {
    this.currencyService.convertCurrency(1, 'EUR')
      .subscribe((response) => {
        this.data = response.conversion_rates;
      });
  }
}
