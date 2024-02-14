import { ChangeDetectorRef, ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activities } from '../../models/IActivity';
import { User } from '../../models/IUser';
import { Subtask } from '../../models/ISubtask';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private showMore = new BehaviorSubject<boolean>(false);
  private showMoreElement = new BehaviorSubject<boolean>(false);
  private getActivity = new BehaviorSubject<Activities | null>(null);
  private getSubtasks = new BehaviorSubject<Subtask[] | null>(null);



  constructor() { }
  
  /* ACTIVITY COMPONENT */
  get $showMore(): Observable<boolean> {
    return this.showMore.asObservable();
  }
  get $showMoreElement(): Observable<boolean> {
    return this.showMoreElement.asObservable();
  }

  get $getActivity(): Observable<Activities | null> {
    return this.getActivity.asObservable();
  }

  get $getSubtasks(): Observable<Subtask[] | null> {
    return this.getSubtasks.asObservable();
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

  setSubtasks(subtasks: Subtask[]): void {
    this.getSubtasks.next(subtasks);
  }
}
