import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter<number>();

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onPageChange.emit(this.currentPage);
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.onPageChange.emit(this.currentPage);
    }
  }

}
