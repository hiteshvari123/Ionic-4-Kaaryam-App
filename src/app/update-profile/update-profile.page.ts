import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../providers/services/services.service';
import { ApiService } from '../providers/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  updateProfileForm: FormGroup;
  submitted = false;

  firstName: string = "";
  lastName: string = "";
  contactNo: any = "";
  currentAddress: any = "";
  radioForMarital: any = "";
  profileInfo: any;
  isCalling = false;

  address2: any;
  emailId: any;
  DOB: any;
  district: any;
  pinCode: any;
  taluka: any;
  village: any

  items = [
    { name: 'Married', id: 1 },
    { name: 'Single', id: 2 }
  ]

  constructor(private fb: FormBuilder, private service: ServicesService, private api: ApiService, private nav: NavController) {

  }

  ionViewWillEnter() {
    this.service.profileData.subscribe(data => {
      this.profileInfo = data;
      console.log("PROFILE In Update Profile________________", this.profileInfo)
    });

    this.firstName = this.profileInfo.firstName;
    this.lastName = this.profileInfo.lastName;
    this.contactNo = this.profileInfo.contactNo;
    this.currentAddress = this.profileInfo.address1;
    this.radioForMarital = this.profileInfo.maritalStatus;

    this.address2 = this.profileInfo.address2;
    this.emailId = this.profileInfo.emailId;
    this.DOB = this.profileInfo.DOB;
    this.district = this.profileInfo.district;
    this.pinCode = this.profileInfo.pinCode;
    this.taluka = this.profileInfo.taluka;
    this.village = this.profileInfo.village;

    console.log("Data of Profile.....@@@@@@@@", this.firstName, this.radioForMarital)

  }
  ngOnInit() {
    this.updateProfileForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      contactNo: ["", [Validators.required]],
      currentAddress: ["", [Validators.required]],
      radioForMarital: ["", [Validators.required]]
    })
  }

  get f() {
    return this.updateProfileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.updateProfileForm.invalid) {
      console.log("Form Invalid..")
      return;
    } else {
      console.log("Form Valid...")
      let param = new FormData();
      param.append("firstName", this.firstName);
      param.append("lastName", this.lastName);
      param.append("contactNo", this.contactNo);
      param.append("currentAddress", this.currentAddress);
      param.append("maritalStatus", this.radioForMarital);

      let details = {
        firstName: this.updateProfileForm.value.firstName,
        lastName: this.updateProfileForm.value.lastName,
        contactNo: this.updateProfileForm.value.contactNo,
        address1: this.updateProfileForm.value.currentAddress,
        maritalStatus: this.updateProfileForm.value.radioForMarital,

        address2: this.profileInfo.address2,
        emailId: this.profileInfo.emailId,
        DOB: this.profileInfo.DOB,
        district: this.profileInfo.district,
        pinCode: this.profileInfo.pinCode,
        taluka: this.profileInfo.taluka,
        village: this.profileInfo.village
      }
      console.log('details____________*****************', details);

      let id = localStorage.getItem('id');
      this.isCalling = true;
      console.log("FormValues....", this.updateProfileForm.value)
      this.api.updateProfile(id, this.updateProfileForm.value).subscribe(data => {
        console.log("Update Profile API....", data);
        this.isCalling = false;
        if (data == true) {
          console.log("In success TRUE....");
          this.service.profileDetails(details);
          this.service.presentToast("Profile updated succesfully");
          setTimeout(() => {
            this.nav.navigateBack('/my-profile');
          }, 3000)


        }
        else {
          console.log("In FALSE.....")
          this.service.presentToast("Please try again");
        }
      }, err=>{
          console.log(err);
          this.service.presentToast("Something went wrong");
      })
    }
  }
  showValue(event) {
    event = this.radioForMarital
    console.log("Radio Values....", event, this.radioForMarital);
  }
  selected(data) {
    console.log("Selected Radio.....#####", data, this.radioForMarital)
    if (data == this.radioForMarital) {
      console.log("Mateches...");
    }
    else {
      console.log("Not matches....")
    }
  }

}
