import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Activities } from '../../../../models/IActivity';
import { CarouselActivitiesComponent } from '../../components/carousel-activities/carousel-activities.component';
import { AppService } from '../../../../app.service';
import { CommonModule } from '@angular/common';
import { ActivitiesService } from '../../activities.service';
import { ActivityComponent } from '../../components/activity/activity/activity.component';
import { SubtaskComponent } from '../../components/subtask/subtask.component';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule,
    HeaderComponent, CarouselActivitiesComponent, ActivityComponent, SubtaskComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent implements OnInit {

  task?: Activities;

  constructor(private appService: AppService,
              private activities: ActivitiesService,
              private cdr: ChangeDetectorRef
              ) {}

  ngOnInit(): void {
    this.appService.getTasks().subscribe(task => { if(task[0]) this.task = task[0] });
  } // end ngOnInit()
}
