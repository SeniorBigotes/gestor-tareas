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
  showMoreText: string = '';
  /* fin de función "...más" */

  task?: Activities;
  colorTextProgressClass: string = '';
  textProgress: string = '';

  constructor(private appService: AppService,
              private activities: ActivitiesService,
              private cdr: ChangeDetectorRef
              ) {}

  ngOnInit(): void {
    this.appService.getTasks().subscribe(task => {
      if(task[0]) {
        this.task = task[0];
        this.valueProgressbarColor(task[0]);
      }
    });

    this.activities.$showMore.subscribe(show => {
      this.showMoreText = !show ? 'más' : 'menos';
      this.showMore = show;
    });
    this.activities.$showMoreElement.subscribe(show => {
      this.showMoreElement = show;
      this.cdr.detectChanges();
    });
  } // end ngOnInit()

  toggleReadMore() {
    this.activities.toggleShowMore(!this.showMore);
  }

  private valueProgressbarColor(task: Activities): void {
    if(task) {          
      const progress = task.progress;      
      if(progress === 0) this.progressbarValueData('red', 'Sin empezar');
      if(progress > 0 && progress <= 25) this.progressbarValueData('orange', 'Empezando');
      if(progress > 26 && progress <= 50) this.progressbarValueData('yellow', 'En proceso');
      if(progress > 51 && progress <= 75) this.progressbarValueData('lime', 'En progeso');
      if(progress > 76 && progress < 100) this.progressbarValueData('green', 'Por acabar');
      if(progress === 100) this.progressbarValueData('green', 'completado');
    }
  }

  private progressbarValueData(cssClass: string, txt: string): void {
    this.colorTextProgressClass = cssClass;
    this.textProgress = txt;
  }
}
