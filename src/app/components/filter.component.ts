import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { VISIBILITY_FILTER } from '../model/todo-filter.enum';
import { VISIBILITY_FILTER_VALUES } from '../model/todo-filter-values.function';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StateService } from '../services/state.service';

@UntilDestroy()
@Component({
  selector: 'app-todos-filter',
  template: `
  <mat-form-field appearance="fill">
    <mat-label>Filter</mat-label>
    <mat-select [formControl]="control">
      <mat-option [value]="filter" *ngFor="let filter of filterValues">
      {{filter}}
      </mat-option>
    </mat-select>
  </mat-form-field>
  `,

  styles: [
    `  
  mat-form-field {
    width: 100%;
  }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosFiltersComponent implements OnInit {
  constructor(private s: StateService) {}

  active!: VISIBILITY_FILTER;
  control!: FormControl;
  filterValues = VISIBILITY_FILTER_VALUES;

  ngOnInit() {
    this.active = this.s.OS.snapshot(this.s.OS.S.ACTIVE_FILTER_KEY);
    this.control = new FormControl(this.active);
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe((c) => {
      this.s.OS.put(this.s.OS.S.ACTIVE_FILTER_KEY, c);
    });
  }
}
