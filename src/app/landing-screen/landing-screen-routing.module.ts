import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingScreenPage } from './landing-screen.page';

const routes: Routes = [
  {
    path: '',
    component: LandingScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingScreenPageRoutingModule {}
