import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from '../../../layout/layout.component';
import {SubCategoryListComponent} from './components/sub-category-list/sub-category-list.component';
import {SubCategoryComponent} from './containers/sub-category/sub-category.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: SubCategoryListComponent
      },
      {
        path: 'nuevo',
        component: SubCategoryComponent
      },
      {
        path: 'editar/:id',
        component: SubCategoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule {
}
