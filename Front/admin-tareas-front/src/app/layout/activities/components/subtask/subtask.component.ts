import { Component, Input, OnInit } from '@angular/core';
import { Subtask } from '../../../../models/ISubtask';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../app.service';
import { ActivitiesService } from '../../activities.service';
import { User } from '../../../../models/IUser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Priority } from '../../../../models/IPriority';

/**
 * Componente para obtener las subtareas
 */

@Component({
  selector: 'app-subtask',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
  subtask?: Subtask; //
  showSubtasks: boolean = false; // (html) hay subtareas?
  author: string = '- -'; // quien creo la actividad
  assigned: string = '- -'; // quien la va a realizar
  btnAddSubtask: boolean = true; // mostrar o no le boton de add
  participants?: User[]; // lista de miembros del grupo
  formGroup: FormGroup = this.formSubtask(); // formulario para editar subtarea
  subtaskEditID: number | null = null;

  constructor(private appService: AppService,
              private activitiesService: ActivitiesService,
              private fb: FormBuilder) {}
  
  /**
   * Obtener subtareas autores y asignados
   */
  ngOnInit(): void {
    this.activitiesService.$getActivity.subscribe(activity => {
      if(activity) this.appService.getSubtasks(activity.id).subscribe(subtasks => {
        if(activity.groupID) this.appService.getParticipantsGroup(activity.groupID)
                                  .subscribe(participants => this.activitiesService.setParticipants(participants));
        this.activitiesService.setSubtasks(subtasks);
        this.btnAddSubtask = !activity.complete ? true : false;  
      });
    });
    this.activitiesService.$getSubtasks.subscribe(subtasks => {
      if(subtasks) {
        this.showSubtasks = true;
        this.subtasks = subtasks;
        for(let subtask of subtasks) {
          if(subtask.assignedTo) this.appService.getUser(subtask.assignedTo).subscribe(assigned => this.assigned = assigned.name);
          this.appService.getUser(subtask.auth).subscribe(auth => this.author = auth.name);
        }
      }
    })

    this.activitiesService.$getParticipants.subscribe(participants => {
      if(participants) {
        this.participants = participants
      }
    })
    
  } // End ngOnInit()

  /**
   * establece el color de la propridad
   * @param subtask parametro donde se obtiene la subtarea
   * @returns clase en html para dar color a la prioridad
   */
  priority(subtask: Subtask): string {
    const priority = subtask.priority;
    switch(priority) {
      case 'Alta': return 'red';
      case 'Media': return 'yellow';
      case 'Baja': return 'blue';
      default: return 'white';
    }
  }

  /**
   * retorna si la subtarea esta completada o no (ckeckbox)
   * actualiza las subtareas al marcar el ckeckbox
   * @param subtask recibe subtarea
   * @param boolean si es para actualizar o retornar
   * @returns subtarea terminada o no
   */

  checked(subtask: Subtask, update?: boolean): boolean{
    let checked = subtask.complete;
    if(update) {
      checked = !checked;
      //actualizar si subtarea esta completada
      const sendComplete = { complete: checked }
      this.appService.putStatusSubtask(subtask.id, sendComplete).subscribe({
        complete: () => {
          this.appService.getSubtasks(subtask.activityID)
            .subscribe(subtasks => this.activitiesService.setSubtasks(subtasks))
        }
      });
    }
    return checked;
  }

  /**
   * se ejecuta al dar click en editar
   * @param subtask subtarea a editar
   */
  edit(subtask?: Subtask): void {
    if(subtask) {
      this.subtaskEditID = subtask.id;
      this.modifySubtask(subtask);
    }
  }

  /**
   * permite modificar la subtarea seleccionada
   * @param subtaskIO id de la subtare la modificar
   * @returns verdadero o falso
   */
  editSubtask(subtaskIO: number): boolean {
    return subtaskIO === this.subtaskEditID;
  }

  /**
   * @return arreglo de las prioridades
   */
  get priorityInterface(): string[] {
    return Object.keys(Priority).filter(key => isNaN(Number(key)));
  }

  /** formulario para editar
   * @returns form builder
   */
  private formSubtask(): FormGroup {
    return this.formGroup = this.fb.group({
      title: ['', Validators.required],
      dateStart: ['', Validators.required],
      dateEnd: ['', Validators.required],
      assignedTo: ['', Validators.required],
      priority: ['', Validators.required]
    })
  }
  
  // actualizar subtarea
  private modifySubtask(subtask: Subtask): void {
    // dar formato a las fechas
    const dateStart = new Date(subtask.dateStart);
    const dateEnd = new Date(subtask.dateEnd);
    
    this.formGroup.patchValue({
      title: subtask.task,
      assignedTo: subtask.assignedTo,
      dateStart: dateStart.toISOString().split('T')[0],
      dateEnd: dateEnd.toISOString().split('T')[0],
      priority: subtask.priority
    })
  }
}
