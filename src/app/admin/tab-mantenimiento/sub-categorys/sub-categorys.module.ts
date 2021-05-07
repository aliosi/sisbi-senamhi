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
import {SubCategoryListComponent} from './components/sub-category-list/sub-category-list.component';
import {SubCategoryRoutingModule} from './sub-category.routing.module';
import {SubCategoryComponent} from './containers/sub-category/sub-category.component';
import {SubCategoryFormComponent} from './components/sub-category-form/sub-category-form.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    SubCategoryListComponent,
    SubCategoryComponent,
    SubCategoryFormComponent
  ],
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
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
export class SubCategorysModule { }
