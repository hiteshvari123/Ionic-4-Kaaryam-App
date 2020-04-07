import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../providers/api.service';
import { ServicesService } from '../providers/services/services.service';

@Component({
  selector: 'app-update-session-status',
  templateUrl: './update-session-status.page.html',
  styleUrls: ['./update-session-status.page.scss'],
})
export class UpdateSessionStatusPage implements OnInit {

  candidateId:any;
  updateSessionForm:FormGroup;
  submitted=false;
  isCalling=false

  constructor(private route:ActivatedRoute,private router:Router,private fb:FormBuilder, private api:ApiService, 
          private service:ServicesService,private nav:NavController) { }

  ngOnInit() {
    this.candidateId=this.route.snapshot.paramMap.get('candidateId');
    console.log("Candidate ID on Session page", this.candidateId);

    this.updateSessionForm=this.fb.group({
      dateTime:["",[Validators.required]],
      selectSegregation:["",[Validators.required]],
      comments:["",[Validators.required]],

    })
  }

  previousPage(){
    this.router.navigate(['/candidate-details',this.candidateId])
  }
  get f() {
    return this.updateSessionForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.updateSessionForm.invalid) {
      console.log("Update Session invalid form...",this.updateSessionForm.invalid)
      return;
    }
    else{
      console.log("Value of update session form",this.updateSessionForm.value);
      let param={
        margId:localStorage.getItem('id'),
        cid:this.candidateId,
        sessionStatus:"complete",
        sessionDate:this.updateSessionForm.value.dateTime,
        approvedbyCandidate:false,
        sessionComment:this.updateSessionForm.value.comments,
        segregation:this.updateSessionForm.value.selectSegregation
      }
      console.log("PARAMS in update session....",param);
      this.isCalling=true;
      this.api.updateSessionStatus(param).subscribe(data=>{
          console.log("API Status....",data);
          if(data==true){
            this.isCalling=false;
            this.service.presentToast("Session status updated successfully");
            setTimeout(() => {
              this.previousPage();
            }, 3000)
          }
          else{
            this.isCalling=false;
            this.service.presentToast("Please try again");
          }
      },err=>{
        console.log(err);
        this.service.presentToast("Something went wrong");
      })
    }
  }

}
