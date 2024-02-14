import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Activities } from '../../../../models/IActivity';
import { CarouselActivitiesComponent } from '../../components/carousel-activities/carousel-activities.component';
import { AppService } from '../../../../app.service';
import { CommonModule } from '@angular/common';
import { ActivitiesService } from '../../activities.service';
import { ActivityComponent } from '../../components/activity/activity/activity.component';
import { SubtaskComponent } from '../../components/subtask/subtask.component';
import { CarouselService } from '../../../../shared/carousel/carousel.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule,
    HeaderComponent, CarouselActivitiesComponent, ActivityComponent, SubtaskComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent implements OnInit {

  activity?: Activities | null;
  showLine: boolean = this.activitiesService.getScreenWidth() < 600;

  constructor(private appService: AppService,
              private activitiesService: ActivitiesService,
              private carouselService: CarouselService
              ) {}

  ngOnInit(): void {
    this.carouselService.idSelectedActivity$.pipe(
      switchMap(id => id ? this.appService.getActivity(id) : of(null)),
    ).subscribe(activity => this.setActivity(activity));    
  } // end ngOnInit()

  private setActivity(activity: Activities | null): void {
    if(activity) {
      this.activity = activity;
      this.activitiesService.setActivity(activity);
    }
  }
}
