import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../../../material/material.module';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EstatesInternRoutingModule} from './estates-intern-routing.module';
import {EstatesListComponent} from './estates-list/estates-list.component';
import {EstatesFormComponent} from './estates-form/estates-form.component';
import {EstateComponent} from '../../containers/estate/estate.component';
import {RequestChangeComponent} from './childs/request-change/containers/request-change/request-change.component';
import {RequestChangeListComponent} from './childs/request-change/components/request-change-list/request-change-list.component';
import {RequestChangeFormComponent} from './childs/request-change/components/request-change-form/request-change-form.component';
import {EstatesImportFormComponent} from './estates-import-form/estates-import-form.component';
import {RequestChangeUserListComponent} from './childs/request-change/components/request-change-user-list/request-change-user-list.component';
import {EstatesZonalesListComponent} from './estates-zonales-list/estates-zonales-list.component';


@NgModule({
  declarations: [
    EstatesListComponent,
    EstatesFormComponent,
    EstateComponent,
    RequestChangeComponent,
    RequestChangeListComponent,
    RequestChangeFormComponent,
    EstatesImportFormComponent,
    RequestChangeUserListComponent,
    EstatesZonalesListComponent

  ],
    imports: [
        CommonModule,
        EstatesInternRoutingModule,
        ReactiveFormsModule,
        MaterialModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        FontAwesomeModule,
        FormsModule
    ]
})
export class EstatesInternModule {
}
