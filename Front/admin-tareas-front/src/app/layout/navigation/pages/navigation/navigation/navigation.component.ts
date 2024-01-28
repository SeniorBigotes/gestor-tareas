import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserLogoComponent } from '../../../../../shared/user-logo/user-logo.component';
import { AppService } from '../../../../../app.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, UserLogoComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  translate: boolean = false;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.showNavigate$.subscribe(show => this.translate = show);
  }

  onClick(): void {
    this.translate = !this.translate;
    this.appService.navigate(this.translate);
  }

}
