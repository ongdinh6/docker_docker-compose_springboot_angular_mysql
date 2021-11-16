package com.tma.apistudentmanagement.repositories;

import com.tma.apistudentmanagement.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IStudentRepository extends JpaRepository<Student, Long> {
    List<Student> findAllByDeleted(boolean deleted);
    Student findByIdAndDeleted(long id, boolean deleted);

}
