import { Component, OnInit } from '@angular/core';
import { BusquedaComponent } from '../../../../shared/busqueda/busqueda.component';
import { HomeService } from '../../home.service';
import { MenuComponent } from '../../../../shared/menu/menu.component';
import { UserLogoComponent } from '../../../../shared/user-logo/user-logo.component';
import { NotifyComponent } from '../../../../shared/notify/notify.component';
import { ActivitiesComponent } from '../../../activities/pages/activities/activities.component';
import { CarouselComponent } from '../../../../shared/carousel/carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { Activities } from '../../../../models/IActivity';
import { User } from '../../../../models/IUser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BusquedaComponent, MenuComponent, UserLogoComponent, NotifyComponent, ActivitiesComponent, CarouselComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  showNavigate: boolean = false;

  dataCarousel?: {
    name: string,
    info: any,
    footer: any,
    progressbar: boolean
    photo: boolean,
  }

  // Carrusel
  carouselItemsActivities: any[] = [];
  dataLoadActivities: boolean = false;
  
  carouselItemsContacts: any[] = [];
  dataLoadContacts: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.showNavigate$.subscribe(show => this.showNavigate = show);

    /* pasar datos al carrusel */
    // Actividades
    this.homeService.getTasks().subscribe(tasks => {
      this.transferActivitiesCarousel(tasks.proyectos);
      this.dataLoadActivities = true;
    });
    // Contactos
    this.homeService.getUsers().subscribe(users => {
      this.transferContactsCarousel(users);
      this.dataLoadContacts = true;
    });
  }

  onClick(): void {  
    this.showNavigate = !this.showNavigate;
    this.homeService.navigate(this.showNavigate);
  }

  private transferActivitiesCarousel(projects: Activities[]): void {
    for(let task of projects) {
        this.dataCarousel = {
          name: task.task,
          info: task.dateEnd,
          footer: task.progress,
          progressbar: true,
          photo: false
        }
        this.carouselItemsActivities.push(this.dataCarousel);
      }
  }
  private transferContactsCarousel(users: User[]): void {
    for(let user of users) {
      this.dataCarousel = {
        name: user.photoUrl,
        info: user.username,
        footer: user.rol,
        progressbar: false,
        photo: true
      }
      this.carouselItemsContacts.push(this.dataCarousel);
    }
  }
}