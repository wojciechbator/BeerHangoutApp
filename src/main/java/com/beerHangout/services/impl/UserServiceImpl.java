package com.beerHangout.services.impl;

import com.beerHangout.domain.User;
import com.beerHangout.domain.authorise.UserRole;
import com.beerHangout.repositories.RoleRepository;
import com.beerHangout.repositories.UserRepository;
import com.beerHangout.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

/**
 * @author Konrad Tyma on 05.03.17.
 */
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;

	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		User localUser = userRepository.findByUsername(user.getUsername());

		for (UserRole role: userRoles) {
			roleRepository.save(role.getRole());
		}

		user.getUserRoles().addAll(userRoles);
		localUser = userRepository.save(user);

		return localUser;
	}

}
