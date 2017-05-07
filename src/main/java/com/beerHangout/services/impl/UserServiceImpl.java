package com.beerHangout.services.impl;

import com.beerHangout.models.PasswordResetToken;
import com.beerHangout.models.User;
import com.beerHangout.models.Role;
import com.beerHangout.repositories.PasswordResetTokenRepository;
import com.beerHangout.repositories.UserRepository;
import com.beerHangout.services.UserService;
import com.beerHangout.validation.exceptions.EmailExistsException;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 * @author Konrad Tyma on 05.03.17.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordResetTokenRepository passwordResetTokenRepository;

    private static final Logger log = Logger.getLogger(UserServiceImpl.class);

    @Override
    public PasswordResetToken getPasswordResetToken(String token) {
        return passwordResetTokenRepository.findOne(token);
    }

    @Override
    public void createPasswordResetTokenForUser(String token, User user) {
        PasswordResetToken passwordResetToken = new PasswordResetToken(token, user);
        passwordResetTokenRepository.save(passwordResetToken);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User createUser(User user, Set<Role> userRoles) throws Exception {
        log.info("Creating user " + user.getUsername());
        user.setUserRoles(userRoles);
        user.setActive(true);
        return userRepository.save(user);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void removeUser(String id) {
        log.info("Removing user by id: " + id);
        userRepository.delete(id);
    }

    @Override
    public void updateUser(String username, User user) {
        log.info("Updating user " + username);
        User userToUpdate = userRepository.findByUsername(username);
        userToUpdate.setUsername(user.getUsername());
        userToUpdate.setPassword(user.getPassword());
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setFirstName(user.getFirstName());
        userToUpdate.setLastName(user.getLastName());
        userRepository.save(userToUpdate);
    }

    private boolean emailExist(String email) {
        User user = userRepository.findByEmail(email);
        return user != null;
    }

    @Transactional
    @Override
    public User registerNewUserAccount(User user) throws EmailExistsException {
        if(emailExist(user.getEmail())) {
            throw new EmailExistsException(
                    String.format("Podany email: %s jest już używany!", user.getEmail()));
        }
        User registeredUser = new User();
        registeredUser.setFirstName(user.getFirstName());
        registeredUser.setLastName(user.getLastName());
        registeredUser.setEmail(user.getEmail());
        registeredUser.setPassword(user.getPassword());
        registeredUser.setUserRoles(user.getUserRoles());
        registeredUser.setUsername(user.getUsername());
        return userRepository.save(registeredUser);
    }

}
