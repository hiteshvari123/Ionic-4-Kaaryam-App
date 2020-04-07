import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCoursesPage } from './view-courses.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCoursesPageRoutingModule {}
