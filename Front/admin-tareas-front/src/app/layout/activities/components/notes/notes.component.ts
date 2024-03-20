import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Note } from '../../../../models/INote';
import { AppService } from '../../../../app.service';
import { Observable, count, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivitiesService } from '../../activities.service';

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
  idSubtask: number | null = null; // comparar y mostrar notas (general)
  
  count: number = 0; // variable de ayuda para onClick()
  
  constructor(private appService: AppService,
              private activitiesService: ActivitiesService,
              private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.appService.getNotes(this.activityID, this.subtaskID).subscribe(notes => {
      this.notes = notes;
      notes.forEach(note => this.auth[note.authID] = this.getAuthor(note.authID))
    });

    this.activitiesService.$getshowNotes.subscribe(id => this.idSubtask = id);
  }

  // animacion para agregar notas
  addNote(): void {
    this.showAddNote = !this.showAddNote;
  }

  // editar nota
  selectNote(note: Note): void {
    this.editNoteID = note.id;
    this.editNote(note);    
  }

  action(noteID: number): void {
    // console.log(this.getNote.value);
    this.getNote.value.trim() === '' ? 
      this.deleteNote(noteID) : this.updateNote(noteID);
  }

  // cancelar edicion al dar click en otra parte
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {

    if(!(this.getNewNote.value.trim() === '')) this.createNote();

    const content = event.target as HTMLElement;
    const upNotes = content.closest('#notes');
    const notesBtn = content.closest('.notes-btn');
    const notesNew = content.closest('.note-new');

    // logica para quitar seleccin al dar clock en otro lado
    !upNotes ? this.count += 1 : 
      this.count > 1 ? this.count = 0 : null;

    if(this.count > 1) {
      this.editNoteID = 0;
      this.count = 0;
    }

    // logica para visualizar "crear notas"
    if(this.showAddNote)
      if(!notesBtn && !notesNew && this.showAddNote) 
        this.showAddNote = false;
  }

  private createNote(): void {
    const newNote = {
      note: this.getNewNote.value,
      activityID: this.activityID,
      subtaskID: this.subtaskID,
      authID: 2
    }

    // enviar nueva nota
    this.appService.postNote(newNote).subscribe({
      complete: () => this.appService.getNotes(this.activityID, this.subtaskID).subscribe(notes => {
        this.notes = notes;
        notes.forEach(note => this.auth[note.authID] = this.getAuthor(note.authID));
      })
    });

    this.formGroup.patchValue({ newNote: '' });
  }

  // actualizar notas
  private updateNote(noteID: number): void  {
    const note = {
      note: this.getNote.value
    }
    this.appService.putNote(noteID, note).subscribe(() => {
      this.appService.getNotes(this.activityID, this.subtaskID)
                        .subscribe(notes => this.notes = notes)
        }
      );
    this.editNoteID = 0;
  }

  // eliminar notas
  private deleteNote(noteID: number): void {
    this.appService.deleteNote(noteID).subscribe({
      complete: () => this.appService.getNotes(this.activityID, this.subtaskID)
                                        .subscribe(notes => this.notes = notes)
    });
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
      note: ['', Validators.required],
      newNote: ['', Validators.required],
      activityID: ['', Validators.required],
      subtaskID: ['', Validators.required],
      authID: ['', Validators.required]
    });
  }

  // llenar textarea con la informacion de las notas
  private editNote(note: Note): void {
    this.formGroup.patchValue({
      note: note.note,
      authID: this.auth[note.authID],
      newNote: ''
    })
  }

  // GETTERS
  get getNewNote(): FormControl {
    return this.formGroup.get('newNote') as FormControl;
  }

  get getNote(): FormControl {
    return this.formGroup.get('note') as FormControl;
  }

}
