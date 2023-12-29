import { Component, OnInit } from '@angular/core';
import { modules } from './modules';
import { HomeService } from './layout/home/home.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [modules],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  showNavigate: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.showNavigate$.subscribe(show => this.showNavigate = show);
  }
}
