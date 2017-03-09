package com.beerHangout.domain.authorise.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.SecureRandom;

/**
 * @author Konrad Tyma on 09.03.17.
 */
public class SecurityUtility {

	private static final String SALT = "salt";

	@Bean
	public static BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(10, new SecureRandom(SALT.getBytes()));
	}

	/**
	 * Generate password by counting random index of SALT_CHARS
	 * and get casted value to int, then add next position of password
	 */
	@Bean
	public static String randomPassword() {
		//TODO GENERATE 10 length password, use String builder, use defined saltChars

		return null;
	}
}
