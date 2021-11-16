package com.tma.apistudentmanagement.apis;

import com.tma.apistudentmanagement.dtos.request.StudentInfoForm;
import com.tma.apistudentmanagement.dtos.response.DataResponse;
import com.tma.apistudentmanagement.entities.Student;
import com.tma.apistudentmanagement.exceptions.BadRequestException;
import com.tma.apistudentmanagement.sevices.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentAPI {
    @Autowired
    IStudentService studentService;

    @GetMapping("/students")
    public ResponseEntity<DataResponse> getListStudent() {
        return new ResponseEntity<>(new DataResponse(studentService.getListStudent(false)), HttpStatus.OK);
    }

    @PostMapping("/student/new")
    public ResponseEntity<DataResponse> addNewStudent(@RequestBody @Valid StudentInfoForm studentInfoForm, BindingResult bindingResult) {
        //check validation info
        if(bindingResult.hasErrors() || !studentInfoForm.isValidDate()) {
            String errorMessage = bindingResult.getAllErrors().size() > 0 ? bindingResult.getAllErrors().get(0).getDefaultMessage() : "Date of birth must be matched with format \"mm/dd/yyyy\"";
            throw new BadRequestException(errorMessage);
        }
        return new ResponseEntity<>(new DataResponse(studentService.save(studentInfoForm.toStudentJpa())), HttpStatus.OK);
    }

    @PutMapping("/student/{id}")
    public ResponseEntity<DataResponse> editStudent(@PathVariable long id, @RequestBody @Valid StudentInfoForm studentInfoForm, BindingResult bindingResult) {
        //check validation info
        if(bindingResult.hasErrors() || !studentInfoForm.isValidDate()) {
            String errorMessage = bindingResult.getAllErrors().size() > 0 ? bindingResult.getAllErrors().get(0).getDefaultMessage() : "Date of birth must be matched with format \"mm/dd/yyyy\"";
            throw new BadRequestException(errorMessage);
        }
        Student studentUpdated = studentService.findById(id);
        studentUpdated.update(studentInfoForm.toStudentJpa());
        //update into table
        studentService.save(studentUpdated);
        return new ResponseEntity<>(new DataResponse(studentUpdated), HttpStatus.OK);
    }

    @DeleteMapping("/student/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable long id) {
        Student studentDeleted = studentService.findById(id);
        //delete
        studentDeleted.setDeleted(true);
        //saved
        studentService.save(studentDeleted);
        return new ResponseEntity<>("Student has id \'"+id+"\' was be deleted successful.", HttpStatus.OK);
    }

    @GetMapping("/student")
    public Student getStudentInfo(@RequestParam long id){
        return studentService.findById(id);
    }
}
