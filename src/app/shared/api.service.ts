import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // BASE_URL="https://www.dheya.com/MyClapAPI/api/";
  // apitoken='apitoken:MyClapDheya@2017:DheyaApi@20177';

  BASE_URL="https://www.dheya.com/cdf2020api/api/";
  apitoken='';

  // https://www.dheya.com/testing/api/UserLogin/GetUserLoginNew?userName=rahul.patil284@gmail.com&password=cdf@8411
  // https://www.dheya.com/testing/api/UserLogin/GetUserLoginNew?userName=rahul.patil284@gmail.com&password=cdf@8411
  constructor(private http:HttpClient) {
    console.log("Api service provider.....");
   }


   login(param){
     console.log("In API file",param)
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'CDFDashboard@2018:DheyaApi@2018',
      'Content-Type': 'application/json;charset=utf-8',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
     return this.http.get(this.BASE_URL+"UserLogin/GetUserLoginNew?userName="+param.email+"&password="+param.password,options);
   }

   getCdfProfile(){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'CDFDashboard@2018:DheyaApi@2018',
      'Content-Type': 'application/json;charset=utf-8',
      'Accept':'application/json',
      // 'Access-Control-Allow-Headers': 'Content-Type',
      // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      // 'Access-Control-Allow-Origin': '*'
    });
    const options = {
        headers: httpHeaders
    };
    let userId=localStorage.getItem("CDFUserId")
    return this.http.get(this.BASE_URL+'CDFProfile/'+userId,options)
   }

   getCdfEducationData(){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'CDFDashboard@2018:DheyaApi@2018',
      'Content-Type': 'application/json;charset=utf-8',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    let userId=localStorage.getItem("CDFUserId")
    return this.http.get(this.BASE_URL+'CDFEducation/'+userId,options)
   }

   getFieldOfWork(){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'CDFDashboard@2018:DheyaApi@2018',
      'Content-Type': 'application/json;charset=utf-8',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    return this.http.get(this.BASE_URL+'CDFProfile/GetFieldOfWork',options);
   }
   
   getYearsOfExp(){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'CDFDashboard@2018:DheyaApi@2018',
      'Content-Type': 'application/json;charset=utf-8',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    return this.http.get(this.BASE_URL+'CDFProfile/GetYearOfExperience',options);
   }
   
   getIndustrySector(){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'CDFDashboard@2018:DheyaApi@2018',
      'Content-Type': 'application/json;charset=utf-8',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    return this.http.get(this.BASE_URL+'CDFProfile/IndustrySector',options);
   }

   addEducation(data){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'CDFDashboard@2018:DheyaApi@2018',
      'Content-Type': 'application/json;charset=utf-8',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    let param={
      college:data.college,
      degree:data.degree,
      description:data.description,
      grade:data.grade,
      uId:localStorage.getItem("CDFUserId")
    }
    return this.http.post(this.BASE_URL+'CDFEducation/Add',param,options);
   }

   updateEducationData(data){
      const httpHeaders = new HttpHeaders({
        'AuthToken': 'CDFDashboard@2018:DheyaApi@2018',
        'Content-Type': 'application/json;charset=utf-8',
        'Accept':'application/json'
      });
      const options = {
          headers: httpHeaders
      };
      let param={
        college:data.college,
        degree:data.degree,
        description:data.description,
        grade:data.grade,
      }
      let userId=localStorage.getItem("CDFUserId");
      return this.http.put(this.BASE_URL+'CDFEducation/Update?id='+userId+'&eduId='+data.eduId,param,options)
    //  https://www.dheya.com/testing/api/CDFEducation/Update?id=374&eduId=1233
   }

   deleteEducation(eduId){
    const httpHeaders = new HttpHeaders({
      'AuthToken': 'CDFDashboard@2018:DheyaApi@2018',
      'Content-Type': 'application/json;charset=utf-8',
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    let userId=localStorage.getItem("CDFUserId")
    return this.http.delete(this.BASE_URL+'CDFEducation/Delete?id='+userId+'&eduId='+eduId,options)
   // https://www.dheya.com/testing/api/CDFEducation/Delete?id=374&eduId=1233
   }
}