package com.beerHangout.validation;

import com.beerHangout.validation.tags.Email;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * @author Konrad Tyma on 22.04.17.
 */
public class ValidatorOfMail implements ConstraintValidator<Email, String>{
    @Override
    public void initialize(Email email) {

    }

    /**
     * Waliduje poprawność mail'a użytkownika wg reguł:
     * Poprawny: sth@gmail.com, sth+sth2@gmail.pl, sth+sth2@gmail.pl.sth
     * Niepoprawny sth@gmail.com. , sthgmail.com, .asdasd@o2.pl
     * @param mail
     * @param constraintValidatorContext konteks dla validatora
     * @return true jeśli mail jest poprawny
     */
    @Override
    public boolean isValid(String mail, ConstraintValidatorContext constraintValidatorContext) {
        //TO DO VALIDATE MAIL BY REGEX OR STH ELSE

        return true;
    }
}
