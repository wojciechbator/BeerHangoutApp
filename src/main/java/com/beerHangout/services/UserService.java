package com.beerHangout.services;

import com.beerHangout.models.PasswordResetToken;
import com.beerHangout.models.User;
import com.beerHangout.models.Role;
import com.beerHangout.validation.exceptions.EmailExistsException;

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

    List<User> findAll();

    void removeUser(String id);

    void updateUser(String username, User user);

    User registerNewUserAccount(User user) throws EmailExistsException;

}
