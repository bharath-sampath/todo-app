import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ThemeService} from '../theme.service';
import { moveItemInArray, CdkDragDrop } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  notes:string[]=[];

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
      this.notes.push(newNoteValue);
      this.noteForm.reset();
    }

  }
  onDelete(note:string)
  {
    let index:number = this.notes.indexOf(note);
    if (index!=-1)
    {
          this.notes.splice(index,1);
        }
  }
  onToggleTheme()
  {
    if (this.themeService.getActiveTheme().name === 'dark') this.themeService.setLightTheme();
    else this.themeService.setDarkTheme();

  }
  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }
}
