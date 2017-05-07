package com.beerHangout.controllers;

import com.beerHangout.models.Role;
import com.beerHangout.models.User;
import com.beerHangout.services.UserService;
import com.beerHangout.utils.SessionIdentifierGenerator;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by wojciech on 11.04.17.
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/register")
public class RegisterController {

    @Autowired
    @Qualifier("registerUserValidator")
    private Validator validator;

    @Autowired
    private UserService userService;

    @Autowired
    private SessionIdentifierGenerator sessionIdentifierGenerator;

    private static  final Logger logger = Logger.getLogger(RegisterController.class);

    @InitBinder
    public void initBinder (WebDataBinder binder) {
        binder.setValidator(validator);
    }

    @RequestMapping(method = RequestMethod.GET)
    public void addBackingUserToModel(Model model) {
        User formBackingUser = new User();
        model.addAttribute("formBackingUser", formBackingUser);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void handleRegister(
            @RequestBody @Validated @Valid User user,
            BindingResult bindingResult,
            Model model, HttpServletResponse response) throws Exception {
        if(bindingResult.hasErrors()){
            logger.warn("Validation of user register not success");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
         }
        //Service Validation here impl
        logger.info("Validation success");

        Role userRole = new Role();
        userRole.setName("USER");
        userRole.setRoleId(sessionIdentifierGenerator.nextSessionId());
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        logger.info("Creating user: " + user.getUsername() + ", with userRoles: " + userRoles.toString());

        userService.createUser(user, userRoles);
        response.setStatus(HttpServletResponse.SC_OK);
    }


}
