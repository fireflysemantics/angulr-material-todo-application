import { Component } from '@angular/core';
import { VISIBILITY_FILTER_VALUES } from './model/todo-filter-values.function';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-slice-todo-material';
  constructor(public s:StateService) {
    console.log(VISIBILITY_FILTER_VALUES)
  }
}
