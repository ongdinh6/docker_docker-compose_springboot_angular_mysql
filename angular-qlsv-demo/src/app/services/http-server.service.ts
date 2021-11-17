import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserForm } from '../class/user-form';

@Injectable({
  providedIn: 'root',
})
export class HttpServerService {
  //giả sử mình có
  private HTTP_SERVER_URL = 'http://localhost:8080';

  //httpOptions: {}
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization':'Bearer String'
    }),
  };

  //khi dùng những tiệm tạp hóa khác cần phải khai báo vô
  constructor(private httpClient: HttpClient) {}

  //các dịch vụ của cửa hàng

  /* kiểu trả về là Observable đang trả về bất kỳ loại hàng nào */
  public getData(): Observable<any> {
    const url = `${this.HTTP_SERVER_URL}/api/v1/students`;

    return this.httpClient.get<any>(url, this.httpOptions);
  }

  /* cung cấp dịch vụ đăng nhập, tương tự như service của java */
  public doLogin(payLoad: any): Observable<any> {
    const url = `${this.HTTP_SERVER_URL}/api/v1/login`;
    console.log('payLoad: service', payLoad);
    return this.httpClient.post(url, payLoad, this.httpOptions);
  }

  /* cung cấp thêm dịch vụ thêm mới sinh viên */
  public addStudent(student: any): Observable<any> {
    const url = `${this.HTTP_SERVER_URL}/api/v1/student/new`;
    return this.httpClient.post(url, student, this.httpOptions)
    .pipe(
      catchError((err) => {
        //console.log('error caught in service');
        console.log('error', err);

        //Handle the error here
        return throwError(err); //Rethrow it back to component
      })
    );
  }

  /* get student detail info service */
  public getStudent(id: number): Observable<any> {
    const url = `${this.HTTP_SERVER_URL}/api/v1/student?id=` + id;
    return this.httpClient.get(url, this.httpOptions);
  }

  /* update student info */
  public updateStudentInfoService(id: number, payLoad: any): Observable<any> {
    const url = `${this.HTTP_SERVER_URL}/api/v1/student/` + id;
    return this.httpClient.put(url, payLoad, this.httpOptions).pipe(
      catchError((err) => {
        console.log('error caught in service');
        console.error('error', err.error.message);

        //Handle the error here
        return throwError(err.error.message); //Rethrow it back to component
      })
    );
  }

  /* remove from list */
  public deleteStudentByIdService(id: number): Observable<any> {
    const url = `${this.HTTP_SERVER_URL}/api/v1/student/` + id;
    return this.httpClient.delete(url, {observe: 'response'})
  }

  /* register account */
  public registerService(userForm: UserForm): Observable<any>{
    const url = `${this.HTTP_SERVER_URL}/api/v1/register`;
    return this.httpClient.post(url, userForm, this.httpOptions).pipe(
      catchError((err) => {
        console.log('error caught in service');

        //Handle the error here
        return throwError(err); //Rethrow it back to component
      })
    );
  }

}
