import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activities } from '../../models/IActivity';
import { User } from '../../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private activities = "assets/activitiesDB.json";
  private contacts = 'assets/usersDB.json';

  private showNavigate = new BehaviorSubject<boolean>(false);
  showNavigate$ = this.showNavigate.asObservable();

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get<Activities>(this.activities);
  }

  getUsers(): Observable<any> {
    return this.http.get<User>(this.contacts);
  }

  navigate(arg: boolean): void {
    this.showNavigate.next(arg);
  }
}
