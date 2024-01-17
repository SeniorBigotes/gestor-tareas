import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class CarouselComponent implements OnInit {
  @Input() items: any[] = [];
  currentIndex: number = 0;
  showItemsCarousel: number = 5;


  ngOnInit(): void {
  }

  get displayedItems(): any[] {
    return this.items
      .slice(this.currentIndex, this.currentIndex + this.showItemsCarousel)
      .concat(this.items
      .slice(0, Math.max(0, this.showItemsCarousel - (this.items.length - this.currentIndex))));
  }
  // % asegura que se mantenda dentro del rango
  // currentIndex no debe de sobrepasar a items
  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }
  prev() : void {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }
}
