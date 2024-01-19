import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../home/home.service';
import { RouterModule } from '@angular/router';
import { UserLogoComponent } from '../../../../../shared/user-logo/user-logo.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, UserLogoComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  translate: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.showNavigate$.subscribe(show => this.translate = show);
  }

  onClick(): void {
    this.translate = !this.translate;
    this.homeService.navigate(this.translate);
  }

}
