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
import {MarksListComponent} from './components/marks-list/marks-list.component';
import {MarkRoutingModule} from './mark.routing.module';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MarksFormComponent} from './components/marks-form/marks-form.component';
import {MarkComponent} from './containers/mark/mark.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EstatesExternModule} from '../../estates/components/estates-extern/estates-extern.module';

@NgModule({
  declarations: [
    MarksListComponent,
    MarkComponent,
    MarksFormComponent
  ],
    imports: [
        CommonModule,
        MarkRoutingModule,
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
        FontAwesomeModule,
        EstatesExternModule
    ]
})
export class MarkModule {
}
