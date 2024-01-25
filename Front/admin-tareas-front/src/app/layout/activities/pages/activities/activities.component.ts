import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Activities } from '../../../../models/IActivity';
import { DataCarousel } from '../../../home/Interfaces';
import { CarouselActivitiesComponent } from '../../components/carousel-activities/carousel-activities.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [HeaderComponent, CarouselActivitiesComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent implements OnInit {

  activities: Activities[] = []
  dataCarousel?: DataCarousel;
  itemsCarousel: Array<DataCarousel> = [];

  constructor() {}

  ngOnInit(): void {

  } // end ngOnInit()
}
