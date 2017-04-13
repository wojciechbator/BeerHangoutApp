package com.beerHangout.controllers;

import com.beerHangout.models.User;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by wojciech on 11.04.17.
 */
@RestController
@RequestMapping(value = "/register")
public class RegisterController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    private static final Logger LOGGER = Logger.getLogger(RegisterController.class);

    @RequestMapping(method = RequestMethod.GET)
    public void addBackingUserToModel(Model model) {
        User formBackingUser = new User();
        model.addAttribute("formBackingUser", formBackingUser);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void handleRegister(@Valid @RequestBody User user, BindingResult result) {

        userValidator.validate(user, result);

        if (!result.hasErrors()){
            try {
                user = registerNewUserAccount(user);
            } catch(Exception e) {
                LOGGER.error(e);
            }
        } else {

        }
    }
}
