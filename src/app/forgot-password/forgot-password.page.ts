import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../providers/services/services.service';
import { ApiService } from '../providers/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email:string="";
  isCalling=false;

  constructor(private service:ServicesService,private api:ApiService) {

     
   }

  ngOnInit() {
  }

  forgoPassword(){

    this.isCalling=true;
    console.log("EMail....",this.email)
    if(this.email==""||this.email==null){
      this.isCalling=false
      this.service.presentToast("Please enter email Id");
    }
    else{
      this.api.forgotPassword(this.email).subscribe(data=>{
        console.log("data in api......",data);
        this.isCalling=false;
        if(data==0){
          console.log("Please enter proper email Id");
          this.service.presentToast("Please enter proper email Id");
        }
      },err=>{
        console.log("err",err);
        this.service.presentToast("Something went wrong")
      })
    }
  

  }

}
