package com.beerHangout.rest;

import com.beerHangout.domain.User;
import com.beerHangout.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by Wojtek on 2017-03-26.
 */

@RestController
@RequestMapping("/api/users")
public class UserResource {

    private final UserRepository userRepository;

    @Autowired
    public UserResource(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public User createUser(@Valid @RequestBody User user) {
        return userRepository.save(user);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserById(@PathVariable("id") String id) {
        User user = userRepository.findOne(id);
        if(user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
    }

    @RequestMapping(value="{id}", method = RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@Valid @RequestBody User user, @PathVariable("id") String id) {
        User userData = userRepository.findOne(id);
        if(userData == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userData.setUsername(user.getUsername());
        userData.setPassword(user.getPassword());
        userData.setEmail(user.getEmail());
        userData.setFirstname(user.getFirstname());
        userData.setLastname(user.getLastname());
        userData.setPhone(user.getPhone());
        User updatedUser = userRepository.save(userData);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @RequestMapping(value="{id}", method = RequestMethod.DELETE)
    public void deleteUser(@Valid @PathVariable("id") String id) {
        userRepository.delete(id);
    }

}

