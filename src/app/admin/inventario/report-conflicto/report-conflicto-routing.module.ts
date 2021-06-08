import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GestReportConflictoComponent} from './gest-report-conflicto/gest-report-conflicto.component'

const routes: Routes = [
  {
    path: '',
    //component: LayoutComponent,
    children: [
      {
        path: '',
        component: GestReportConflictoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportConflictoRoutingModule { }
