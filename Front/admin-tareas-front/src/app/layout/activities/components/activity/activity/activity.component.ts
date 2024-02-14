import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivitiesService } from '../../../activities.service';
import { Activities } from '../../../../../models/IActivity';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../../app.service';
import { ActionButtonsComponent } from '../../action-buttons/action-buttons.component';

/**
 * Componente de apoyo para activitiesComponent
 */

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule, ActionButtonsComponent],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent implements OnInit {

  /** funcionalidad de "...más"
   * @type {ElementRef} informacion de la etiqueta o elemento seleccionado con #more
   * @description "@ViewChild" ejecuta un setter, recibe la información de la etiqueta "contentElement" como parametro
   * (muestra el elemento de ...más cuando hay mucho texto en la descripción de la actividad)
   */

  contentElement?: ElementRef;
  @ViewChild('more', {static: false}) set content(content: ElementRef) {
    if(content) {
      this.contentElement = content;
      this.activitiesService.checkOverflow(this.contentElement);
    }
  };

  /**
   * @description variables para mostrar u ocultar el elemento ...mas
   * @type {boolean} mostrar u ocultar el elemento ...más
   * @type {string} mostrar entre ...mas o ...menos
   */
  showMore: boolean = false; // intercambio de clases
  showMoreElement: boolean = false; // mostrar o no el elemento que contiene a "...más"
  showMoreText: string = ''; // mostrar entre "."..más" o "...menos"
  /* fin de función "...más" */

  activity!: Activities; // Datos a recibir
  authUsername!: string; // Nombre del autor de la actividad
  groupName: string = '- -'; // Nombre del grupo que creó la actividad

  colorTextProgressClass: string = ''; // Alternar entre colores en el texto "en progreso"
  textProgress: string = ''; // alternar texto "en progrso", "por acabar", etc...

  constructor(private activitiesService: ActivitiesService,
              private appService: AppService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // obtener datos de la actividad
    this.activitiesService.$getActivity.subscribe(activity => {
      if (activity) {
        this.activity = activity;
        this.valueProgressbarColor(this.activity);
        // Obtener autor de la actividad
        this.appService.getUser(activity.auth).subscribe(user => this.authUsername = user.name)
        // obtener grupo de la actividad
        if(activity.groupID) {
          this.appService.getGroup(activity.groupID).subscribe(group => this.groupName = group.name);
        } else {
          this.groupName = '- -'
        }
      }
    });

    this.activitiesService.$showMore.subscribe(show => this.method$ShowMore(show));
    this.activitiesService.$showMoreElement.subscribe(show => this.method$ShowMoreElement(show));
  } // End ngOnInit();


  // alterna entre texto y clases (html)
  private method$ShowMore(show: boolean, ): void {
    this.showMoreText = !show ? 'más' : 'menos';
    this.showMore = show;
  }
  
  // Decidir entre mostrar o no el elemento "...más"
  private method$ShowMoreElement(show: boolean): void {
    this.showMoreElement = show;
    this.cdr.detectChanges();
  }
  
  // en html .more
  toggleReadMore() {
    this.activitiesService.toggleShowMore(!this.showMore);
  }

  // metodo que cambia los colores y texto dependiendo del %
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

  // metodo de apyo para valueProgressbarColor(); 
  private progressbarValueData(cssClass: string, txt: string): void {
    this.colorTextProgressClass = cssClass;
    this.textProgress = txt;
  }
}
