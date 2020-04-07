import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../providers/api.service';
import { ServicesService } from '../providers/services/services.service';
import { IonInfiniteScroll, NavController, Platform } from '@ionic/angular';
import { element } from 'protractor';
import { Router } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.page.html',
  styleUrls: ['./view-candidate.page.scss'],
})
export class ViewCandidatePage implements OnInit {

  @ViewChild(IonInfiniteScroll,{static: true}) infiniteScroll: IonInfiniteScroll;
 
  public isSearchOpened=false;
  dataList:any=[];
  candidateList:any;
  isLoading:boolean=false;
  searchTerm: any = "";
  itemdata = [];

  profile:any;
  getId:any;
  profileInfo:any;

  limit = 10;
  candidateLists: any[] =[];
  constructor(private api:ApiService,private service:ServicesService, private nav:NavController, 
              private router:Router,private fcm: FCM) {


    this.fcm.getToken().then(token => {
      console.log(token);
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
     
    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
      //  this.router.navigate([data.landing_page, data.price]);
      } else {
        console.log('Received in foreground');
      //  this.router.navigate([data.landing_page, data.price]);
      }
    });

    this.getId=localStorage.getItem('id')
    console.log("Get ID...",JSON.parse(this.getId));

    this.dataList = [];
   
    // for (let i = 0; i < 25; i++) { 
    //   this.dataList.push("Item number "+this.dataList.length);
    //   console.log("DataList......",this.dataList);
    // }

     //******Get Profile Api******
     this.api.getProfile(this.getId).subscribe(data=>{
      console.log("profile Data",data);
      this.profileInfo=data;
      localStorage.setItem("district",this.profileInfo.district);
      console.log("District---------",localStorage.getItem('district'));
      this.viewCandidateList();
      this.service.profileDetails(this.profileInfo);
    })

   //   this.getProfile();
   }

  ngOnInit() {
    this.viewCandidateList();
  }

  ionViewWillEnter(){}
 

  viewCandidateList(){
    console.log("function started...");
     let id=localStorage.getItem('id');
    let district=localStorage.getItem('district');
    console.log("district in view candidate function...",district)
    //let district='chandrapur';
    
    this.isLoading=true
    this.api.viewCandidateList(id,district).subscribe(data=>{
        console.log("api success..............")
        console.log("Candidate List....",data);
        this.dataList=data;
        this.candidateList=this.dataList
        this.isLoading=false;
   
    })
  }
  searchResult(){
    console.log("In search ",this.dataList)
    if (this.searchTerm != "") {
      this.itemdata = this.candidateList.filter((item) => {
        console.log("itemdata" + this.itemdata);
        return item.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.lastName.toLowerCase().includes(this.searchTerm.toLowerCase());
      })
      this.dataList = this.itemdata;
    } else {
      this.itemdata = [];
      this.dataList = this.candidateList;
    }
  }

  // loadMorePosts(event) {
  //   setTimeout(() => {
  //     console.log('Begin async operation');
  //     this.limit += 10;
  //     event.target.complete();

  //     if (this.dataList.length == this.limit) {
  //       event.target.disabled = false;
  //     }
  //   }, 500);
  // }
  // //

  // toggleInfiniteScroll() {
  //   this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  // }

  
  loadData(event) {
    
    setTimeout(() => {
      console.log('Done');
      for (let i = 0; i < 25; i++) { 
        this.dataList.push("Item number "+this.dataList.length);
      }
      event.target.complete();
 
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.dataList.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }
 
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  goToCandidateDetail(cid){
    console.log("Navigate to detail page...",cid);
    // this.nav.navigateForward('/candidate-details',cid)
    this.router.navigate(['/candidate-details',cid]);
  }

}
