package com.tma.apistudentmanagement.sevices.impls;

import com.tma.apistudentmanagement.entities.Student;
import com.tma.apistudentmanagement.repositories.IStudentRepository;
import com.tma.apistudentmanagement.sevices.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService implements IStudentService {
    @Autowired
    IStudentRepository studentRepository;

    @Override
    public List<Student> getListStudent(boolean deleted) {
        return studentRepository.findAllByDeleted(deleted);
    }

    @Override
    public Student findById(long id) {
        return studentRepository.findByIdAndDeleted(id, false);
    }

    @Override
    public Student save(Student student) {
        return studentRepository.save(student);
    }
}
