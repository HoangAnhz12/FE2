import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../service/register.service';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username:"",
    password:"",
    checkpassword: "",
    Email:""
  }
  constructor(private http: RegisterService, private Router : Router){

  }
  OnClickRegister():void {
    this.http.Register(this.user.username,this.user.password,this.user.Email).subscribe({
      next : (response)=>{
        if (response.message === "success")
        {
          console.log(response)
          this.Router.navigate(['/login'])
        }
        else{
          console.log(response)
        }
      }
      
    })
  }
  
  
  
}
