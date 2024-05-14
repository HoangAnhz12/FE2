import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  URl ="http://localhost:8080/register"
  Register(username: String, password: String, Email: String):Observable<any>{
  const request ={
    username : username,
    password : password,
    Email : Email
  }
  const httpOptions = {
    headers : new HttpHeaders ({
      'Content-Type': 'application/json'
    })
  }
    return this.http.post(this.URl,request,httpOptions)
  }
}
