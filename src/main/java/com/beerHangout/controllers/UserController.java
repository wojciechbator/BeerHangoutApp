package com.beerHangout.controllers;

import com.beerHangout.models.Role;
import com.beerHangout.models.User;
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
        log.info("Getting all users from mongo");
        return userService.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public User createUser(@Valid @RequestBody User user) throws Exception {
        Role userRole = new Role();
        userRole.setName("ROLE_USER");
        userRole.setRoleId("1");
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        log.info("Creating user: " + user.toString());
        return userService.createUser(user, userRoles);
    }

    @RequestMapping(value = "{username}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserByName(@PathVariable("username") String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            log.info("Such user does not exist");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            log.info("Getting user: " + username);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "{username}", method = RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@Valid @RequestBody User user) {
        User userData = userService.findByUsername(user.getUsername());
        if (userData == null) {
            log.info("Such user does not exist");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.updateUser(user.getUsername(), userData);
        log.info("Updating user: " + user.getUsername());
        return new ResponseEntity<>(userData, HttpStatus.OK);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void deleteUser(@Valid @PathVariable("id") String id) {
        log.info("Removing user with id: " + id);
        userService.removeUser(id);
    }

}