import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateSessionStatusPage } from './update-session-status.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateSessionStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateSessionStatusPageRoutingModule {}
