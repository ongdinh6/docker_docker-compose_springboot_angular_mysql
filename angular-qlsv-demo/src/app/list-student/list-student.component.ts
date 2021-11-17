import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../class/student';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css'],
})
export class ListStudentComponent implements OnInit {
  public students: Student[] = [];
  public student = new Student();
  //dùng phải khai báo
  constructor(
    private httpServerService: HttpServerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //sử dụng dịch vụ của cửa hàng
    /* 1. get data - đăng kí (subscribe)*/
    this.loadDataTable();
  }
  errorFullName: string = '';
  errorDate: string = '';
  public submitAddNewStudent(): void {
    /* 2. add new student - đăng kí với service */
    this.httpServerService.addStudent(this.student).subscribe(
      (response) => {
        alert(response)
       if(response.status==400){
        this.errorFullName = response.message;
       }
      },
      (error) => {
        console.log(error)
        if (error.error.message.includes('name')) {
          this.errorFullName = error.error.message;
        }
        if (error.error.message.includes('Date')) {
          this.errorDate = error.error.message;
        }
        console.log(this.errorFullName)
        console.log(this.errorDate)
      }
    );
  }

  /* ajax load data table */
  loadDataTable(): void {
    this.httpServerService.getData().subscribe((response) => {
      this.students = response.t;
    });
  }

  /* 3. redirect to detail student by id */
  goDetail(id: number): void {
    this.httpServerService.getStudent(id).subscribe((response) => {
      //redirect to detail page
      this.router.navigate(['/detail/' + id]);
      console.log('response get detail ', response);
    });
  }
}
