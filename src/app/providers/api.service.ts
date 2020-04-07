import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL="https://www.dheya.com/MyClapAPI/api/";
  apitoken='apitoken:MyClapDheya@2017:DheyaApi@20177';


  constructor(private http:HttpClient) {
    console.log("Api service provider.....");
   }


   login(param){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'MyClapDheya@2017:DheyaApi@2017',
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
     return this.http.post(this.BASE_URL+"userLogin",param,options);
   }

   getProfile(id){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'MyClapDheya@2017:DheyaApi@2017',
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
     return this.http.get(this.BASE_URL+'user/'+id,options);
   }

   updateProfile(id,param){
    console.log("update profile data in api....",param.firstName)
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'MyClapDheya@2017:DheyaApi@2017',
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders,
    };
    let userData={"firstName":param.firstName,"lastName":param.lastName,"contactNo":param.contactNo,"address1":param.currentAddress,
                    "maritalStatus":param.radioForMarital}
    return this.http.put(this.BASE_URL+'user/'+id,userData,options);
   }

   changePassword(id,newPassword){
    // let param={"userTypeId":4,"newPassword":newPassword}
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'MyClapDheya@2017:DheyaApi@2017',
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders,
    };
    let param={
      userTypeId:4,
      newPassword:newPassword
    }
    return this.http.put(this.BASE_URL+"UserChangePassword/"+id,param,options)
   }

   viewCandidateList(id,district){
    
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'MyClapDheya@2017:DheyaApi@2017',
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    
    return this.http.get(this.BASE_URL+"Candidate/GetAllCandForMarg?id="+id+"&district="+district,options);
    // .pipe(map(list => list));
   }

   candidateDetails(cid){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'MyClapDheya@2017:DheyaApi@2017',
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    return this.http.get(this.BASE_URL+'Candidate/'+cid,options);
   }

   viewCourseList(pinCode){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'MyClapDheya@2017:DheyaApi@2017',
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    return this.http.get(this.BASE_URL+'CoursesByFilter/'+pinCode,options);
   }

   viewJobList(pinCode){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'MyClapDheya@2017:DheyaApi@2017',
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    return this.http.get(this.BASE_URL+'JobsByFilter/'+pinCode,options);
   }
   getReport(cid){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'MyClapDheya@2017:DheyaApi@2017',
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    return this.http.get(this.BASE_URL+'Report/pdfNew?id='+cid,options);
   }

   getReportGraph(cid){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'MyClapDheya@2017:DheyaApi@2017',
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    return this.http.get(this.BASE_URL+'Report/GetGraphReportLink?id='+cid,options)
   }

   updateSessionStatus(data){
     console.log("data in api file...",data)
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'MyClapDheya@2017:DheyaApi@2017',
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    let param={
      margId:data.margId,
      cid:data.cid,
      sessionStatus:"complete",
      sessionDate:data.sessionDate,
      approvedbyCandidate:false,
      sessionComment:data.sessionComment,
      segregation:data.segregation
    }
    return this.http.post(this.BASE_URL+'/CandidateSession',param,options)
   }

   forgotPassword(email){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'MyClapDheya@2017:DheyaApi@2017',
      'Content-Type': 'application/json',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    let param={
      "userTypeId":4,
      "email":email
    }
    return this.http.post(this.BASE_URL+'ForgotPassword',param,options)
   }

}
