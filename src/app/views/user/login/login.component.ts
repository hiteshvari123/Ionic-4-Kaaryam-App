import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  // emailModel = 'demo@vien.com';
  // passwordModel = 'demovien1122';

  emailModel='rahul.patil284@gmail.com';
  passwordModel='cdf@8411';

  buttonDisabled = false;
  buttonState = '';

  constructor(private authService: AuthService, private notifications: NotificationsService, 
            private router: Router, private api:ApiService) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.loginForm.valid || this.buttonDisabled) {
      return;
    }
    console.log("Login Form Values...",this.loginForm.value);

    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';
    this.api.login(this.loginForm.value).subscribe(data=>{
        console.log("OnLogin Screen Data",data);
    
        if(data!=null){
          console.log("Success api",data['uId']);
          this.buttonDisabled = false;
          this.buttonState="";
          // localStorage.setItem("cdfData",JSON.stringify(data))
           localStorage.setItem("CDFUserId",data['uId'])
          this.router.navigate(['/']);
        }
        else{
          this.buttonDisabled = false;
          this.buttonState = '';
          console.log("Api Fail, wrong data")
        }
        error => {
          console.log("error",error)
            this.buttonDisabled = false;
            this.buttonState = '';
            //this.notifications.create('Error', error.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        }
    })

    
    // this.buttonDisabled = true;
    // this.buttonState = 'show-spinner';
    // this.authService.signIn(this.loginForm.value).subscribe((user) => {
    //   this.router.navigate(['/']);
    // }, (error) => {
    //   this.buttonDisabled = false;
    //   this.buttonState = '';
    //   this.notifications.create('Error', error.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    // });
  }
}
