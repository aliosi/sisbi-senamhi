import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { RegistroRoutingModule } from './registro-routing.module';
import { GestRegistroComponent } from './gest-registro/gest-registro.component';


@NgModule({
  declarations: [GestRegistroComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistroModule { }
