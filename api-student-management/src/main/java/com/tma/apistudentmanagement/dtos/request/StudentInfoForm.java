package com.tma.apistudentmanagement.dtos.request;

import com.tma.apistudentmanagement.entities.Student;
import com.tma.apistudentmanagement.utils.DateTimeUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentInfoForm {
    @NotBlank(message = "Full name is require.")
    @Length(min = 2, message = "Full name must be least 2 characters.")
    private String fullName;
    private String birthDay;
    private String address;

    public Student toStudentJpa() {
        Student st = new Student();
        st.setFullName(fullName);
        try {
            Date date = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss").parse(this.birthDay+" 12:00:00");
            System.out.println("date before saved " + date.toString());
            st.setBirthDay(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        st.setAddress(address);
        st.setActive(1);
        st.setDeleted(false);
        return st;
    }

    public boolean isValidDate() {
        return DateTimeUtil.isValid(this.birthDay);
    }
}