import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private searchInput = new BehaviorSubject<string>('');
  searchInput$ = this.searchInput.asObservable();

  constructor() { }

  search(str: string): void {
    this.searchInput.next(str);
  }
}
