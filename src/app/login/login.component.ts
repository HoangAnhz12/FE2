import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../service/login.service';
import { response } from 'express';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private login: LoginService,private Router: Router){

  }
  @Output() loginSuccess: EventEmitter<boolean> = new EventEmitter(); 
  onSubmitLogin():void{ 
    this.login.login(this.username,this.password).subscribe({
      next: (response)=>{
        console.log(response.status)
        this.loginSuccess.emit(true);
        this.Router.navigate(['/report'])
      }
    }
    )
  }
}
