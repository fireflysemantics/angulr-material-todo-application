import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    OnDestroy,
  } from '@angular/core';
  import { Todo } from '../model/todo.class';
  import { StateService } from '../services/state.service';
  import { FormControl } from '@angular/forms';
  import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
  
  @UntilDestroy()
  @Component({
    selector: 'app-todo',
    template: `
    <div class="fs-Todo">
    <div style="display: flex">
        <mat-checkbox [formControl]="control">{{todo.title}}</mat-checkbox>
    </div>
  <button mat-mini-fab color="warn" (click)="delete()" aria-label="Delete Button">
  <mat-icon>delete_forever</mat-icon>
  </button>
  </div>
    `,
    styles: [
      ` :host { display: flex; width: 100%; }
        .fs-Todo { 
            width: 100%;
            justify-content: space-between;
            display: flex; 
            align-items: center; }`,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class TodoComponent implements OnInit, OnDestroy {
    constructor(private s: StateService) {}
    control!: FormControl;
    @Input() todo!: Todo;
    complete() {
      this.s.complete(this.todo);
    }
    delete() {
      this.s.delete(this.todo);
    }
    ngOnInit() {
      this.control = new FormControl(this.todo.completed);
      this.control.valueChanges
        .pipe(untilDestroyed(this))
        .subscribe((completed: boolean) => {
          this.todo.completed = completed;
          this.complete();
        });
    }
    ngOnDestroy() {}
  }
  