import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivitiesService } from '../../../activities.service';
import { Activities } from '../../../../../models/IActivity';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../models/IUser';
import { AppService } from '../../../../../app.service';
import { switchMap } from 'rxjs';

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
      this.activitiesService.checkOverflow(this.contentElement);
    }
  };
  showMore: boolean = false;
  showMoreElement: boolean = false;
  showMoreText: string = '';
  /* fin de función "...más" */

  @Input() activity!: Activities;
  authUsername!: string;

  colorTextProgressClass: string = '';
  textProgress: string = '';

  constructor(private activitiesService: ActivitiesService,
              private appService: AppService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.activitiesService.$getActivity.subscribe(activity => {
      if (activity) {
        this.activity = activity;
        this.appService.getUser(activity.auth).subscribe(user => this.authUsername = user.name)
      }
    });
    
    this.valueProgressbarColor(this.activity);
    this.activitiesService.$showMore.subscribe(show => this.method$ShowMore(show));
    this.activitiesService.$showMoreElement.subscribe(show => this.method$ShowMoreElement(show));
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
    this.activitiesService.toggleShowMore(!this.showMore);
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
