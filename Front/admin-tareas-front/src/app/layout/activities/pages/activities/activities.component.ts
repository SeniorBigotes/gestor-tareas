import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Activities } from '../../../../models/IActivity';
import { CarouselActivitiesComponent } from '../../components/carousel-activities/carousel-activities.component';
import { AppService } from '../../../../app.service';
import { CommonModule } from '@angular/common';
import { ActivitiesService } from '../../activities.service';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule,
    HeaderComponent, CarouselActivitiesComponent],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent implements OnInit {

  /* función de "...más" */  
  contentElement?: ElementRef;
  // obtiene datos de la etiqueta seleccionada con plantilla #more
  // ejecuta en setter, recibe la info de la etiqueta como parametro
  @ViewChild('more', {static: false}) set content(content: ElementRef) {
    if(content) {
      this.contentElement = content;
      this.activities.checkOverflow(this.contentElement);
    }
  };
  showMore: boolean = false;
  showMoreElement: boolean = false;
  /* fin de función "...más" */

  task?: Activities;

  constructor(private appService: AppService,
              private activities: ActivitiesService,
              private cdr: ChangeDetectorRef
              ) {}

  ngOnInit(): void {
    this.appService.getTasks().subscribe(task => this.task = task[0]);

    this.activities.$showMore.subscribe(show => this.showMore = show);
    this.activities.$showMoreElement.subscribe(show => {
      this.showMoreElement = show;
      this.cdr.detectChanges();
    });
  } // end ngOnInit()

  toggleReadMore() {
    this.activities.toggleShowMore(!this.showMore);
  }
}
