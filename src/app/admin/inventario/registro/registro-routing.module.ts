import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LayoutComponent} from '../../../layout/layout.component';
import {GestRegistroComponent} from './gest-registro/gest-registro.component'

const routes: Routes = [
  {
    path: '',
    //component: LayoutComponent,
    children: [
      {
        path: '',
        component: GestRegistroComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
