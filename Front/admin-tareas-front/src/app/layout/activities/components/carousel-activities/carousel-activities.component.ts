import { Component } from '@angular/core';
import { Activities } from '../../../../models/IActivity';
import { DataCarousel } from '../../../home/Interfaces';
import { AppService } from '../../../../app.service';
import { CarouselComponent } from '../../../../shared/carousel/components/carousel.component';

@Component({
  selector: 'app-carousel-activities',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './carousel-activities.component.html',
  styleUrl: './carousel-activities.component.scss'
})
export class CarouselActivitiesComponent {

  activities: Activities[] = []
  dataCarousel?: DataCarousel;
  itemsCarousel: Array<DataCarousel> = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
      this.appService.getTasks().subscribe(tasks => this.convertData(tasks));
  } // end ngOnInit()

  private convertData(tasks: Activities[]): void {
    for(let task of tasks) {
      this.dataCarousel = {
        name: task.task,
        info: task.dateEnd,
        footer: task.progress,
        progressbar: true,
      }
      this.itemsCarousel.push(this.dataCarousel);
    }
  }
}
