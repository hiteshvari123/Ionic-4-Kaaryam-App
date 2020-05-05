import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { LayoutContainersModule } from './containers/layout/layout.containers.module';
import { ApiService } from './shared/api.service';
import { ActiveGuard } from './shared/active.guard';
import { UserService } from './shared/user.service';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoComponentComponent } from './views/app/demo-component/demo-component.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    ViewsModule, 
    AppRoutingModule,
    LayoutContainersModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),

   
   ReactiveFormsModule,
   FormsModule
  ],
  
  providers: [
    ApiService,
    ActiveGuard,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
