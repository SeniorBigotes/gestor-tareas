import { Component, Input, OnInit } from '@angular/core';
import { Activities } from '../../../../models/IActivity';
import { Subtask } from '../../../../models/ISubtask';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../app.service';
import { ActivitiesService } from '../../activities.service';
import { User } from '../../../../models/IUser';

/**
 * Componente para obtener las subtareas
 */

@Component({
  selector: 'app-subtask',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss'
})
export class SubtaskComponent implements OnInit {

  /**
   * @type {Subtask} subtareas de la actividad principal
   * @type {boolean} mostrar subtareas
   * @type {string} autores y asignados
  */
  
  subtasks: Subtask[] = []; // subtareas
  showSubtasks: boolean = false; // (html) hay subtareas?
  author: string = '- -'; // quien creo la actividad
  assigned: string = '- -'; // quien la va a realizar

  constructor(private appService: AppService,
              private activitiesService: ActivitiesService) {}
  
    /**
     * Obtener subtareas autores y asignados
     */

  ngOnInit(): void {
    this.activitiesService.$getActivity.subscribe(activity => {
      if(activity) this.appService.getSubtasks(activity.id).subscribe(subtasks => this.activitiesService.setSubtasks(subtasks));
    });

    this.activitiesService.$getSubtasks.subscribe(subtasks => {
      if(subtasks) {
        this.showSubtasks = true;
        this.subtasks = subtasks;
        subtasks.forEach(subtask => {
          if(subtask.assignedTo) this.appService.getUser(subtask.assignedTo).subscribe(assigned => this.assigned = assigned.name);
          this.appService.getUser(subtask.auth).subscribe(auth => this.author = auth.name);
        })
      }
    })
    
  } // End ngOnInit()

  priority(subtask: Subtask): string {
    const priority = subtask.priority;
    switch(priority) {
      case 'Alta': return 'red';
      case 'Media': return 'yellow';
      case 'Baja': return 'blue';
      default: return 'white';
    }
  }

  checked(subtask: Subtask): boolean {
    if(subtask) return subtask.complete ? true : false;
    return false;
  }

  taskComplete(subtask: Subtask) {
    // cambio de status al dar click al checkbox
  }
}
