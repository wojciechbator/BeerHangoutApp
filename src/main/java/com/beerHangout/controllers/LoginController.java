package com.beerHangout.controllers;

import com.beerHangout.models.User;
import com.beerHangout.validation.LoginValidator;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

/**
 * Created by wojciech on 26.04.17.
 */
@CrossOrigin
@RequestMapping(name = "/api", method = RequestMethod.GET)
@Controller
public class LoginController {
    private static final Logger logger = Logger.getLogger(LoginController.class);
    private final LoginValidator loginValidator;

    @Autowired
    public LoginController(LoginValidator loginValidator) {
        this.loginValidator = loginValidator;
    }

    @RequestMapping(name = "/authenticate", method = RequestMethod.POST)
    public void handleLogin(@Valid @RequestBody User user, HttpServletResponse response) {
        if (loginValidator.validateUser(user)) {
            logger.info("User validated, login performed.");
            response.setStatus(HttpServletResponse.SC_OK);
        } else {
            logger.warn("Couldn't validate the user, invalid credentials!");
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }
    }
}
