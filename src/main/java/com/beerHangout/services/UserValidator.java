package com.beerHangout.services;

import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

/**
 * @author Mateusz Wolak on 13.04.17.
 */

@Component
public class UserValidator implements Validator {

        public final static Pattern EMAIL_PATTERN = Pattern.compile("^[_A-Za-z0-9-]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");

        @Override
        public boolean supports(Class<?> clazz) {
                return UserValidator.class.isAssignableFrom(clazz);
        }

        @Override
        public void validate(Object model, Errors errors) {

                User user = (User) model;

                if (StringUtils.isEmpty(user.getUsername())) {
                        errors.rejectValue("username", "Username cannot be empty!");
                } else if(userService.findByUsername(username) != null) {
                        errors.rejectValue("username", "User with existing username already exists!");
                } else if(StringUitls.length(user.getUsername()) > 25){
                        errors.rejectValue("username", "Username is too long, try shorter.");
                }

                if (StringUtils.isEmpty(user.getPassword())) {
                        errors.rejectValue("password", "Password cannot be empty!");
                }

                if (StringUtils.isEmpty(user.getEmail()) || !EMAIL_PATTERN.matcher(user.getEmail()).matches()) {
                        errors.rejectValue("email", "Email is invalid or empty!");
                } else if(userService.findByEmail(email) != null) {
                        errors.rejectValue("email", "User with existing email already exists!");
                }


        }

}