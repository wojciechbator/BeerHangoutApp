package com.beerHangout.domain.authorise.utils;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.SecureRandom;
import java.util.Random;

/**
 * @author Konrad Tyma on 09.03.17.
 */
public class SecurityUtility {

    private static final String SALT = "salt";
    private static final String SALTCHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    private static final Logger LOGGER = Logger.getLogger(SecurityUtility.class);

    @Bean
    public static BCryptPasswordEncoder passwordEncoder(int password_length) {
        return new BCryptPasswordEncoder(password_length, new SecureRandom(SALT.getBytes()));
    }

    /**
     * Generate password by counting random index of SALT_CHARS
     * and get casted value to int, then add next position of password
     */
    @Bean
    public static String randomPassword(int password_length) {
        LOGGER.info("Generating random password!");
        StringBuilder passwordBuilder = new StringBuilder();
        Random random = new SecureRandom();
        while (passwordBuilder.length() < password_length) {
            int index = (int) (random.nextFloat() * SALTCHARS.length());
            passwordBuilder.append(SALTCHARS.charAt(index));
        }
        return passwordBuilder.toString();
    }
}
