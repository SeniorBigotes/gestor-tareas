import { Component, OnInit } from '@angular/core';
import { modules } from './modules';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [modules],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  showNavigate: boolean = false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.showNavigate$.subscribe(show => this.showNavigate = show);
  }
}
