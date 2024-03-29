import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subtask } from '../../../../models/ISubtask';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../app.service';
import { ActivitiesService } from '../../activities.service';
import { User } from '../../../../models/IUser';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Priority } from '../../../../models/IPriority';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, take } from 'rxjs';
import { NotesComponent } from '../notes/notes.component';

/**
 * Componente para obtener las subtareas
 */

@Component({
  selector: 'app-subtask',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NotesComponent],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss'
})
export class SubtaskComponent implements OnInit {
 
  activityID : number = 0; 
  subtasks: Subtask[] = []; // subtareas
  subtask?: Subtask; //
  showSubtasks: boolean = false; // (html) hay subtareas?
  author: {[key: number]: Observable<string>} = {}; // autor de la subtarea
  assigned: {[key: number]: Observable<string>} = {}; // quien la va a realizar
  btnAddSubtask: boolean = true; // mostrar o no le boton de add
  participants: User[] = []; // lista de miembros del grupo
  formGroup: FormGroup = this.formSubtask(); // formulario para editar subtarea
  subtaskEditID: number | null = null; // Comparar con el id de la subtarea
  subtaskShowNotes: number | null = null; // Comparar con el id de la subtarea

  notesShow: boolean = false; //


  constructor(private appService: AppService,
              private activitiesService: ActivitiesService,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef) {}
  
  /**
   * Obtener subtareas autores y asignados
   */
  ngOnInit(): void {
    this.activitiesService.$getActivity.subscribe(activity => {
      if(activity) {
        this.activityID = activity.id;
        this.appService.getSubtasks(activity.id).subscribe(subtasks => {
          if(activity.groupID) {
            this.appService.getParticipantsGroup(activity.groupID)
              .subscribe(participants => this.activitiesService.setParticipants(participants));
          }
          this.activitiesService.setSubtasks(subtasks);
          this.btnAddSubtask = !activity.complete ? true : false;  
        });
      }
    });
    this.activitiesService.$getSubtasks.subscribe(subtasks => {
      if(subtasks) {
        // obtener autor y asignado
        this.getAuthorAndAssigned(subtasks);
        this.subtasks = subtasks;
        this.showSubtasks = true;
      }
    })
  
    // obtener participantes
    this.activitiesService.$getParticipants.subscribe(participants => {
      if(participants) this.participants = participants;
    })
  } // End ngOnInit()

  /**
   * Obtener author y asignado
   * @param subtasks arreglo de subtareas
   */
  private getAuthorAndAssigned(subtasks: Subtask[]): void {
    subtasks.forEach(subtask => {
      this.author[subtask.auth] = this.getAuthor(subtask.auth);
      if(subtask.assignedTo) {
        this.assigned[subtask.assignedTo] = this.getAssignedTo(subtask.assignedTo);
      }
    });
  }

  /**
   * metodo de apoyo
   * @param authID id del autor
   * @returns nombre del autor
   */
  private getAuthor(authID: number): Observable<string> {   
    return this.appService.getUser(authID).pipe(
      map(user => user ? user.name : '- -')
    );
  }

  /**
   * metodo de apoyo
   * @param assignedID id del usuario
   * @returns nombre del usuario
   */
  private getAssignedTo(assignedID: number): Observable<string> {
    return this.appService.getUser(assignedID).pipe(
      map(user => user ? user.name : '- -')
    );
  }

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
      const sendComplete = { 
        complete: checked,
        dateComplete: new Date()
      }
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
   * permite modificar la subtarea seleccionada
   * @param subtask subtarea a editar
   */
  edit(subtask?: Subtask): void {
    if(subtask) {
      this.subtaskEditID = subtask.id;
      this.modifySubtask(subtask);
    }
  }

  /**
   * muestra la informacion en pantalla
   * @param subtaskIO id de la subtare la modificar
   * @returns verdadero o falso
   */
  editSubtask(subtask: Subtask): boolean {
    if(subtask.complete) return false;
    return subtask.id === this.subtaskEditID;
  }

  /**
   * actualiza la subtarea en la BD
   * @param subtaskID id de la subtarea
   * @param activityID id de la actividad principal
   */
  updateSubtask(subtaskID: number, activityID: number): void {
    const assigned = !this.getAssigned.value ? 0 : this.getAssigned.value;
    const data = {
      task: this.getTitle.value,
      assignedTo: assigned,
      priority: this.getPriority.value,
      dateStart: this.getDateStart.value,
      dateEnd: this.getDateEnd.value
    }    

    this.appService.putSubtask(subtaskID, data).subscribe({
      complete: () => {
        this.cancel();
        this.appService.getSubtasks(activityID)
          .subscribe(subtasks => this.activitiesService.setSubtasks(subtasks))
      }
    });
  }

  createSubtask(): void {
    const assigned = this.getAssigned.value ? this.getAssigned.value : 0;
    const newSubtask = {
      task: this.getTitle.value,
      priority: this.getPriority.value,
      dateStart: this.getDateStart.value,
      dateEnd: this.getDateEnd.value,
      auth: 1,
      assignedTo: assigned,
      activityID: this.activityID
    }

    console.log(newSubtask);

    /*
    this.appService.createSubtask(newSubtask).subscribe({
      complete: () => {
        this.appService.getSubtasks(this.activityID)
          .subscribe(subtasks => this.activitiesService.setSubtasks(subtasks))
      }
    })
    */
  }

  // cancelar modificaciones
  cancel(): void {
    this.subtaskEditID = null;
  }

  showNotes(subtaskID: number): void {
    this.subtaskShowNotes === subtaskID ? 
    this.subtaskShowNotes = null : this.subtaskShowNotes = subtaskID;

    this.activitiesService.setShowNotes(this.subtaskShowNotes);
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

  /**
   * @return arreglo de las prioridades
   */
  get priorityInterface(): string[] {
    return Object.keys(Priority).filter(key => isNaN(Number(key)));
  }

  // GETTERS
  get getTitle(): FormControl {
    return this.formGroup.get('title') as FormControl;
  }
  get getAssigned(): FormControl {
    return this.formGroup.get('assignedTo') as FormControl;
  }
  get getDateStart(): FormControl {
    return this.formGroup.get('dateStart') as FormControl;
  }
  get getDateEnd(): FormControl {
    return this.formGroup.get('dateEnd') as FormControl;
  }
  get getPriority(): FormControl {
    return this.formGroup.get('priority') as FormControl;
  }
}
