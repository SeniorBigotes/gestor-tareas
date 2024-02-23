import { ChangeDetectorRef, ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, switchMap } from 'rxjs';
import { Activities } from '../../models/IActivity';
import { User } from '../../models/IUser';
import { Subtask } from '../../models/ISubtask';
import { Participats } from '../../models/IParticipants';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private showMore = new BehaviorSubject<boolean>(false);
  private showMoreElement = new BehaviorSubject<boolean>(false);
  private getActivity = new BehaviorSubject<Activities | null>(null);
  private getSubtasks = new BehaviorSubject<Subtask[] | null>(null);
  private getParticipants = new BehaviorSubject<User[] | null>(null);



  constructor(private appService: AppService) { }
  
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

  get $getParticipants(): Observable<User[] | null>  {
    return this.getParticipants.asObservable();
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

  setParticipants(participants: Participats[]): void {
    // creamos array de observables
    const requests = participants.map(p => this.appService.getUser(p.userID));
    // devuelve un nuevo observable cuando se completa el anterior (requests)
    forkJoin(requests).subscribe(users => this.getParticipants.next(users));
  }
}
