import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Subject, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const LNG_KEY='SELECTED_LANGUAGE'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private courseData: any;
  private jobData:any;
  userId:any;
  selected='';

  constructor(public toastController:ToastController, private router:Router,private translate:TranslateService ) { } 

  
  isLoggedIn(): boolean {
 
    this.userId = localStorage.getItem("id");
    console.log("USER ID from Service...",this.userId)
    if (this.userId!=null) {
        this.router.navigate(["/view-candidate"]);
        return true;
      } 
     else {
      return false;
    }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      position:"bottom",
      duration: 2000
    });
    toast.present(); 
  }

  private profile = new BehaviorSubject(" ");
  profileData = this.profile.asObservable();
  profileDetails(data: any) {
    this.profile.next(data);
    console.log("in Service....",data, data.pinCode);
    localStorage.setItem('pinCode',data.pinCode);
  }

  public setCourseDetailData(data) {
    this.courseData = data
    console.log("In setCourseDetailData service....",this.courseData);
  }

  getCourseDetailData() {
    return this.courseData;
  }

  public setJobsDetailData(data){
    this.jobData=data;
    console.log("In setJobDetailsData Service...",this.jobData);
  }
  getJobDetailsData(){
    return this.jobData;
  }

  
  setInitialAppLanguage(){
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);
    localStorage.getItem(LNG_KEY);
    return language;

    // this.storage.get(LNG_KEY).then(val=>{
    //   this.setLanguage(val);
    //   this.selected=val;
    // });
  }
 
  setLanguage(setLang) {
    this.translate.use(setLang);
   // this.selected=setLang;
    localStorage.setItem(LNG_KEY,setLang)
  }

  // getLanguages(){
  //   return[
  //     {text:'English',value:'en'},
  //     {text:'Marathi',value:'mr'}
  //   ]
  // }
}
