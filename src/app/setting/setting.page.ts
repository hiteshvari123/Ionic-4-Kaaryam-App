import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ApiService } from '../providers/api.service';
import { ServicesService } from '../providers/services/services.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

 // @ViewChild("ngForm", { static: false }) password: NgForm;
  @ViewChild('myForm',{ static: true }) myForm:NgForm;

  segment='change-password';
  iconType: string = "eye-off-outline";
  passwordType:string='password';
  iconType1: string = "eye-off-outline";
  passwordType1:string='password';
  iconType2: string = "eye-off-outline";
  passwordType2:string='password';
  passwordShown: Boolean = false;
  isCalling:Boolean=false;

  changePasswordForm:FormGroup;
  submitted = false;

  language=localStorage.getItem('SELECTED_LANGUAGE');
  selectedLanguage=this.language;

  constructor(private fb: FormBuilder,public api:ApiService,private service:ServicesService,
              private nav:NavController) { 
          
      //  this.selectedLanguage=service.setInitialAppLanguage()
        console.log("Selected language on setting page",this.selectedLanguage)
    }

    languageChanged(){
      console.log("Selected language......",this.selectedLanguage);
      this.service.setLanguage(this.selectedLanguage);
    }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      currentPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required ]],
      // Validators.minLength(6)
      confirmPassword:["",[Validators.required]]
    });
    
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  toggleCurrentPassword(){
    console.log("Toggle current password...");
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = "password";
      this.iconType = "eye-off-outline";
    } else {
      this.passwordShown = true;
      this.passwordType = "text";
      this.iconType = "eye-outline";
    }
  }
  toggleNewPassword(){
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType1 = "password";
      this.iconType1 = "eye-off-outline";
    } else {
      this.passwordShown = true;
      this.passwordType1 = "text";
      this.iconType1 = "eye-outline";
    }
  }
  toggleConfirmPassword(){
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType2 = "password";
      this.iconType2 = "eye-off-outline";
    } else {
      this.passwordShown = true;
      this.passwordType2 = "text";
      this.iconType2 = "eye-outline";
    }
  }
  get f() {
    return this.changePasswordForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      console.log("change password invalid form...",this.changePasswordForm.value,this.changePasswordForm.invalid)
      return;
    }
    else{
      console.log("Form valid",this.changePasswordForm.value.newPassword);
      let id=localStorage.getItem('id');
      this.isCalling=true;
      this.api.changePassword(id,this.changePasswordForm.value.newPassword).subscribe(data=>{
        this.isCalling=false;
        console.log("API of change password...",data);
        if(data==true){
          console.log("In If DATA True");
          this.service.presentToast("Password changed succesfully, please login again");
            setTimeout(() => {
            this.nav.navigateRoot('login'); 
          }, 3000)
         
        }
        else{
          console.log("In Else Data FALSE...");
          this.service.presentToast("Please try again")
        }
      },err=>{
        console.log(err);
        this.service.presentToast("Something went wrong");
      }) 
    }
  }

}
