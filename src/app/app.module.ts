import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialBaseModule } from '@fireflysemantics/material-base-module';
import { TodoComponent } from './components/todo.component';
import { TodosComponent } from './components/todos.component';
import { TodosFiltersComponent } from './components/filter.component';
import { AddTodoComponent } from './components/add.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodosComponent,
    TodosFiltersComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialBaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
