package com.beerHangout.rest;

import com.beerHangout.domain.User;
import com.beerHangout.repositories.CommentRepository;
import com.beerHangout.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * Created by Adam Krysiak on 19.03.17.
 */

@Controller
@RequestMapping("/users")
public class UserResource {

    @Autowired
    private final UserRepository repository;


    @Autowired
    public UserResource(UserRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(method = GET)
    List<User> findAll() {
        System.out.println("\n\n\n\ntekst\n\n\n");
        return repository.findAll();
    }
}
