import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestReportSinInveComponent} from './gest-report-sin-inve/gest-report-sin-inve.component';

const routes: Routes = [
  {
    path: '',
    //component: LayoutComponent,
    children: [
      {
        path: '',
        component: GestReportSinInveComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportSinInveRoutingModule { }
