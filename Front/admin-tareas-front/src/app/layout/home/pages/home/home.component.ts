import { Component, OnInit } from '@angular/core';
import { BusquedaComponent } from '../../../../shared/busqueda/busqueda.component';
import { HomeService } from '../../home.service';
import { MenuComponent } from '../../../../shared/menu/menu.component';
import { UserLogoComponent } from '../../../../shared/user-logo/user-logo.component';
import { NotifyComponent } from '../../../../shared/notify/notify.component';
import { ActivitiesComponent } from '../../../activities/pages/activities/activities.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BusquedaComponent, MenuComponent, UserLogoComponent, NotifyComponent, ActivitiesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  showNavigate: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.showNavigate$.subscribe(show => this.showNavigate = show);
  }

  onClick(): void {  
    this.showNavigate = !this.showNavigate;
    this.homeService.navigate(this.showNavigate);
  }
}