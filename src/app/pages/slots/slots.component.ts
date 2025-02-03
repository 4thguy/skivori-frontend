import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingComponent } from '../../components/loading/loading.component';
import { Slots } from '../../interfaces/slots.interface';
import { SlotsService } from '../../services/slots.service';

@Component({
  selector: 'app-slots',
  imports: [LoadingComponent],
  templateUrl: './slots.component.html',
  styleUrl: './slots.component.scss'
})
export class SlotsComponent implements OnInit, OnDestroy {

  data: Slots | null = null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private slotsService: SlotsService,
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.slotsService.getStatus()
      .subscribe((data: Slots) => this.data = data));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onClickPlay() {
    this.slotsService.spin().subscribe((data: Slots) => this.data = data);
  }

}

