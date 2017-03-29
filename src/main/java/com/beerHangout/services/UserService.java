package com.beerHangout.services;

import com.beerHangout.domain.PasswordResetToken;
import com.beerHangout.domain.User;
import com.beerHangout.domain.authorise.Role;

import java.util.List;
import java.util.Set;

/**
 * @author Konrad Tyma on 05.03.17.
 */
public interface UserService {

    PasswordResetToken getPasswordResetToken(final String token);

    void createPasswordResetTokenForUser(final String token, final User user);

    User findByUsername(String username);

    User findByEmail(String email);

    User createUser(User user, Set<Role> userRoles) throws Exception;

    List<User> findAll();

    void removeUser(String id);

    void updateUser(String username, User user);

}
