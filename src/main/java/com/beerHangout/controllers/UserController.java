package com.beerHangout.controllers;

import com.beerHangout.models.User;
import com.beerHangout.models.Role;
import com.beerHangout.services.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    private static final Logger log = Logger.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<User> getAllUsers() {
        log.info("Getting all users!");
        return userService.findAll();
    }

    @RequestMapping(value = "{username}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserByName(@PathVariable("username") String username) {
        User user = userService.findByUsername(username);
        log.info("Getting user by username: " + username);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "{username}", method = RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@Valid @RequestBody User user) {
        User userData = userService.findByUsername(user.getUsername());
        log.info("Updating user: " + user.getUsername());
        if (userData == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.updateUser(user.getUsername(), userData);
        return new ResponseEntity<>(userData, HttpStatus.OK);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void deleteUser(@Valid @PathVariable("id") String id) {
        log.info("Removing user by id: " + id);
        userService.removeUser(id);
    }

}