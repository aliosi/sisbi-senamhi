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
import { MatCardModule } from '@angular/material/card';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatDialogModule} from '@angular/material/dialog'


import { RegistroRoutingModule } from './registro-routing.module';
import { GestRegistroComponent } from './gest-registro/gest-registro.component';
import { ImportarComponent } from './gest-registro/importar/importar.component';
import { ExcelImpComponent } from './gest-registro/excel-imp/excel-imp.component';


@NgModule({
  declarations: [GestRegistroComponent, ImportarComponent, ExcelImpComponent],
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
    ReactiveFormsModule,
    MatCardModule,
   // BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents : [ImportarComponent,ExcelImpComponent]
})
export class RegistroModule { }
