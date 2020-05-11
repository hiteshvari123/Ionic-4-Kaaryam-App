import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SidebarService, ISidebar } from 'src/app/containers/layout/sidebar/sidebar.service';
import { ApiService } from 'src/app/shared/api.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  sidebar: ISidebar;
  subscription: Subscription;
  profileInfo:any;

  constructor(private sidebarService: SidebarService, private api:ApiService,private userService:UserService) {
      
    this.api.getCdfProfile().subscribe(data => {
      console.log("Data in aPP.ts....",data);
      this.profileInfo=data;
      localStorage.setItem("CDFName",data['fname']+" "+data['lname']);
      this.userService.profileDetails(this.profileInfo);
    })
  }

  ngOnInit() {
    this.subscription = this.sidebarService.getSidebar().subscribe(
      res => {
        this.sidebar = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
