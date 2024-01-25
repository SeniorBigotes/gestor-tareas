import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activities } from './models/IActivity';
import { Group } from './models/IGroup';
import { User } from './models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private activities = "assets/activitiesDB.json";
  private contacts = 'assets/usersDB.json';
  private groups = 'assets/groupsDB.json';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get<Activities>(this.activities);
  }

  getGroups(): Observable<any> {
    return this.http.get<Group>(this.groups);
  }

  getUsers(): Observable<any> {
    return this.http.get<User>(this.contacts);
  }
}
