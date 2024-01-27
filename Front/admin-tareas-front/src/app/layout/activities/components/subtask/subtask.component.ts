import { Component, Input, OnInit } from '@angular/core';
import { Activities } from '../../../../models/IActivity';
import { Subtask } from '../../../../models/ISubtask';

@Component({
  selector: 'app-subtask',
  standalone: true,
  imports: [],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss'
})
export class SubtaskComponent implements OnInit {
  
  @Input() task!: Activities;
  subtasks?: Subtask[];
  
  ngOnInit(): void {
    if(this.task) this.getSubtasks(this.task);
    console.log(this.subtasks)
  }

  private getSubtasks(task: Activities): void {
    const subtask = task.subtask;
    if(subtask) this.subtasks = subtask;
  }
}
