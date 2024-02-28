import { Component } from '@angular/core';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent {

  editNote: boolean = false;

  addNote(): void {
    console.log('agregando nota')
  }

  updateNote(): void {
    this.editNote = true;
    console.log('Editando nota');
    
  }

}
