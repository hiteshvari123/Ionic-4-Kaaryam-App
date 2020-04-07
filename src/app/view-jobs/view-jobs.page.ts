import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api.service';
import { ServicesService } from '../providers/services/services.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-view-jobs',
  templateUrl: './view-jobs.page.html',
  styleUrls: ['./view-jobs.page.scss'],
})
export class ViewJobsPage implements OnInit {

  pinCode:any;
  jobList:any;
  isLoading:boolean=false;
  searchTerm: any = "";
  itemdata = [];
  jobData:any;
  public isSearchOpened=false;

  constructor(private api:ApiService, private service:ServicesService, private nav:NavController) { 
    this.pinCode=localStorage.getItem('pinCode');
    this.viewJobList();
  }

  ngOnInit() {
  }

  viewJobList(){
    this.isLoading=true;
    this.api.viewJobList(this.pinCode).subscribe(data=>{
      console.log("Job List API......",data);
      this.isLoading=false;
      this.jobList=data;
      console.log("JOBLIST>>>>>>>>",this.jobList)
      this.jobData=this.jobList
    }, err=>{
      this.isLoading=false;
      console.log(err);
    })
  }

  goToJobDetails(data){
    console.log(data);
    this.service.setJobsDetailData(data);
    this.nav.navigateForward('/job-details')
  }

  searchResult(){
    if (this.searchTerm != "") {
      this.itemdata = this.jobData.filter((item) => {
        console.log("itemdata" + this.itemdata,item);
        return item.jobName.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.Orgname.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.qualification.toLowerCase().includes(this.searchTerm.toLowerCase());
      })
      this.jobList = this.itemdata;
    } else {
      this.itemdata = [];
      this.jobList = this.jobData;
    }
  }

}
