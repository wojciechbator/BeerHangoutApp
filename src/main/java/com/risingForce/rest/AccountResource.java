package com.risingForce.rest;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.risingForce.utils.State;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
public class AccountResource {

	@RequestMapping("/account")
	public Map<String,Object> getAccountStatus(HttpServletRequest request) {
		return State.getAuthState(request);
	}

}
