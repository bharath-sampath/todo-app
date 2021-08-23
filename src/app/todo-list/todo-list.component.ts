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

  ngModelChecked = false;
  noteForm = new FormGroup({
    selectAll: new FormControl(''),
    newNoteText: new FormControl('',Validators.required),
  });

  constructor(private themeService:ThemeService) { }

  ngOnInit(): void {
    this.themeService.setLightTheme();
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

  }
  onDelete(i:number)
  {
    this.notes.splice(i,1);
  }
  onToggleTheme()
  {
    if (this.themeService.getActiveTheme().name === 'dark') this.themeService.setLightTheme();
    else this.themeService.setDarkTheme();

  }
  onComplete(event:Event,i:number)
  {
    console.log((event.target as HTMLInputElement).checked);
     this.notes[i].noteComplete=(event.target as HTMLInputElement).checked;
  }
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }
}
