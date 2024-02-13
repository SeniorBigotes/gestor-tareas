import { Component, Input, OnInit } from '@angular/core';
import { Activities } from '../../../../models/IActivity';
import { Subtask } from '../../../../models/ISubtask';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../app.service';
import { ActivitiesService } from '../../activities.service';
import { User } from '../../../../models/IUser';

/**
 * Componente de apoyo para activities
 */

@Component({
  selector: 'app-subtask',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss'
})
export class SubtaskComponent implements OnInit {
  
  @Input() id!: number | undefined; // id de la actividad (activity)
  subtasks?: Subtask[]; // subtareas
  showSubtasks: boolean = false; // (html) hay subtareas?
  author: string = '- -'; // quien creo la actividad
  assigned: string = '- -'; // quien la va a realizar

  constructor(private appService: AppService,
              private activitiesService: ActivitiesService) {}
  
  ngOnInit(): void {
    // obtener actividades
    this.activitiesService.$getActivity.subscribe(activity => {
      // obtener subtareas
      if(activity) {
        this.appService.getSubtasks(activity.id).subscribe(subtasks => {
          this.subtasks = subtasks;
          if(subtasks.length > 0) {
            this.showSubtasks = true;
            for(let subtask of subtasks) {
              // obtener usuarios (autor y asignado)
              this.appService.getUser(subtask.auth).subscribe(auth => this.author = auth.name);
              this.appService.getUser(subtask.assignedTo).subscribe(assigned => this.assigned = assigned.name);
            }
          }
        })
      }
    });
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
