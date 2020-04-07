import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../providers/api.service';
import { ServicesService } from '../providers/services/services.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.page.html',
  styleUrls: ['./candidate-details.page.scss'],
})
export class CandidateDetailsPage implements OnInit {

  candidateId:any;
  candidateData:any;
  isLoading:boolean=false;
  reportLink:any;
  graphLink:any;
  isCalling:boolean=false;
  isCalling1:boolean=false;

  constructor(private route:ActivatedRoute, private api:ApiService, private service:ServicesService,private nav:NavController, private router:Router) { 
   
  }

  ngOnInit() {
    this.candidateId=this.route.snapshot.paramMap.get('cid');
    console.log("Candidate ID on details page", this.candidateId);
    this.candidateDetails();
  }
  ionViewWillEnter(){
   
  }

  candidateDetails(){
    this.isLoading=true;
    this.api.candidateDetails(this.candidateId).subscribe(data=>{
      console.log("Candidate Details........",data);
      this.isLoading=false;
      this.candidateData=data;
      console.log(this.candidateData.interestStudy)
      if(this.candidateData.interestStudy==true ){
        this.candidateData.interestStudy='Yes';
      }
      else{
        this.candidateData.interestStudy='No';
      }

      if(this.candidateData.interestWork==true ){
        this.candidateData.interestWork='Yes';
      }
      else{
        this.candidateData.interestWork='No';
      }
      if(this.candidateData.SelfEmployment==true ){
        this.candidateData.SelfEmployment='Yes';
      }
      else{
        this.candidateData.SelfEmployment='No';
      }

    }, err=>{
      console.log(err);
      this.isLoading=false;
      this.service.presentToast("something went wrong");
    })
  }

  goToUpdateSession(){
    // this.nav.navigateForward('/update-session-status');
    console.log("Candiate Id",this.candidateId)
    this.router.navigate(['/update-session-status',this.candidateId])
  }

  getReport(){
    this.isCalling=true;
    this.api.getReport(this.candidateId).subscribe(data=>{
      console.log("Report API....>>>>>>",data)
      this.reportLink=data;
      window.open(this.reportLink);
      this.isCalling=false;
    }, err=>{
      console.log(err);
      this.isCalling=false;
      this.service.presentToast("Something went wrong")
    })
  }

  getGraphReport(){
    this.isCalling1=true;
    this.api.getReportGraph(this.candidateId).subscribe(data=>{
        console.log("Graph Report....<<<<<<",data);
        this.graphLink=data;
        this.isCalling1=false;
        window.open(this.graphLink);
    })
  }

}
