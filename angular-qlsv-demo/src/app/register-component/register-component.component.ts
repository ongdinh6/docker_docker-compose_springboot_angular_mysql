import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserForm } from '../class/user-form';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css'],
})
export class RegisterComponentComponent implements OnInit {
  constructor(
    private httpServerService: HttpServerService,
    private router: Router
    ) {}

  ngOnInit(): void {
  }

  /* call register on service */
  userForm: UserForm = new UserForm();
  errorEmail:string = "";
  errorFullName:string = "";
  errorPassword:string = "";
  errorRePassword:string = "";
  doRegister() {
    this.httpServerService.registerService(this.userForm).subscribe(
      (response) => {
        
        alert("Register account is successful !")
        this.router.navigate(['/login-page'])
      },
      (error) => {
       if(error.error.message.includes("Email")){
         this.errorEmail = error.error.message;
       }else{
        this.errorEmail = '';
       }
       if(error.error.message.includes("name")){
         this.errorFullName = error.error.message;
       }else{
        this.errorFullName = '';
       }
       if(error.error.message.includes("Password")){
         this.errorPassword = error.error.message;
       }else{
        this.errorPassword = '';
       }
       if(error.error.message.includes("match")){
         this.errorRePassword = error.error.message;
       }else{
        this.errorRePassword = '';
       }

      }
    );
  }
}
