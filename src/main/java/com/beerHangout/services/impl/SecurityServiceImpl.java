package com.beerHangout.services.impl;

import com.beerHangout.services.SecurityService;
import org.apache.log4j.Logger;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Random;

/**
 * @author Konrad Tyma on 09.03.17.
 */
@Service
public class SecurityServiceImpl implements SecurityService {

    private static final String SALT = "salt";
    private static final String SALTCHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    private static final Logger log = Logger.getLogger(SecurityServiceImpl.class);

    public BCryptPasswordEncoder passwordEncoder(int password_length) {
        return new BCryptPasswordEncoder(password_length, new SecureRandom(SALT.getBytes()));
    }

    /**
     * Generate password by counting random index of SALT_CHARS
     * and get casted value to int, then add next position of password
     */
    public String randomPassword(int password_length) {
        log.info("Generating random password!");
        StringBuilder passwordBuilder = new StringBuilder();
        Random random = new SecureRandom();
        while (passwordBuilder.length() < password_length) {
            int index = (int) (random.nextFloat() * SALTCHARS.length());
            passwordBuilder.append(SALTCHARS.charAt(index));
        }
        return passwordBuilder.toString();
    }
}
