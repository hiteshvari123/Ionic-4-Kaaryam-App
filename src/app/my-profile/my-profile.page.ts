import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../providers/api.service';
import { ServicesService } from '../providers/services/services.service';
import { NavController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  getId:any;
  profileInfo:any;
  isLoading:boolean=false;
  DOB:any;
  constructor(public route:ActivatedRoute,public api:ApiService,public service:ServicesService,private nav:NavController, private datePipe:DatePipe) {
   }
   
   profileDetails(){
    this.service.profileData.subscribe(data => {
      this.profileInfo = data;
      this.DOB = this.datePipe.transform(this.profileInfo.DOB,"dd-MM-yyyy");
      console.log(this.DOB); //output - 14-02-2019
      console.log("PROFILE________________",this.profileInfo)
    });
   }

  ngOnInit() {
    this.profileDetails()
  }
  ionViewWillEnter (){
    console.log("IonViewDidLoad.....");
    this.profileDetails();
  }
  goToUpdateProfile(){
    this.nav.navigateForward('/update-profile')
  }
}
