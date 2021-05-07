import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from '../../../layout/layout.component';
import {MarksModelsListComponent} from './components/marks-models-list/marks-models-list.component';
import {MarkModelComponent} from './containers/mark-model/mark-model.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MarksModelsListComponent
      },
      {
        path: 'nuevo',
        component: MarkModelComponent
      },
      {
        path: 'editar/:id',
        component: MarkModelComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarksModelRoutingModule {
}
