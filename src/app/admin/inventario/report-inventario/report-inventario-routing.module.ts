import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GestReportInvComponent} from './gest-report-inv/gest-report-inv.component'

const routes: Routes = [
  {
    path: '',
    //component: LayoutComponent,
    children: [
      {
        path: '',
        component: GestReportInvComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportInventarioRoutingModule { }
