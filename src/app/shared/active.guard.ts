import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate {


  constructor(private userservice:UserService, private router:Router){
    console.log("Active Guard Service get called...")
    this.canActivate();
   }

    canActivate(){
      if(this.userservice.isLoggedIn()){
        return true;
      }else{
        this.router.navigate(['/user/login'])
      }
  }
  
}
