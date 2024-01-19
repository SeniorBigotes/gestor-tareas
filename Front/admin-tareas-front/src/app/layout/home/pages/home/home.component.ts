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
import { Group } from '../../../../models/IGroup';

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
    footer?: any,
    progressbar?: boolean,
    photo?: boolean,
  }

  // Carrusel
  carouselItemsActivities: any[] = [];
  dataLoadActivities: boolean = false;

  carouselItemsGroups: any[] = [];
  dataLoadGroups: boolean = false;
  
  carouselItemsContacts: any[] = [];
  dataLoadContacts: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.showNavigate$.subscribe(show => this.showNavigate = show);

    /* pasar datos al carrusel */
    // Actividades
    this.homeService.getTasks().subscribe({
      next: tasks => {
        tasks ? this.transferActivitiesCarousel(tasks.proyectos) : this.carouselItemsActivities.push(null);
        this.dataLoadActivities = true;
      },
      error: () => {
        this.carouselItemsActivities = ['error'];
        this.dataLoadActivities = true;
      }
    });

    // Grupos
    this.homeService.getGroups().subscribe({
      next: groups => {
        groups ? this.transferGroupsCarousel(groups) : this.carouselItemsGroups.push(null);
        this.dataLoadGroups = true;
    },
    error: () => { this.carouselItemsGroups = ['error'] }});

    // Contactos
    this.homeService.getUsers().subscribe({
      next: users => {
        users ? this.transferContactsCarousel(users) : this.carouselItemsContacts.push(null);
        this.dataLoadContacts = true;
    },
    error: () => { this.carouselItemsContacts = ['error'] }});
  }

  onClick(): void {  
    this.showNavigate = !this.showNavigate;
    this.homeService.navigate(this.showNavigate);
  }

  /* TRANSFERIR DATOS AL CARRUSEL */
  // actividades
  private transferActivitiesCarousel(projects: Activities[]): void {
    for(let task of projects) {
        this.dataCarousel = {
          name: task.task,
          info: task.dateEnd,
          footer: task.progress,
          progressbar: true,
        }
        this.carouselItemsActivities.push(this.dataCarousel);
      }
  }
  // contactos
  private transferContactsCarousel(users: User[]): void {
    for(let user of users) {
      this.dataCarousel = {
        name: user.photoUrl,
        info: user.username,
        footer: user.rol,
        photo: true
      }
      this.carouselItemsContacts.push(this.dataCarousel);
    }
  }
  // grupos
  private transferGroupsCarousel(groups: Group[]): void {
    for(let group of groups) {
      this.dataCarousel = {
        name: group.photoUrl,
        info: group.name,
        footer: `${group.participants.length} participantes`,
        photo: true
      }
      this.carouselItemsGroups.push(this.dataCarousel);
    }
  }
}