import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  addNote()
  {
    let newNoteValue:any=this.noteForm.get("newNoteText").value;
    if (newNoteValue !== "" && newNoteValue !== null)
    {
      this.notes.push(newNoteValue);
      this.noteForm.reset();
    }

  }
  onDelete($Event:Event)
  {
    let index:number = this.notes.indexOf($Event.path[2].children[1].textContent);
    if (index!=-1)
    {
          this.notes.splice(index,1);
        }

  }
}
