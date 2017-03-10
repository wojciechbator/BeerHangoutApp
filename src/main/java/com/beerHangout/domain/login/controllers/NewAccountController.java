package com.beerHangout.domain.login.controllers;

import com.beerHangout.domain.login.MailConstructor;
import com.beerHangout.domain.login.services.UserSecurityService;
import com.beerHangout.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Locale;

/**
 * @author Konrad Tyma on 09.03.17.
 */
public class NewAccountController {

	@Autowired
	private MailConstructor mailConstructor;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private UserService userService;

	@Autowired
	private UserSecurityService securityService;

	@RequestMapping("/createAccount")
	public String newUser(Model model, Locale locale, @RequestParam("token") String token) {

		return null;
	}

}
