import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCoursesPageRoutingModule } from './view-courses-routing.module';

import { ViewCoursesPage } from './view-courses.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ViewCoursesPageRoutingModule
  ],
  declarations: [ViewCoursesPage]
})
export class ViewCoursesPageModule {}
