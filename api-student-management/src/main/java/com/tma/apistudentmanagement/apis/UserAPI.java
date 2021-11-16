package com.tma.apistudentmanagement.apis;

import com.tma.apistudentmanagement.dtos.request.LoginForm;
import com.tma.apistudentmanagement.dtos.request.RegisterAccountForm;
import com.tma.apistudentmanagement.dtos.response.DataResponse;
import com.tma.apistudentmanagement.entities.User;
import com.tma.apistudentmanagement.exceptions.BadRequestException;
import com.tma.apistudentmanagement.repositories.IUserRepository;
import com.tma.apistudentmanagement.sevices.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200")
public class UserAPI {
    @Autowired
    IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<DataResponse> doRegisterAccount(@RequestBody @Valid RegisterAccountForm registerAccountForm, BindingResult bindingResult) {
        if(bindingResult.hasErrors() || !registerAccountForm.checkConfirmPasswordMatched()) {
            String errorMessage = bindingResult.getAllErrors().size() > 0 ? bindingResult.getAllErrors().get(0).getDefaultMessage().toString()
                    : "Confirmation password does not match password.";
            throw new BadRequestException(errorMessage);
        }
        //convert to user entity
        User userToSave = registerAccountForm.toUserEntity();
        //save
        userService.save(userToSave);
        return new ResponseEntity<>(new DataResponse(userToSave), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<DataResponse> doLogin(@RequestBody LoginForm loginForm) {
        System.out.println("Login Form Data is "+loginForm.getEmail()+" - "+loginForm.getPassword());
        return new ResponseEntity<>(new DataResponse<>(userService.login(loginForm.getEmail(), loginForm.getPassword())), HttpStatus.OK);
    }
}
