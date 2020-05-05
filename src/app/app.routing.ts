import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewsComponent } from './views/views.component';
import { DemoComponentComponent } from './views/app/demo-component/demo-component.component';


const routes: Routes = [
  { path: '', loadChildren: () => import('./views/views.module').then(m => m.ViewsModule) },

  // {path:'container',loadChildren:()=>import('./containers/container.module').then(m=>m.ContainerModule)}
  // {path:'demo',component:DemoComponentComponent}
  // {path:'my_profile', component:MyProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
     