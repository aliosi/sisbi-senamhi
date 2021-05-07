import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../material/material.module';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MarksModelRoutingModule} from './marks-model.routing.module';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MarksModelsFormComponent} from './components/marks-models-form/marks-models-form.component';
import {MarksModelsListComponent} from './components/marks-models-list/marks-models-list.component';
import {MarkModelComponent} from './containers/mark-model/mark-model.component';

@NgModule({
  declarations: [
    MarksModelsFormComponent,
    MarksModelsListComponent,
    MarkModelComponent
  ],
  imports: [
    CommonModule,
    MarksModelRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    FontAwesomeModule
  ]
})
export class MarksModelsModule {
}
