package com.beerHangout.validation;

import com.beerHangout.models.User;
import com.beerHangout.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * Created by wojciech on 26.04.17.
 */
@Component
public class LoginValidator {
    final UserService userService;

    @Autowired
    public LoginValidator(UserService userService) {
        this.userService = userService;
    }

    public boolean validateUser(User user) {
        User properUser = userService.findByUsername(user.getUsername());
        if(properUser != null) {
            if(Objects.equals(properUser.getPassword(), user.getPassword())) {
                return true;
            }
        }
        return false;
    }
}
