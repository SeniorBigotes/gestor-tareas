import { ChangeDetectorRef, ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activities } from '../../models/IActivity';
import { User } from '../../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private showMore = new BehaviorSubject<boolean>(false);
  private showMoreElement = new BehaviorSubject<boolean>(false);
  private getActivity = new BehaviorSubject<Activities | undefined>(undefined);



  constructor() { }
  
  /* ACTIVITY COMPONENT */
  get $showMore(): Observable<boolean> {
    return this.showMore.asObservable();
  }
  get $showMoreElement(): Observable<boolean> {
    return this.showMoreElement.asObservable();
  }

  get $getActivity(): Observable<Activities | undefined> {
    return this.getActivity.asObservable();
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

  getScreenWidth(): number {
    return window.innerWidth;
  }

  setActivity(activity: Activities): void {
    this.getActivity.next(activity);
  }
}
