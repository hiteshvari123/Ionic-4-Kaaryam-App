import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../providers/api.service';
import { ServicesService } from '../providers/services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  getId:any;
  profileInfo:any;


  constructor(public route:ActivatedRoute,public api:ApiService,public service:ServicesService) {

    this.getId= this.route.snapshot.paramMap.get("id");
    console.log("Get ID...",JSON.parse(this.getId));

    this.getProfile();
  }

  getProfile(){
    this.api.getProfile(this.getId).subscribe(data=>{
      console.log("profile Data",data);
      this.profileInfo=data;
    })
  }



}
