import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ThemeService} from '../theme.service';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";

export class noteObject{
  note:string="";
  noteComplete:boolean=false;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {

  notes:noteObject[]=[];
  filtNotes:noteObject[]=[];
  allFilter:boolean=true;
  compFilter:boolean=false;
  activeFilter:boolean=false;

  noteForm = new FormGroup({
    selectAll: new FormControl(''),
    newNoteText: new FormControl('',Validators.required),
  });

  constructor(private themeService:ThemeService) { }

  ngOnInit(): void {
    this.themeService.setLightTheme();
    this.filteredNotes();
  }

  addNote()
  {
    let newNoteValue:any=this.noteForm.get("newNoteText")?.value;
    if (newNoteValue !== "" && newNoteValue !== null)
    {
      let newNote= new noteObject;
      newNote.note=newNoteValue;
      newNote.noteComplete=false;
      this.notes.push(newNote);
      this.noteForm.reset();
    }
    this.filteredNotes();
  }
  filteredNotes()
  {
    if (this.activeFilter) this.filtNotes=this.notes.filter(this.activeNotes);
    if (this.allFilter) this.filtNotes=this.notes.filter(this.allNotes);
    if (this.compFilter) this.filtNotes=this.notes.filter(this.compNotes);
  }
  onDelete(note:noteObject)
  {
    this.notes.splice(this.notes.indexOf(note),1);
    this.filteredNotes();
  }
  onToggleTheme()
  {
    if (this.themeService.getActiveTheme().name === 'dark') this.themeService.setLightTheme();
    else this.themeService.setDarkTheme();

  }
  onComplete(note:noteObject,event:Event)
  {  
     this.notes[this.notes.indexOf(note)].noteComplete=(event.target as HTMLInputElement).checked;
     this.filteredNotes();
  }
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
    this.filteredNotes();
  }
  activeNotes(note:noteObject)
  {
    return !note.noteComplete;
  }
  allNotes(note:noteObject)
  {
    return true;
  }
  compNotes(note:noteObject)
  {
    return note.noteComplete;
  }
  calculateCount()
  {
    return this.notes.filter(this.activeNotes).length;
  }
  onClear()
  {
    while ( this.notes.findIndex(e => e.noteComplete === true ) >= 0 )
      this.notes.splice( this.notes.findIndex(f => f.noteComplete===true),1);
    
    
    this.filteredNotes();
  }
  onSelectAll(event:Event)
  {
    this.notes.forEach(e => e.noteComplete=(event.target as HTMLInputElement).checked);
    this.filteredNotes;
  }
  onFilterClick(filter:string)
  {
    switch (filter) 
    {
      case 'All':
            this.allFilter=true;
            this.activeFilter=false;
            this.compFilter=false;    
            this.filteredNotes();        
            break;
      case 'Act':
          this.allFilter=false;
          this.activeFilter=true;
          this.compFilter=false; 
          this.filteredNotes();         
          break;
      case 'Comp':
          this.allFilter=false;
          this.activeFilter=false;
          this.compFilter=true;
          this.filteredNotes();          
          break;
    }
  }
}
