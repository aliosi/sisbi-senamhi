import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from '../../../../layout/layout.component';
import {EstatesExternListComponent} from './estates-extern-list/estates-list.component';
import {EstateExternComponent} from '../../containers/estate-extern/estate.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: EstatesExternListComponent
      },
      // {
      //   path: 'lista',
      //   component: EstatesExternListComponent
      // },
      {
        path: 'nuevo',
        component: EstateExternComponent
      },
      {
        path: 'editar/:id',
        component: EstateExternComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstatesExternRoutingModule {
}
