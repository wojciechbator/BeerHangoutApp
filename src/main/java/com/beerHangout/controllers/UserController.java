package com.beerHangout.controllers;

import com.beerHangout.domain.User;
import com.beerHangout.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * Created by Adam Krysiak on 19.03.17.
 */

@Controller
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserRepository repository;


	@RequestMapping("/active")
	List<User> findByActive(@RequestParam(name = "active") Boolean isActive) {
		return repository.findByActive(isActive);
	}
}
