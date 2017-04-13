package com.beerHangout.controllers;

import com.beerHangout.models.PasswordResetToken;
import com.beerHangout.models.User;
import com.beerHangout.models.Role;
import com.beerHangout.utils.MailConstructor;
import com.beerHangout.utils.SessionIdentifierGenerator;
import com.beerHangout.services.SecurityService;
import com.beerHangout.services.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * @author Konrad Tyma on 09.03.17.
 */
@Controller
public class NewAccountController {
    private final static Logger LOGGER = Logger.getLogger(NewAccountController.class);

    @Autowired
    private MailConstructor mailConstructor;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;


    @RequestMapping("/createAccount")
    public String newUser(Model model, @RequestParam("token") String token) {
        PasswordResetToken passwordResetToken = userService.getPasswordResetToken(token);

        if (passwordResetToken == null) {
            LOGGER.warn("Invalid token!");
            String message = "Invalid Token!";
            model.addAttribute("message", message);
            return "redirect:/badRequest";
        }

        User currentUser = passwordResetToken.getUser();
        String username = currentUser.getUsername();

        UserDetails userDetails = userService.findByUsername(username);

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails,
                userDetails.getPassword(), userDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        model.addAttribute("user", currentUser);
        model.addAttribute("classActiveEdit", true);
        return "myProfile";
    }

    /**
     * Post method Controller
     */
    @RequestMapping(value = "/createAccount", method = RequestMethod.POST)
    public String postNewController(HttpServletRequest request,
                                    @ModelAttribute("email") String email,
                                    @ModelAttribute("username") String username,
                                    Model model) throws Exception {

        final int password_length = 10;
        SessionIdentifierGenerator sessionIdentifierGenerator = new SessionIdentifierGenerator();

        model.addAttribute("classActiveNewAccount", true); // for frontend
        model.addAttribute("email", email);
        model.addAttribute("username", username);

        if (userService.findByUsername(username) != null) {
            LOGGER.warn("Username already exists!");
            model.addAttribute("usernameExists", true);
            return "myAccount";
        }

        if (userService.findByEmail(email) != null) {
            LOGGER.warn("User email already exists! ");
            model.addAttribute("usernameEmail", true);
            return "myAccount";
        }

        User user = new User();
        user.setEmail(email);
        user.setUsername(username);

        String password = securityService.randomPassword(password_length);
        String encryptedPassword = securityService.passwordEncoder(password_length).encode(password);

        user.setPassword(encryptedPassword);

        Role role = new Role();
        role.setRoleId(sessionIdentifierGenerator.nextSessionId());
        role.setName("ROLE_USER");
        role.setUserRoleId(user.getId());

        Set<Role> userRoles = new HashSet<>();

        userService.createUser(user, userRoles);

        String token = UUID.randomUUID().toString();
        userService.createPasswordResetTokenForUser(token, user);

        String appUrl = "http://"
                + request.getServerName()
                + ":" + request.getServerPort()
                + request.getContextPath();

        SimpleMailMessage emailMessage = mailConstructor.constuctResetTokenEmail(appUrl, request.getLocale(), token, user, password);

        mailSender.send(emailMessage);

        LOGGER.info("Email sent to the requester.");
        model.addAttribute("emailSent", true);

        return "myAccount";

    }

}
