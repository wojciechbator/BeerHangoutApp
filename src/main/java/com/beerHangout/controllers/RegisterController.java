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

import javax.validation.Valid;

/**
 * Created by wojciech on 11.04.17.
 */
@RestController
@RequestMapping(value = "/register")
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
            @ModelAttribute("formBackingUser") @Validated @Valid User user,
                               BindingResult bindingResult,
                               Model model) {
        if(bindingResult.hasErrors()){
            logger.warn("Validation of user register not success");
            //return some view TO DO Wojtek
         }

        logger.info("Validation succes");
        model.addAttribute("registeredUser");

        //return view of success;

    }


}
