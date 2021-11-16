package com.tma.apistudentmanagement.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tma.apistudentmanagement.dtos.request.StudentInfoForm;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.util.Date;
import java.util.Locale;

@Entity
@Table(name = "student")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String fullName;
    @JsonFormat(pattern = "MM/dd/yyyy")
    private Date birthDay;
    private String address;
    private int active;
    private boolean deleted;


    public void update(Student student){
        this.setFullName(student.fullName);
        this.setBirthDay(student.birthDay);
        this.setAddress(student.getAddress());
        System.out.println("student will be updated has id "+this.id);
    }

    public StudentInfoForm toStudentInfoForm() {
        StudentInfoForm studentInfoForm = new StudentInfoForm();
        studentInfoForm.setFullName(fullName);
        studentInfoForm.setBirthDay(birthDay.toString());
        studentInfoForm.setAddress(address);

        return studentInfoForm;
    }
}
