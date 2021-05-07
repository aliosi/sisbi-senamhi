import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
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
import {EstatesExternRoutingModule} from './estates-extern-routing.module';
import {EstatesExternFormComponent} from './estates-extern-form/estates-form.component';
import {EstatesExternListComponent} from './estates-extern-list/estates-list.component';
import {EstateExternComponent} from '../../containers/estate-extern/estate.component';


@NgModule({
    declarations: [
        EstatesExternFormComponent,
        EstatesExternListComponent,
        EstateExternComponent,

    ],
    exports: [
        EstatesExternFormComponent
    ],
    imports: [
        CommonModule,
        EstatesExternRoutingModule,
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
        FontAwesomeModule
    ]
})
export class EstatesExternModule { }
