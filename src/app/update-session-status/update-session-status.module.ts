import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateSessionStatusPageRoutingModule } from './update-session-status-routing.module';

import { UpdateSessionStatusPage } from './update-session-status.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    UpdateSessionStatusPageRoutingModule
  ],
  declarations: [UpdateSessionStatusPage]
})
export class UpdateSessionStatusPageModule {}
