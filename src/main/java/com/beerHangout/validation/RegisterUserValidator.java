package com.beerHangout.validation;


import com.beerHangout.models.User;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

/**
 * @author Konrad Tyma on 22.04.17.
 */
public class RegisterUserValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        //TO DO IMPLEMENT VALIDATE USER REGISTER FORM, remember to add message in appropriate file
        //link:
        //http://www.journaldev.com/2610/spring-mvc-internationalization-i18n-and-localization-l10n-example
        //ValidationUtils.rejectIfEmptyOrWhitespace(errors, field, "message");
    }
}
