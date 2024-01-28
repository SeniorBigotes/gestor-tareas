import { Component, Input, OnInit } from '@angular/core';
import { Activities } from '../../../../models/IActivity';
import { Subtask } from '../../../../models/ISubtask';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-subtask',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss'
})
export class SubtaskComponent implements OnInit {
  
  @Input() task!: Activities;
  subtasks?: Subtask[];

  constructor(private appService: AppService) {}
  
  ngOnInit(): void {
    if(this.task) this.getSubtasks(this.task);
  }

  private getSubtasks(task: Activities): void {
    const subtask = task.subtask;
    if(subtask) this.subtasks = subtask;
  }

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
