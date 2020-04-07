import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../providers/services/services.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss'],
})
export class CourseDetailsPage implements OnInit {

  courseDetailData:any;
  items:any;


  constructor(private route:ActivatedRoute, private service:ServicesService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){ 
    this.courseDetailData=this.service.getCourseDetailData();
    console.log("courseDetailData from service...",this.courseDetailData);
  }

}
