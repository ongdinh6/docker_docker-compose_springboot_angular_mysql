package com.tma.apistudentmanagement.utils;

import lombok.Getter;
import lombok.Setter;
import org.joda.time.DateTime;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.time.format.ResolverStyle;
/*this code referenced by https://mkyong.com/java/how-to-check-if-date-is-valid-in-java/*/
@Setter
@Getter
public class DateTimeUtil {

    public static boolean isValid(final String date) {
        boolean valid = false;
        try {
            // ResolverStyle.STRICT for 30, 31 days checking, and also leap year.
            LocalDate.parse(date,
                    DateTimeFormatter.ofPattern("M/d/uuuu")
                            .withResolverStyle(ResolverStyle.STRICT)
            );
            valid = true;
        } catch (DateTimeParseException e) {
            e.printStackTrace();
            valid = false;
        }
        return valid;
    }
}
