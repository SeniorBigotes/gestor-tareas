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

  regex = /[\/-]/;
  resolutionBreakpoints = [
    {width: 600, items: 2},
    {width: 800, items: 3},
    {width: 1250, items: 4},
    {width: 1500, items: 5},
  ]

  ngOnInit(): void {
    this.updateItemsToShow();
  }

  // los items aparecen seguidos al terminar
  get displayedItems(): any[] {
    return this.items
      .slice(this.currentIndex, this.currentIndex + this.showItemsCarousel)
      .concat(this.items
      .slice(0, Math.max(0, this.showItemsCarousel - (this.items.length - this.currentIndex))));
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

  // mostrar items dependiendo la resolucion
  private updateItemsToShow(): void {
    const screenWidth = window.innerWidth;

    for(let breakpoint of this.resolutionBreakpoints) {
      if(screenWidth < breakpoint.width) {
        this.showItemsCarousel = breakpoint.items;
        return;
      }
      this.showItemsCarousel = 5;
    }
  }
}


/*
PASAR DATOS CON ESTE FORMATO

   const carousel = {
      name: task.nombre,
      info: task.fechaEntrega,
      number: task.progreso,
      progressbar: true
    }
*/