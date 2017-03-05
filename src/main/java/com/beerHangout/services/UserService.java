package com.beerHangout.services;

import com.beerHangout.domain.User;
import com.beerHangout.domain.authorise.UserRole;

import java.util.Set;

/**
 * @author Konrad Tyma on 05.03.17.
 */
public interface UserService {

	User findByUsername(String username);

	User findByEmail(String email);

	User createUser(User user, Set<UserRole> userRoles) throws Exception;

}
