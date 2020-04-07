import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../providers/services/services.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {

  jobDetails:any;

  constructor(private service:ServicesService) { 
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.jobDetails=this.service.getJobDetailsData();
    console.log("jobDetails...########",this.jobDetails);
  }

}
