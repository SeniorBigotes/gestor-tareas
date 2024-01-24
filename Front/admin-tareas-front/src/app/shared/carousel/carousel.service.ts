import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor() { }

  getScreenWidth(): number {
    return window.innerWidth;
  }

  showItemsResolution(screenWidth: number, resolutionBreakpoints: any[]): number {
    for(let breakpoint of resolutionBreakpoints) {
      if(screenWidth < breakpoint.width) {
        return breakpoint.items;
      }
    }
    return 5;
  }
}
