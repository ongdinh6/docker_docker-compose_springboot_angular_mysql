package com.tma.apistudentmanagement.sevices;

import com.tma.apistudentmanagement.entities.Student;

import java.util.List;

public interface IStudentService {
    List<Student> getListStudent(boolean deleted);
    Student findById(long id);
    Student save(Student student);
}
