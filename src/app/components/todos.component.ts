import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-todos',
  template: `
  <h2 style="font-family: lato">Todos:</h2>
  <mat-list>
      <mat-list-item *ngFor="let todo of s.selectedTodos$ | async;"> 
          <app-todo [todo]="todo"></app-todo>
      </mat-list-item>
 </mat-list>`,
  styles: ['mat-list-item { width: 100%}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  constructor(public s: StateService) {}
}
