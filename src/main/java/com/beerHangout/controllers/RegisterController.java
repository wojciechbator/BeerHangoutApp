package com.beerHangout.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by wojciech on 11.04.17.
 */
@RestController
@RequestMapping("/register")
public class RegisterController {

    @RequestMapping("/success")
    public void handleRegister() {
        //TODO: redirect to user's home page (which I have to prepare :D)
    }
}
