import { Component, Input, Output } from '@angular/core';
import { LoginForm } from './class/login-form';
import { HttpServerService } from './services/http-server.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'qlsv';
  //tập chung dữ liệu về một chổ, cha
  loginData: LoginForm = new LoginForm();
  unameLogin: string = '';

  constructor(private httpServerService: HttpServerService) {
    //todo anything here
  }

  //how to get data at service
  ngOnInit() {}

  onLoginHandler(value: any) {
    this.loginData = value;
  }
}
