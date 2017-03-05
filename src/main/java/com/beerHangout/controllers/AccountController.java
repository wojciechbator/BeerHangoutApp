package com.beerHangout.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.beerHangout.utils.State.populateModel;

@Controller
public class AccountController {

	@RequestMapping("/signin")
	public String showSignIn(Model model, HttpServletRequest request) {
		populateModel(model, request);
		return "index";
	}

}