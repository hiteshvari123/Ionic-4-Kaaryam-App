import { Component, OnInit } from '@angular/core';
import { ApiService } from '../providers/api.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../providers/services/services.service';

@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.page.html',
  styleUrls: ['./view-courses.page.scss'],
})
export class ViewCoursesPage implements OnInit {

  pinCode:any;
  viewCoursesData:any;
  isLoading:boolean=false;
  public isSearchOpened=false;
  searchTerm: any = "";
  itemdata = [];
  courseData:any;

  constructor(private api:ApiService, private nav:NavController,private router:Router, private service:ServicesService) {

      this.pinCode=localStorage.getItem('pinCode');
      this.viewCourses();
   }

  ngOnInit() {
  }

  viewCourses(){
    this.isLoading=true;
    this.api.viewCourseList(this.pinCode).subscribe(data=>{
      console.log("In view course API.....",data);
      this.isLoading=false;
      this.viewCoursesData=data;
      this.courseData=this.viewCoursesData;
    },err=>{
      this.isLoading=false;
      this.service.presentToast("Something went wrong");
    })
  }

  goToCourseDetails(data){
    console.log("data",data);
    this.service.setCourseDetailData(data)
    this.nav.navigateForward('/course-details')
  }

  searchResult(){
    if (this.searchTerm != "") {
      this.itemdata = this.courseData.filter((item) => {
        console.log("itemdata" + this.itemdata,item);
        return item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.instname.toLowerCase().includes(this.searchTerm.toLowerCase());
      })
      this.viewCoursesData = this.itemdata;
    } else {
      this.itemdata = [];
      this.viewCoursesData = this.courseData;
    }
  }
}
