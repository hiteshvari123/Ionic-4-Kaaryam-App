import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingScreenPageRoutingModule } from './landing-screen-routing.module';

import { LandingScreenPage } from './landing-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingScreenPageRoutingModule
  ],
  declarations: [LandingScreenPage]
})
export class LandingScreenPageModule {}
