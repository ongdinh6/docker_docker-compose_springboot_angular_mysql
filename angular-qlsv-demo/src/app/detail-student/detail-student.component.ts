import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../class/student';
import { HttpServerService } from '../services/http-server.service';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css'],
})
export class DetailStudentComponent implements OnInit {
  public student: Student = new Student();
  id: any;
  constructor(
    private httpServerService: HttpServerService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //sử dụng
    this.getStudentInfo();
  }
  /* sử dụng dịch vụ lấy thông tin của student này */
  getStudentInfo() {
    this.activatedRouter.paramMap.subscribe((param) => {
      this.id = param.get('id'); //lấy được id từ request
      this.httpServerService.getStudent(this.id).subscribe((response) => {
        this.student = response;
      });
    });
  }

  public errorMessageFullName: string = '';
  public errorMessageDate: string = '';

  /* update student info */
  updateStudentInfo() {
    this.activatedRouter.paramMap.subscribe((param) => {
      this.id = param.get('id'); //lấy được id từ request
      const payLoadUpdate = {
        fullName: this.student.fullName,
        birthDay: this.student.birthDay,
        address: this.student.address,
      };
      this.httpServerService
        .updateStudentInfoService(this.id, payLoadUpdate)
        .subscribe(
          (response) => {
            alert('Student is updated successfully !');
          },
          (error) => {
            if (error.includes('Date')) {
              this.errorMessageDate = error;
            } else {
              this.errorMessageFullName = error;
            }
          }
        );
    });
  }

  /* remove from list */
  removeStudentById(id: any): void {
    this.httpServerService.deleteStudentByIdService(id).subscribe(
      (response) => {
        //do something
        alert(response.message);
      },
      (err) => {
        alert(err.error.text);
      }
    );
  }
}
