package com.beerHangout.rest;

import com.beerHangout.domain.User;
import com.beerHangout.domain.authorise.Role;
import com.beerHangout.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

/**
 * Created by Wojtek on 2017-03-26.
 */

@RestController
@RequestMapping("/api/users")
public class UserResource {

    private final UserService userService;

    @Autowired
    public UserResource(UserService userService) {
        this.userService = userService;
    }


    @RequestMapping(method = RequestMethod.GET)
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public User createUser(@Valid @RequestBody User user, @Valid @RequestBody Set<Role> userRoles) throws Exception {
        return userService.createUser(user, userRoles);
    }

    @RequestMapping(value = "{username}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserByName(@PathVariable("username") String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "{username}", method = RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@Valid @RequestBody User user) {
        User userData = userService.findByUsername(user.getUsername());
        if (userData == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.updateUser(user.getUsername(), userData);
        return new ResponseEntity<>(userData, HttpStatus.OK);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void deleteUser(@Valid @PathVariable("id") String id) {
        userService.removeUser(id);
    }

}

