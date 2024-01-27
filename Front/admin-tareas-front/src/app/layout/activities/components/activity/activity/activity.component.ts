import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivitiesService } from '../../../activities.service';
import { Activities } from '../../../../../models/IActivity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent implements OnInit {

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

  @Input() task!: Activities; 

  colorTextProgressClass: string = '';
  textProgress: string = '';

  constructor(private activities: ActivitiesService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.valueProgressbarColor(this.task);
    this.activities.$showMore.subscribe(show => this.method$ShowMore(show));
    this.activities.$showMoreElement.subscribe(show => this.method$ShowMoreElement(show));
  } // End ngOnInit();

  private method$ShowMore(show: boolean, ): void {
    this.showMoreText = !show ? 'más' : 'menos';
    this.showMore = show;
  }
  
  private method$ShowMoreElement(show: boolean): void {
    this.showMoreElement = show;
    this.cdr.detectChanges();
  }
  
  // en html .more
  toggleReadMore() {
    this.activities.toggleShowMore(!this.showMore);
  }

  valueProgressbarColor(task: Activities): void {
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
