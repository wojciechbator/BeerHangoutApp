package com.beerHangout.controllers;

import com.beerHangout.models.User;
import com.beerHangout.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by wojciech on 29.04.17.
 */
@CrossOrigin
@RequestMapping(value = "/admin")
@Controller
public class AdminPanelController {
    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.DELETE)
    public void handleDeleteUser(@RequestBody User user, HttpServletResponse response) {
        userService.removeUser(user.getId());
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
