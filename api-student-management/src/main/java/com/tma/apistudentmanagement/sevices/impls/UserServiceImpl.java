package com.tma.apistudentmanagement.sevices.impls;

import com.tma.apistudentmanagement.dtos.request.RegisterAccountForm;
import com.tma.apistudentmanagement.entities.User;
import com.tma.apistudentmanagement.repositories.IUserRepository;
import com.tma.apistudentmanagement.sevices.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    IUserRepository userRepository;

    @Override
    public User login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }
}
