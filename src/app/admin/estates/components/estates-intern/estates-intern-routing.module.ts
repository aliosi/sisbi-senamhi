import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from '../../../../layout/layout.component';
import {EstatesListComponent} from './estates-list/estates-list.component';
import {EstateComponent} from '../../containers/estate/estate.component';
import {RequestChangeListComponent} from './childs/request-change/components/request-change-list/request-change-list.component';
import {RequestChangeFormComponent} from './childs/request-change/components/request-change-form/request-change-form.component';
import {RequestChangeComponent} from './childs/request-change/containers/request-change/request-change.component';
import {EstatesImportFormComponent} from './estates-import-form/estates-import-form.component';
import {AuthGuard} from '../../../../guards/auth.guard';
import {RolGuard} from '../../../../guards/rol.guard';
import {RequestChangeUserListComponent} from './childs/request-change/components/request-change-user-list/request-change-user-list.component';
import {EstatesZonalesListComponent} from './estates-zonales-list/estates-zonales-list.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {

        path: '',
        component: EstatesListComponent
      },
      {
        canActivate: [RolGuard],
        path: 'lista/:id&:descripcion',
        component: EstatesListComponent
      },
      {
        path: 'listazonales',
        component: EstatesZonalesListComponent
      },
      {
        canActivate: [RolGuard],
        path: 'nuevo',
        component: EstateComponent
      },
      {
        canActivate: [RolGuard],
        path: 'editar/:id',
        component: EstateComponent
      },
      {
        canActivate: [RolGuard],
        path: 'solicitudes',
        component: RequestChangeListComponent
      },
      // {
      //   path: 'mis-solicitudes',
      //   component: RequestChangeUserListComponent
      // },
      {
        path: 'solicitud/:creacion',
        component: EstateComponent
      },
      {
        canActivate: [RolGuard],
        path: 'validacionsolicitud/:validacion',
        component: EstateComponent
      },
      {
        canActivate: [RolGuard],
        path: 'importar',
        component: EstatesImportFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstatesInternRoutingModule {
}
