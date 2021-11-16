package com.tma.apistudentmanagement.sevices;

import com.tma.apistudentmanagement.dtos.request.RegisterAccountForm;
import com.tma.apistudentmanagement.entities.User;

public interface IUserService {
    User login(String email, String password);
    User save(User user);
}
