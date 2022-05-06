import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  KeyObsValueReset,
  ObsValueReset,
  OStore,
  EStore,
  OStoreStart,
} from '@fireflysemantics/slice';

import { VISIBILITY_FILTER } from '../model/todo-filter.enum';
import { Todo } from '../model/todo.class';
import { TodoSliceEnum } from '../model/todo-slices.enum';

interface ISTART extends KeyObsValueReset {
  ACTIVE_FILTER_KEY: ObsValueReset;
}

@Injectable({
  providedIn: 'root',
})
export class StateService {
  //============================================
  // Define the Object Store
  //============================================
  START: OStoreStart = {
    ACTIVE_FILTER_KEY: {
      value: VISIBILITY_FILTER.SHOW_ALL,
      reset: VISIBILITY_FILTER.SHOW_ALL,
    },
  };
  public OS: OStore<ISTART> = new OStore(this.START);

  //============================================
  // Observe the Active Filter
  //============================================
  public activeFilter$: Observable<VISIBILITY_FILTER> =
    this.OS.S.ACTIVE_FILTER_KEY.obs;

  //============================================
  // Define the Todo Entity Store
  //============================================
  public todoStore: EStore<Todo> = new EStore<Todo>();
  //============================================
  // Create an Observable Reference
  // to the current set of Todo instances
  //============================================
  public todos$: Observable<Todo[]> = this.todoStore.observe();

  //============================================
  // References for our remaining Observable state
  //============================================
  public completeTodos$: Observable<Todo[]>;
  public incompleteTodos$: Observable<Todo[]>;
  public selectedTodos$: Observable<Todo[]>;

  //============================================
  // Observable state for when all Todo instances
  // have been marked as completed
  //============================================
  public finito$: Observable<boolean>;

  constructor() {
    //============================================
    // Initialize Entity Store Slices
    //============================================
    this.todoStore.addSlice((todo) => todo.completed, TodoSliceEnum.COMPLETE);
    this.todoStore.addSlice(
      (todo) => !todo.completed,
      TodoSliceEnum.INCOMPLETE
    );

    //============================================
    // Observe Entity Store Slices
    //============================================
    this.completeTodos$ = this.todoStore
      .getSlice(TodoSliceEnum.COMPLETE)!
      .observe();

    this.incompleteTodos$ = this.todoStore
      .getSlice(TodoSliceEnum.INCOMPLETE)!
      .observe();

    //============================================
    // Observe the Selected Todo category
    //============================================
    this.selectedTodos$ = combineLatest([
      this.activeFilter$,
      this.completeTodos$,
      this.incompleteTodos$,
      this.todos$,
    ]).pipe(
      map((arr) => {
        return this.applyFilter(arr[0], arr[1], arr[2], arr[3]);
      })
    );

    //============================================
    // Observe whether all Todo instances
    // have been completed
    //============================================
    this.finito$ = combineLatest([this.completeTodos$, this.todos$]).pipe(
      map((arr) => {
        return this.isComplete(arr[0], arr[1]);
      })
    );
  }

  public applyFilter(filter:VISIBILITY_FILTER, completeTodos:Todo[], incompleteTodos:Todo[], todos:Todo[]): Todo[] {
    switch (filter) {
      case VISIBILITY_FILTER.SHOW_COMPLETED:
        return completeTodos;
      case VISIBILITY_FILTER.SHOW_ACTIVE:
        return incompleteTodos;
      default:
        return todos;
    }
  }

  isComplete(completeTodos: Todo[], todos: Todo[]): boolean {
    if (todos.length > 0) {
      return completeTodos.length == todos.length ? true : false;
    }
    return false;
  }

  //============================================
  // State API Methods
  //============================================
  complete(todo: Todo) {
    this.todoStore.put(todo);
  }
  add(title: string) {
    const todo = new Todo(title, false);
    this.todoStore.post(todo);
  }
  delete(todo: Todo) {
    this.todoStore.delete(todo);
  }
}
