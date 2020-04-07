import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCandidatePageRoutingModule } from './view-candidate-routing.module';

import { ViewCandidatePage } from './view-candidate.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCandidatePageRoutingModule,
    TranslateModule
  ],
  declarations: [ViewCandidatePage]
})
export class ViewCandidatePageModule {}
