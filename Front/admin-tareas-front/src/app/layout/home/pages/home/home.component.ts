import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { ActivitiesComponent } from '../../../activities/pages/activities/activities.component';
import { HttpClientModule } from '@angular/common/http';
import { Activities } from '../../../../models/IActivity';
import { User } from '../../../../models/IUser';
import { Group } from '../../../../models/IGroup';
import { CarouselItems } from '../../Interfaces';
import { HeaderComponent } from '../../components/header/header.component';
import { CarouselComponent } from '../../../../shared/carousel/components/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ActivitiesComponent, CarouselComponent, 
            HttpClientModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  dataCarousel?: {
    name: string,
    info: any,
    footer: any,
    progressbar?: boolean,
    photo?: boolean,
  }

  // Carrusel
  carouselItemsActivities: CarouselItems[] = [];
  dataLoadActivities: boolean = false;

  carouselItemsGroups: CarouselItems[] = [];
  dataLoadGroups: boolean = false;
  
  carouselItemsContacts: CarouselItems[] = [];
  dataLoadContacts: boolean = false;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    /* pasar datos al carrusel */
    // Actividades
    this.homeService.getTasks().subscribe({
      next: tasks => {
        tasks ? this.transferActivitiesCarousel(tasks) : this.carouselItemsActivities.push(null);
        this.dataLoadActivities = true;
      },
      error: () => { this.dataLoadActivities = this.handleError('error') }
    });

    // Grupos
    this.homeService.getGroups().subscribe({
      next: groups => {
        groups ? this.transferGroupsCarousel(groups) : this.carouselItemsGroups.push(null);
        this.dataLoadGroups = true;
    },
    error: () => { this.dataLoadGroups = this.handleError('error')}});

    // Contactos
    this.homeService.getUsers().subscribe({
      next: users => {
        users ? this.transferContactsCarousel(users) : this.carouselItemsContacts.push(null);
        this.dataLoadContacts = true;
    },
    error: () => { this.dataLoadContacts = this.handleError('error')}});
  } // end ngOnInit()

  // manejar errores
  private handleError(str: string): boolean {
    this.carouselItemsActivities.push(str);
    return true;
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