import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './compontents/search-bar/search-bar.component';
import { FilterModalComponent } from './compontents/filter-modal/filter-modal.component';
import { TableComponent } from './compontents/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    FilterModalComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
