import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // BASE_URL="https://www.dheya.com/MyClapAPI/api/";
  // apitoken='apitoken:MyClapDheya@2017:DheyaApi@20177';

  BASE_URL="https://www.dheya.com/testing/api/";
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
      'Accept':'application/json'
    });
    const options = {
        headers: httpHeaders
    };
    let userId=localStorage.getItem("CDFUserId")
    return this.http.get(this.BASE_URL+'CDFProfile/'+userId,options)
   }

}