import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './services.service';


@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate {

  categoryId:any;

  constructor(private service:ServicesService, private router:Router){
    this.canActivate();
   }

    canActivate(){
     
      if(this.service.isLoggedIn()){
        this.router.navigate(['/view-candidate']);
        return true;
      }else{
      //  this.router.navigate(['/login']);
      this.router.navigate(['/landing-screen']);
        return false;
      }
  }
  
}
