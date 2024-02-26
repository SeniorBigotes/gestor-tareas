import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activities } from './models/IActivity';
import { Group } from './models/IGroup';
import { User } from './models/IUser';
import { environment } from '../enviroments/environment';
import { Subtask } from './models/ISubtask';
import { SendComplete, UpdateSubtask } from './types';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private activitiesUrl = environment.API_ACTIVITY;
  private subtasksUrl = environment.API_SUBTASKS;
  private usersUrl = environment.API_USERS;
  private groupsUrl = environment.API_GROUPS;
  private participants = environment.API_PARTICIPANTS_GROUPS;

  // Navegacion (Menu - nav) navigate();
  private showNavigate = new BehaviorSubject<boolean>(false);
  showNavigate$ = this.showNavigate.asObservable();

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Activities[]> {
    return this.http.get<Activities[]>(this.activitiesUrl);
  }

  getActivity(id: number): Observable<Activities> {
    return this.http.get<Activities>(`${this.activitiesUrl}/${id}`);
  }

  getSubtasks(id: number): Observable<Subtask[]> {
    return this.http.get<Subtask[]>(`${this.subtasksUrl}/${id}`);
  }

  putStatusSubtask(id: number, complete: SendComplete): Observable<SendComplete> {
    return this.http.put<SendComplete>(`${this.subtasksUrl}/${id}/status`, complete);
  }

  putSubtask(id: number, body: UpdateSubtask): Observable<UpdateSubtask> {
    return this.http.put<UpdateSubtask>(`${this.subtasksUrl}/${id}`, body);
  }

  getGroups(): Observable<any> {
    return this.http.get<Group>(this.groupsUrl);
  }

  getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.groupsUrl}/${id}`);
  }

  getParticipantsGroup(groupID: number): Observable<any> {
    return this.http.get<any>(`${this.groupsUrl}/${groupID}/${this.participants}`);
  }

  getUsers(): Observable<any> {
    return this.http.get<User>(this.usersUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/${id}`);
  }

  // Navegacion (Menu - nav)
  navigate(arg: boolean): void {
    this.showNavigate.next(arg);
  }
}
