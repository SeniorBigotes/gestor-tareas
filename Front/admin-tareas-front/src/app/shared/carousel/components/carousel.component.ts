import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CarouselService } from '../carousel.service';

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

  error: boolean = false;

  regex = /[\/-]/;
  resolutionBreakpoints = [
    {width: 400, items: 1},
    {width: 600, items: 2},
    {width: 1000, items: 3},
    {width: 1250, items: 4},
    {width: 1500, items: 5},
  ]

  constructor(private carouselService: CarouselService) {}

  ngOnInit(): void {
    this.handleError();
    this.showItemsCarousel = this.updateItemsToShow();
  }

  // los items aparecen seguidos al terminar
  get displayedItems(): any[] {
    if (this.items.length <= this.showItemsCarousel) {
      return this.items;
    } else {
      const end = this.currentIndex + this.showItemsCarousel;
      const slicedItems = this.items.slice(this.currentIndex, end);

      // Comprobamos si necesitamos agregar elementos al principio desde el final
      const remainingItems = this.showItemsCarousel - slicedItems.length;
      const overflowItems = this.items.slice(0, remainingItems);

      return slicedItems.concat(overflowItems);
    }
  }


  /* Botones
    % asegura que se mantenda dentro del rango
    currentIndex no debe de sobrepasar a items
  */
  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }
  prev() : void {
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  reload(): void {
    window.location.reload();
  }

  private handleError(): void {
    if(this.items[0] === null || this.items[0] === 'error') {
      if(this.items[0] === 'error') this.error = true;
      this.items = [];
    }
  }

  // mostrar items dependiendo la resolucion
  private updateItemsToShow(): number {
    const screenWidth = this.carouselService.getScreenWidth();
    return this.carouselService.showItemsResolution(screenWidth, this.resolutionBreakpoints);
  }
}