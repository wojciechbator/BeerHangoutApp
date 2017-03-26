package com.beerHangout.domain.login.controllers;

import com.beerHangout.domain.PasswordResetToken;
import com.beerHangout.domain.User;
import com.beerHangout.domain.authorise.Role;
import com.beerHangout.domain.authorise.utils.SecurityUtility;
import com.beerHangout.domain.login.MailConstructor;
import com.beerHangout.domain.login.SessionIdentifierGenerator;
import com.beerHangout.domain.login.services.UserSecurityService;
import com.beerHangout.services.UserService;
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
import java.util.Locale;
import java.util.Set;
import java.util.UUID;

/**
 * @author Konrad Tyma on 09.03.17.
 */
@Controller
public class NewAccountController {

    @Autowired
    private MailConstructor mailConstructor;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    @Autowired
    private UserSecurityService securityService;


    @RequestMapping("/createAccount")
    public String newUser(Model model, Locale locale, @RequestParam("token") String token) {
        PasswordResetToken passwordResetToken = userService.getPasswordResetToken(token);

        if (passwordResetToken == null) {
            String message = "Invalid Token!";
            model.addAttribute("message", message);
            return "redirect:/badRequest";
        }

        User currentUser = passwordResetToken.getUser();
        String username = currentUser.getUsername();

        UserDetails userDetails = securityService.loadUserByUsername(username);

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
            model.addAttribute("usernameExists", true);

            return "myAccount";
        }

        if (userService.findByEmail(email) != null) {
            model.addAttribute("usernameEmail", true);

            return "myAccount";
        }

        User user = new User();
        user.setEmail(email);
        user.setUsername(username);

        String password = SecurityUtility.randomPassword(password_length);
        String encryptedPassword = SecurityUtility.passwordEncoder(password_length).encode(password);

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

        model.addAttribute("emailSent", true);

        return "myAccount";

    }

}
