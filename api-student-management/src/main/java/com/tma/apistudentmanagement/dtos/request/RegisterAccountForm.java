package com.tma.apistudentmanagement.dtos.request;

import com.tma.apistudentmanagement.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterAccountForm {
    @Email(message = "Email is invalid. Try again.")
    @NotBlank(message = "Email is require.")
    @NotNull(message = "Email must be not null.")
    private String email;
    @NotBlank(message = "Password is require.")
    @NotNull(message = "Password must be not null.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
            message = "Password must be least at 8 characters include least one character is lower letter, number, special character and a upper case letter. Ex: 123abcA@")
    private String password;
    private String rePassword;
    @NotBlank(message = "Full name is require.")
    @NotNull(message = "Full name must be at least 2 characters.")
    @Length(min = 2, message = "Full name must be at least 2 characters.")
    private String fullName;
    private String address;

    public User toUserEntity(){
        User user = new User();
        user.setEmail(this.email);
        user.setPassword(this.password);
        user.setAdmin(false);
        user.setFullName(fullName);
        user.setAddress(address);

        return user;
    }

    public boolean checkConfirmPasswordMatched(){
        return this.rePassword.equals(password);
    }
}
