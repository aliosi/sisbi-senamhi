import {ExtraOptions, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout/layout.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule),
  },
  {

    path: 'auth',
    loadChildren: () => import('./auth/users/user.module')
      .then(m => m.UserModule),
    //   },
    // ],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

const config: ExtraOptions = {
  useHash: true,
  preloadingStrategy: PreloadAllModules
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config
  )],
  exports: [RouterModule],
})

export class AppRoutingModule {
}


