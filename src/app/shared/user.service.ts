import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Location } from "@angular/common";
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UserService {
  userToken: any;
  cdfDetails: any;
  categoryId: any;
  categoryData: any;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public location: Location,
  ) {
    console.log("User Service get Called...")
  }

  isLoggedIn(): boolean {
   // this.userToken = localStorage.getItem("token");
    this.cdfDetails =JSON.parse(localStorage.getItem("cdfData"));

    if (this.cdfDetails) {
      // let url: string = this.location.path();      
      this.router.navigate(["/app/dashboards"]);
      return true;
    } 
     else {
      return false;
    }
  }

  private profile = new BehaviorSubject(" ")
  profileData = this.profile.asObservable();
  profileDetails(data: any) {
    this.profile.next(data);
    console.log("in Service....",data);
  //  localStorage.setItem('pinCode',data.pinCode);
  }
}
