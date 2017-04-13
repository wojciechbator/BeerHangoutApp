package com.beerHangout.services;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Created by wojciech on 12.04.17.
 */
public interface SecurityService {
    BCryptPasswordEncoder passwordEncoder(int password_length);
    String randomPassword(int password_length);
}
