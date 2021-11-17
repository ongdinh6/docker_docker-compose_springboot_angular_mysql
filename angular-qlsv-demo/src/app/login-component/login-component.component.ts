import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from '../class/login-form';
import { HeaderComponent } from '../header/header.component';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  public message: string = '';
  constructor(
    private httpServerService: HttpServerService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  loginForm: LoginForm = new LoginForm();
  @Output() loginHandler = new EventEmitter();
  /* tạo dữ liệu sẽ truyền ra cho component cha */

  //sử dụng dịch vụ ở cửa hàng
  submitLogin() {
    //load payLoad này vào request
    this.httpServerService.doLogin(this.loginForm).subscribe((response) => {
      //kiểm tra status code response, nếu 200 redirect sang trang list student
      if (response.t !== null) {
        // this.loginHandler.emit(this.loginForm);
        //delay khoảng thời gian để load kết quả.
        //khai báo thêm thuộc tính
        const promise = new Promise<boolean> ((response, reject)=>{
        setTimeout(()=>response(this.router.navigate(['/list-student'])), 500)
        })
        // this.router.navigate(['/list-student']);
      } else {
        this.message = 'Email or password is incorrect!';
        this.loginForm.password = '';
      }
    });
  }

  //sayHello(response)
}
