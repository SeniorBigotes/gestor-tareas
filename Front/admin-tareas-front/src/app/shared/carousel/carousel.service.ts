import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private idSelectedActivity = new BehaviorSubject<number | undefined>(undefined);
  idSelectedActivity$ = this.idSelectedActivity.asObservable();

  constructor() { }

    dataCarousel?: {
      name: string,
      info: any,
      footer: any,
      progressbar?: boolean,
      photo?: boolean,
    }

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

  updateID(id: number) {
    this.idSelectedActivity.next(id)
  }
}
