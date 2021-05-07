import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../../page-not-found/page-not-found.component';
import {NgModule} from '@angular/core';
import {LayoutComponent} from '../../layout/layout.component';
import {RolGuard} from '../../guards/rol.guard';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      // canActivateChild: [RolGuard],
      path: 'internos',
      loadChildren: () => {
        return import('./components/estates-intern/estates-intern.module')
          .then(m => m.EstatesInternModule);
      },
    },
    {
      canActivate: [RolGuard],
      path: 'externos',
      loadChildren: () => {
        return import('./components/estates-extern/estates-extern.module')
          .then(m => m.EstatesExternModule);
      },
    },
    {
      path: '**',
      component: PageNotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstatesRoutingModule {
}
