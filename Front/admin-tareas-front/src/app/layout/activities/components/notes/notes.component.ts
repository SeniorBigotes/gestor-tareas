import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Note } from '../../../../models/INote';
import { AppService } from '../../../../app.service';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss'
})
export class NotesComponent implements OnInit {
  
  @Input() activityID!: number; //actividad principal
  @Input() subtaskID!: number; // subtarea
  notes: Note[] = []; // lista de notas
  auth: {[key: number]: Observable<string>} = {}; // autor de la nota
  editNoteID: number = 0; // id de la nota a modificar
  showAddNote: boolean = false; // mostrar textarea para agregar
  formGroup: FormGroup = this.formNotes();
  
  isClickHandled: boolean = true; // variable de ayuda para onClick()
  
  constructor(private appService: AppService,
              private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.appService.getNotes(this.activityID, this.subtaskID).subscribe(notes => {
      this.notes = notes;
      notes.forEach(note => this.auth[note.authID] = this.getAuthor(note.authID))
    });
  }

  // animacion para agregar notas
  addNote(): void {
    this.showAddNote = !this.showAddNote;
  }

  // editar nota
  updateNote(note: Note): void {
    this.editNoteID = note.id;
    this.editNote(note);
  }

  // cancelar edicion al dar click en otra parte
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const content = event.target as HTMLElement;
    const noteTextQ = content.closest('.note-gral') !== null;
    const noteTextC = content.closest('.notes') === null;
    const clickNote = !!content.closest('.notes');
    const notesBtn = content.closest('.notes-btn');
    const notesNew = content.closest('.note-new');

    if(!(noteTextC && !noteTextQ) && this.isClickHandled) {
      console.log(`editar: ${this.isClickHandled}`);
      this.editNoteID = 0;
      this.isClickHandled = false;
    } else {
      this.isClickHandled = true;
    }

    if(this.showAddNote) {
      if(!notesBtn && !notesNew && this.showAddNote) this.showAddNote = false;
    }
  }

  // obtener autor de la nota
  private getAuthor(authID: number): Observable<string> {   
    return this.appService.getUser(authID).pipe(
      map(user => user ? user.name : '- -')
    );
  }

  // formulario de las notas
  private formNotes(): FormGroup {
    return this.formGroup = this.fb.group({
      notes: ['', Validators.required],
      activityID: ['', Validators.required],
      subtaskID: ['', Validators.required],
      authID: ['', Validators.required]
    });
  }

  // llenar textarea con la informacion de las notas
  private editNote(note: Note): void {
    this.formGroup.patchValue({
      notes: note.note,
      authID: this.auth[note.authID],
    })
  }

}
