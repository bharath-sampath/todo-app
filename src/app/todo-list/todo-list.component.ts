import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ThemeService} from '../theme.service';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";
import { light,dark } from '../theme';

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
    this.notes = JSON.parse(this.getCookie("noteArray"));
    if (this.getCookie("theme")==="dark")
    {
      this.themeService.setActiveTheme(dark);
    }
    else
    {
      this.themeService.setActiveTheme(light);
    }
    this.filteredNotes();
  }
  setCookie(name:string,value:string)
  {
    document.cookie= name + "=" + value;
  }

  getCookie(name:string)
  {
    let r=document.cookie.split(';').reduce(function(acc:any, item){
      let c = item.split('=');
      c[0] = c[0].replace(' ', '');
      if (c[0]===name) acc= c[1];
      return acc;
  },[]);
  return r;
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
    this.setCookie("noteArray",JSON.stringify(this.notes));
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
    this.setCookie("noteArray",JSON.stringify(this.notes));
    this.filteredNotes();
  }
  onToggleTheme()
  {
    if (this.themeService.getActiveTheme().name === 'dark') this.themeService.setLightTheme();
    else this.themeService.setDarkTheme();

    this.setCookie("theme",this.themeService.getActiveTheme().name)
  }
  onComplete(note:noteObject,event:Event)
  {
     this.notes[this.notes.indexOf(note)].noteComplete=(event.target as HTMLInputElement).checked;
     this.setCookie("noteArray",JSON.stringify(this.notes));
     this.filteredNotes();
  }
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
    this.setCookie("noteArray",JSON.stringify(this.notes));
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
    this.setCookie("noteArray",JSON.stringify(this.notes));
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
function reduce() {
  throw new Error('Function not implemented.');
}

