import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from '../../../layout/layout.component';
import {MarksListComponent} from './components/marks-list/marks-list.component';
import {MarkComponent} from './containers/mark/mark.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MarksListComponent
      },
      {
        path: 'lista',
        component: MarksListComponent
      },
      {
        path: 'nuevo',
        component: MarkComponent
      },
      {
        path: 'editar/:id',
        component: MarkComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarkRoutingModule {
}
