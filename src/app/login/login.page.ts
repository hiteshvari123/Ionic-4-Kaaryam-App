import { Component, OnInit, ViewChild } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Platform, IonRouterOutlet, NavController } from '@ionic/angular';
import { ApiService } from '../providers/api.service';
import { tokenName } from '@angular/compiler';
import { ServicesService } from '../providers/services/services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  passwordType: string = "password";
  iconType: string = "eye-off-outline";
  passwordShown: Boolean = false;
  subscription :any;
  email: string = "";
  password: string = "";
  isCalling:boolean=false;
  profileInfo:any;
  selectedLanguage:any;

  @ViewChild(IonRouterOutlet,{static:true}) routerOutlet: IonRouterOutlet;
  // @ViewChild(NavController,{static:true}) nav:NavController

  constructor(public router:Router,private fb: FormBuilder,private platform:Platform, private api:ApiService,
    private service:ServicesService, private nav:NavController) { 

      this.selectedLanguage=service.setInitialAppLanguage()
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", Validators.compose([
        Validators.required
        // Validators.pattern(
        //   "^[ ]*[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{3,})+[ ]*$"
        // )
      ])],
      password: ["", [Validators.required ]]
      // Validators.minLength(6)
    });
  }
  
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log("forms...",this.submitted,this.loginForm,this.loginForm.invalid)
    if (this.loginForm.invalid) {
      return;
    }else{
        let param={
          userTypeid:4,
          userId:this.loginForm.value.email,
          password:this.loginForm.value.password
        }
        this.isCalling=true;
        this.api.login(param).subscribe(data=>{
          console.log("Login data...",data);
        
          if(data['flag']==true && data['msg']=='SUCCESS'){
            console.log("Success api");
            this.isCalling=false;
            localStorage.setItem("id",data['uid']);
            localStorage.setItem("token","apitoken:MyClapDheya@2017:DheyaApi@20177");
            localStorage.setItem("userid",data['userid']);
 
            this.router.navigate(['/view-candidate']);
            this.loginForm.value.email="";
            this.loginForm.value.password="";
          }
          else{
            this.isCalling=false;
            this.service.presentToast(data['msg']);
          }
          err=>{
            this.isCalling=false;
            this.service.presentToast("Something is went wrong");
          }
        })
    }
      
  }

  toggleTextPassword(){
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

  forgotPassword(){
    //  this.router.navigate(['/forgot-password'])
    this.nav.navigateForward('/forgot-password')
  }

  languageChanged(lang){
    console.log("Selected language......",lang);
    this.service.setLanguage(lang);
  }

}
