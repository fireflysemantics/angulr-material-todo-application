import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-add-todo',
  template: `
  <mat-form-field appearance="fill">
  <mat-label>Add Todo</mat-label>
  <input [formControl]="titleControl" type="text" matInput placeholder="Add Todo..." (keydown.enter)="addTodo()"/>
  <mat-icon matPrefix>add_box</mat-icon>
</mat-form-field>`,
  styles: [
    `mat-icon {
    transform: scale(1.5);
    padding-right: 1rem;
  }
  
  mat-form-field {
    width: 100%;
  }
  `,
  ],
})
export class AddTodoComponent {
  constructor(public s: StateService) {}
  titleControl: FormControl = new FormControl(null);

  addTodo() {
    this.s.add(this.titleControl.value);
    this.titleControl.reset();
  }
}
