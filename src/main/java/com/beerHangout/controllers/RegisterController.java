package com.beerHangout.controllers;

import com.beerHangout.models.User;
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
            Model model, HttpServletResponse response) {
        if(bindingResult.hasErrors()){
            logger.warn("Validation of user register not success");
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
         }

        logger.info("Validation success");
        model.addAttribute("registeredUser");
        response.setStatus(HttpServletResponse.SC_OK);
    }


}