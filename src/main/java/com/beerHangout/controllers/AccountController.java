package com.beerHangout.controllers;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

import static com.beerHangout.utils.State.populateModel;

@Controller
public class AccountController {

    private static final Logger log = Logger.getLogger(AccountController.class);

    @RequestMapping("/signin")
    public String showSignIn(Model model, HttpServletRequest request) {
        log.info("Signing in!");
        populateModel(model, request);
        return "index";
    }

}
