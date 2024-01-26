import { ChangeDetectorRef, ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private showMore: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private showMoreElement: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
  
  get $showMore(): Observable<boolean> {
    return this.showMore.asObservable();
  }
  get $showMoreElement(): Observable<boolean> {
    return this.showMoreElement.asObservable();
  }

  checkOverflow(contentElement?: ElementRef) {    
    if(contentElement) {
      const element = contentElement.nativeElement
      this.showMoreElement.next(element.scrollHeight > element.clientHeight);
    }
  }

  toggleShowMore(showMore: boolean): void {
    this.showMore.next(showMore);
  }
}
