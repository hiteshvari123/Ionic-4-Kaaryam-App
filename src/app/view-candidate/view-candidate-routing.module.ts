import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCandidatePage } from './view-candidate.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCandidatePage
    // outlet:'view-candidate'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCandidatePageRoutingModule {}
