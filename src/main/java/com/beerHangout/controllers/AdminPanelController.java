package com.beerHangout.controllers;

import com.beerHangout.models.User;
import com.beerHangout.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by wojciech on 29.04.17.
 */
@RequestMapping(value = "/admin")
@Controller
public class AdminPanelController {
    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.DELETE)
    public @ResponseBody void handleDeleteUser(@RequestBody User user, HttpServletResponse response) {
        userService.removeUser(user.getId());
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
