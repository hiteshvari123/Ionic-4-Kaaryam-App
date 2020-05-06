import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profileForm:FormGroup;
  educationForm:FormGroup;
  bankDetailForm:FormGroup;

  submitted = false;
  submittedEdu=false;
  submittedBank=false;

  disableProfileForm:boolean=true;
  cdfProfileData:any;
  cdf_fname:any;
  cdf_lname:any;
  cdf_contactNo:any;
  cdf_dob:any;
  cdf_address:any;
  cdf_state:any;
  cdf_city:any;
  cdf_pincode:any;
  cdf_gender:any;
  cdf_qualification:any;
  cdf_yearsOfExperience:any;
  cdf_designation:any;
  cdf_modeOfWork:any;
  cdf_fieldOfWork:any;
  cdf_industrySector:any;
  cdf_aboutSelf:any;

  eduLocalData:any;
  educationArray:any=[]

  // educationArray :any= [
  //   {collegeName:"Testing",degreeName:"BE",description:"Computer Engg",grade:"A"},
  //   {collegeName:"ABC",degreeName:"MBA",description:"Testing",grade:"A"},
  // ];  
  newEduData: any = {};
  isEditable:boolean=true;
  tableEduForm:FormGroup;

  enableEdit = false;
  enableEditIndex = null;

  experienceArray :any= [
    {companyName:"ABC", position:"Developer", jobStartDate:1/2/2020, jobEndDate:"1/2/2020", location:"Pune", jobDescription:"Testing"},
    {companyName:"XYZ", position:"Testing", jobStartDate:"1/2/2020", jobEndDate:"1/2/2020", location:"Kolhapur", jobDescription:"Testing"},
  ];  
  isEditableExperiece:boolean=true;
  newExperienceData: any = {};

  btnName="Edit"
  first_name="Testing";
  
  genderArray=[
    {name:"Male",},
    {name:"Female"},
    {name:"Other"}
  ]
  FieldOfWork=[
    {id:1,name:"Select Field of Work"},
    {id:2,name:"Engineering"},
    {id:3, name:"Fine Art"},
    {id:4,name:"Health & Medicine"},
    {id:5,name:"Hospitality"}
  ];

  ModeOfWork=[
    {id:1,name:"Select Mode of Work"},
    {id:2,value:"job",name:"Job"},
    {id:3, value:"self employeed",name:"Self Employeed"},
    {id:4,value:"Business1",name:"Business"},
    {id:5,value:"Business2",name:"Entreprenuer"}
  ];
  IndustrySector=[
    {id:1,name:"Select Industry Sector"},
    {id:2,name:"Agriculture"},
    {id:3,name:"Defence"},
    {id:4,name:"Information Technology"},
    {id:4,name:"Real Estate"},
    {id:5,name:"Retail"},
    {id:6,name:"Servies"}
  ];  

  myDocumentArray=[
    {srNO:1, docName:"ID Card", status:"Received"},
    {srNO:2, docName:"Certificate", status:"Received"},
    {srNO:3, docName:"Visiting Card", status:"Received"},
    {srNO:4, docName:"NDA Copy", status:"Received"},
    {srNO:5, docName:"Child's Test", status:"Complete"},
    {srNO:6, docName:"Child's Session", status:"Complete"},
    {srNO:7, docName:"Spouse's Test", status:"Complete"},
    {srNO:8, docName:"Number of Shadow Sessions", status:"2"},

  ]

  constructor(
    private fb:FormBuilder,
    private api:ApiService
  ) {
      this.api.getCdfProfile().subscribe(data=>{
        console.log("CDF Profile...",data);
        this.cdfProfileData=data;
        this.cdf_fname=data['fname'];
        this.cdf_lname=data['lname'];
        this.cdf_contactNo=data['contactNo'];
        let dateData=data['dob']
        this.cdf_dob=dateData.substring(0,10);
        console.log("Date.....",this.cdf_dob);
        this.cdf_address=data['address'];
        this.cdf_state=data['state'];
        this.cdf_city=data['city'];
        this.cdf_pincode=data['pincode'];
        this.cdf_gender=data['gender'];
        this.cdf_qualification=data['qualification'];
        this.cdf_designation=data['designation'];
        this.cdf_yearsOfExperience=data['yearsOfExperience'];
        this.cdf_modeOfWork=data['modeOfWork'];
        this.cdf_fieldOfWork=data['fieldOfWork'];
        this.cdf_industrySector=data['industrySector'];
        this.cdf_aboutSelf=data['aboutSelf']

      });

      this.api.getCdfEducationData().subscribe(data=>{
        console.log("Education Data....",data);
        this.educationArray=data;
      })
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName:["", Validators.required],
      contactNo:["",Validators.compose([Validators.required,Validators.pattern("[0-9 ]{10}")])],
      dob:["",Validators.required],
      address:["",Validators.required],
      selectState:["",Validators.required],
      selectCity:["",Validators.required],
      pinCode:["",Validators.compose([Validators.required,Validators.pattern("[0-9 ]{6}")])],
      selectGender:["",Validators.required],
      qualification:[null],
      designation:[null],
      selectExperience:[null],
      description:[null],
      selectFieldOfWork:[null],
      selectModeOfWork:[null],
      selectIndustrySector:[null]
    });

    
    this.profileForm.disable(); 
    // this.disableProfileForm=this.profileForm.status
    // console.log("disableProfileForm", this.disableProfileForm);

    this.educationForm=this.fb.group({
      collegeName: ["", Validators.required],
      degreeName:["", Validators.required],
      description:[null],
      grade:[null],
    });

    this.bankDetailForm=this.fb.group({
      accountHolderName:["",Validators.required],
      accountNo:["",Validators.required],
      bankName:["",Validators.required],
      branchName:["",Validators.required],
      ifscCode:["",Validators.required]
    })

    // this.tableEduForm=this.fb.group({
    //   name:[null],
    //   email:[null],
    //   phone:[null]
    // })
    // this.tableEduForm.disable(); 
  }

  get f() {
    return this.profileForm.controls;
  }

  clikedOnEdit(){
    this.profileForm.enable();
    this.disableProfileForm=false
    // this.enableProfileForm=this.profileForm.status;
    // console.log("Enable Form",this.enableProfileForm)
  }
  clikedOnUpdate(){
    this.submitted = true;
    console.log("Form Values...", this.profileForm.value)
    if (this.profileForm.invalid) {
      console.log("Invalid Form")
      return;
    } else {
      console.log("Valid Form");
      this.profileForm.disable();
      this.disableProfileForm=true;
    }

  }
  // onSubmit() {
  //   this.submitted = true;
  //   this.profileForm.enable();
  //   this.btnName="Update";
  //   console.log("Form Values...", this.profileForm.value)
  //   if (this.profileForm.invalid) {
  //     console.log("Invalid Form")
  //     return;
  //   } else {
  //     console.log("Valid Form");
  //   }
  // }

  onEducationSubmit(){
    this.submittedEdu = true;
    console.log("Education Form Values...", this.educationForm.value);

    if(this.educationForm.invalid){
      console.log("Invalid Education Form...")
    }
    else{
      console.log("Valid Education Form...")
    }

  }

  clearEduForm(){
   this.educationForm.reset();
    this.educationForm.markAsPristine();

  }

  submitBankDetails(){
    this.submittedBank=true
    console.log("Bank Details Form Values...", this.bankDetailForm.value);
    if(this.bankDetailForm.invalid){
      console.log("Invalid Bank Details Form...")
    }
    else{
      console.log("Valid Bank Details Form...")
    }
  }

  addRow() {   

    console.log("Row index...")
    this.newEduData = {colleg: "", degree: "",description:"",grade:""};  
    this.educationArray.push(this.newEduData); 
      
    this.educationArray[this.educationArray.length - 1].isEditable = true;
    console.log(this.educationArray);   
  }
  deleteRow(eduId) {  
    console.log("Edu Id",eduId);
    // if(this.educationArray.length ==1) {  
    //   alert("Can't delete the row when there is only one row");  
    //     return false;  
    // } else {  
    //     this.educationArray.splice(index, 1);  
    //     alert('Row deleted successfully',);  
    //     return true;  
    // }  
  }

  saveRowData(data){
    console.log("Row Data.....",data,data.collegeName);
    if(data.college=="" || data.degree==""){
      alert("Please fill up College Name and Degree Name")
    }
    else{
      // let arrayData={collegeName:data.collegeName,degreeName:data.degreeName,description:data.description,grade:data.grade}
      // this.educationArray.push(arrayData)
      this.api.addEducation(data).subscribe(data=>{
        console.log("Add Education api to save data...", data);
      })
      data.isEditable=!data.isEditable
    }
  }

  addExperienceRow(){

    this.newExperienceData = {companyName: "", position: "",jobStartDate:"",jobEndDate:"",location:"",jobDescription:""};  
    this.experienceArray.push(this.newExperienceData); 
      
    this.experienceArray[this.experienceArray.length - 1].isEditableExperiece = true;
    console.log(this.experienceArray); 
  }
  deleteExpericeRow(index){
    if(this.experienceArray.length ==1) {  
      alert("Can't delete the row when there is only one row");  
        return false;  
    } else {  
        this.experienceArray.splice(index, 1);  
        alert('Row deleted successfully',);  
        return true;  
    }  

  }
  saveExperienceData(data){
    if(data.companyName=="" || data.position=="" || data.location==""){
      alert("Please fill up Company Name, Position and Location")
    }
    else{
      data.isEditableExperiece=!data.isEditableExperiece;
    }
  }
}
