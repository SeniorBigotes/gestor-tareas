import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../home/home.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  rotate: boolean = false;
  translate: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.showNavigate$.subscribe(show => this.translate = show);
  }

  onClick(): void {
    this.rotate = !this.rotate;
    this.translate = !this.translate;
    this.homeService.navigate(this.translate);
  }

}
