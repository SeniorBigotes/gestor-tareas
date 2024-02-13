import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivitiesComponent } from '../../../activities/pages/activities/activities.component';
import { DataCarousel } from '../../utils/Interfaces';
import { HeaderComponent } from '../../components/header/header.component';
import { CarouselComponent } from '../../../../shared/carousel/components/carousel.component';
import { AppService } from '../../../../app.service';
import { GroupClass } from '../../../../classes/group.class';
import { Subscription } from 'rxjs';
import { UserClass } from '../../../../classes/user.class';
import { ActivityClass } from '../../../../classes/activity.class';

/**
 * Componente principal de el menú principal
 */

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ActivitiesComponent, CarouselComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit, OnDestroy {

  /**
   * @type {Subscription} para quitar subscripciones cuando se cambie de ruta o componente
   */

  // subscripciones
  private groupSub!: Subscription;
  private userSub!: Subscription;
  private activitySub!: Subscription;

  /**
   * @type {DataCarousel[]} tipo de dato que recibe el componente carrusel 
   */

  // datos del Carrusel
  carouselItemsActivities: DataCarousel[] = [];
  carouselItemsGroups: DataCarousel[] = [];
  carouselItemsUsers: DataCarousel[] = [];

  /** Inyeccion de dependencias
   * @param appService servicio que ejecuta observables para la conexion con el backend
   * @param activityClass clase de apoyo para las actividades (pasar datos al carrusel)
   * @param groupClass clase de apoyo para los grupos (pasar datos al carrusel)
   * @param userClass clase de apoyo para los usuarios (pasar datos al carrusel)
   */

  constructor(private appService: AppService,
              private activityClass: ActivityClass,
              private groupClass: GroupClass,
              private userClass: UserClass){}

  /**
   * Subscripciones para obtener datos desde el backend
   */
  ngOnInit(): void {
    
    // Actividades
    this.activitySub = this.activityClass.findAllItems(this.appService.getTasks()).
      subscribe(dataCarousel => this.carouselItemsActivities = dataCarousel);

    // Grupos
    this.groupSub = this.groupClass.findAllItems(this.appService.getGroups()).
      subscribe(dataCarousel => this.carouselItemsGroups = dataCarousel);

    // Usuarios
    this.userSub = this.userClass.findAllItems(this.appService.getUsers()).
      subscribe(dataCarousel => this.carouselItemsUsers = dataCarousel);

  } // end ngOnInit()

  /**
   * Desubscripciones 
   */
  ngOnDestroy(): void {
    this.groupSub?.unsubscribe();
    this.userSub?.unsubscribe();
    this.activitySub?.unsubscribe();
  }
}